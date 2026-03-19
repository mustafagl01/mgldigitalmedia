export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  STRIPE_SECRET_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }


    if (path === '/api/location' && request.method === 'GET') {
      const country = ((request as Request & { cf?: { country?: string } }).cf?.country || 'GB').toUpperCase();

      return new Response(
        JSON.stringify({ country }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Stripe checkout endpoint
    if (path === '/api/stripe/checkout' && request.method === 'POST') {
      try {
        if (!env.STRIPE_SECRET_KEY) {
          return new Response(
            JSON.stringify({ error: 'Stripe is not configured' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const authHeader = request.headers.get('Authorization') || '';
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
          return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const activeSession = await env.DB.prepare(
          'SELECT s.user_id, u.email FROM session s JOIN user u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > ?'
        ).bind(token, Date.now()).first() as any;

        if (!activeSession) {
          return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const body = await request.json() as {
          price_id?: string;
          success_url?: string;
          cancel_url?: string;
          mode?: 'payment' | 'subscription';
          customer_email?: string;
        };

        const priceId = body.price_id;
        const successUrl = body.success_url;
        const cancelUrl = body.cancel_url;
        const mode = body.mode;
        const customerEmail = body.customer_email || activeSession.email;

        if (!priceId || !successUrl || !cancelUrl || (mode !== 'payment' && mode !== 'subscription')) {
          return new Response(
            JSON.stringify({ error: 'Missing required parameters' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const stripePayload = new URLSearchParams();
        stripePayload.set('mode', mode);
        stripePayload.set('success_url', successUrl);
        stripePayload.set('cancel_url', cancelUrl);
        stripePayload.set('line_items[0][price]', priceId);
        stripePayload.set('line_items[0][quantity]', '1');
        if (customerEmail) {
          stripePayload.set('customer_email', customerEmail);
        }

        const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: stripePayload.toString(),
        });

        const stripeData = await stripeResponse.json() as any;

        if (!stripeResponse.ok) {
          return new Response(
            JSON.stringify({ error: stripeData?.error?.message || 'Stripe checkout failed' }),
            { status: stripeResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ sessionId: stripeData.id, url: stripeData.url }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (e: any) {
        return new Response(
          JSON.stringify({ error: e.message || String(e) }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Register endpoint
    if (path === '/api/auth/register' && request.method === 'POST') {
      try {
        const text = await request.text();
        const data = JSON.parse(text);
        const { email, password, name } = data;

        if (!email || !password) {
          return new Response(
            JSON.stringify({ error: 'Email and password are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const existingUser = await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind(email).first();
        if (existingUser) {
          return new Response(
            JSON.stringify({ error: 'User already exists' }),
            { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const userId = crypto.randomUUID();
        const now = Date.now();

        await env.DB.prepare(
          'INSERT INTO user (id, email, email_verified, name, created_at, updated_at) VALUES (?, ?, 0, ?, ?, ?)'
        ).bind(userId, email, name || null, now, now).run();

        const token = Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('');
        const expiresAt = now + 604800000;

        await env.DB.prepare(
          'INSERT INTO session (id, user_id, token, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(crypto.randomUUID(), userId, token, expiresAt, now, now).run();

        const user = await env.DB.prepare('SELECT id, email, email_verified, name, image FROM user WHERE id = ?').bind(userId).first() as any;

        return new Response(
          JSON.stringify({ user, sessionToken: token, expiresAt }),
          { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (e: any) {
        return new Response(
          JSON.stringify({ error: e.message || String(e) }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Login endpoint
    if (path === '/api/auth/login' && request.method === 'POST') {
      try {
        const text = await request.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          return new Response(
            JSON.stringify({ error: 'Invalid JSON', received: text }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const email = data.email || '';
        const password = data.password || '';

        const user = await env.DB.prepare('SELECT * FROM user WHERE email = ?').bind(email).first() as any;

        if (!user) {
          return new Response(
            JSON.stringify({ error: 'Invalid credentials' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const isDemoAccount = email === 'demo@mgldigitalmedia.com';
        const passwordMatch = isDemoAccount && (password === 'Demo123' || password === 'Demo123!');

        if (passwordMatch) {
          const token = Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('');
          const expiresAt = Date.now() + 604800000;

          await env.DB.prepare(
            'INSERT INTO session (id, user_id, token, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
          ).bind(crypto.randomUUID(), user.id, token, expiresAt, Date.now(), Date.now()).run();

          return new Response(
            JSON.stringify({
              user: { id: user.id, email: user.email, name: user.name },
              sessionToken: token,
              expiresAt: expiresAt
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ error: 'Invalid credentials' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (e: any) {
        console.error('Error:', e);
        return new Response(
          JSON.stringify({ error: e.message || String(e) }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Session endpoint
    if (path === '/api/auth/session' && request.method === 'GET') {
      const authHeader = request.headers.get('Authorization') || '';
      const token = authHeader.replace('Bearer ', '');

      if (!token) {
        return new Response(
          JSON.stringify({ user: null }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const session = await env.DB.prepare(
        'SELECT s.*, u.id as user_id, u.email, u.email_verified, u.name FROM session s JOIN user u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > ?'
      ).bind(token, Date.now()).first() as any;

      if (!session) {
        return new Response(
          JSON.stringify({ user: null }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          user: { id: session.user_id, email: session.email, email_verified: session.email_verified, name: session.name }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Logout endpoint
    if (path === '/api/auth/logout' && request.method === 'POST') {
      const authHeader = request.headers.get('Authorization') || '';
      const token = authHeader.replace('Bearer ', '');

      await env.DB.prepare('DELETE FROM session WHERE token = ?').bind(token).run();

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Forgot password endpoint
    if (path === '/api/auth/forgot-password' && request.method === 'POST') {
      try {
        const text = await request.text();
        const data = JSON.parse(text);
        const { email } = data;

        if (!email) {
          return new Response(
            JSON.stringify({ error: 'Email is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const user = await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind(email).first() as any;

        if (user) {
          const resetToken = crypto.randomUUID();
          const expiresAt = Date.now() + 3600000;
          const now = Date.now();

          await env.DB.prepare(
            'INSERT INTO password_reset_token (id, user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?, ?)'
          ).bind(crypto.randomUUID(), user.id, resetToken, expiresAt, now).run();

          console.log('Password reset token for ' + email + ': ' + resetToken);
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (e: any) {
        return new Response(
          JSON.stringify({ error: e.message || String(e) }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Google OAuth Sign-in
    if (path === '/api/auth/signin/google' && request.method === 'GET') {
      if (!env.GOOGLE_CLIENT_ID) {
        return new Response(
          JSON.stringify({ error: 'Google OAuth not configured' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const state = crypto.randomUUID();
      const redirectUri = url.origin + '/api/auth/callback/google';
      const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' + env.GOOGLE_CLIENT_ID + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=code&scope=openid email profile&state=' + state;

      return Response.redirect(authUrl, 302);
    }

    // Google OAuth Callback
    if (path === '/api/auth/callback/google' && request.method === 'GET') {
      const code = url.searchParams.get('code');

      if (!code || !env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
        return new Response(
          JSON.stringify({ error: 'Invalid OAuth callback' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      try {
        // Exchange code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code: code,
            client_id: env.GOOGLE_CLIENT_ID,
            client_secret: env.GOOGLE_CLIENT_SECRET,
            redirect_uri: url.origin + '/api/auth/callback/google',
            grant_type: 'authorization_code'
          })
        });

        const tokens = await tokenResponse.json();

        if (tokens.error) {
          return new Response(
            JSON.stringify({ error: tokens.error }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Get user info
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: 'Bearer ' + tokens.access_token }
        });

        const userData = await userResponse.json();

        // Check if user exists, create if not
        let user = await env.DB.prepare('SELECT * FROM user WHERE email = ?').bind(userData.email).first() as any;

        if (!user) {
          const userId = crypto.randomUUID();
          const now = Date.now();

          await env.DB.prepare(
            'INSERT INTO user (id, email, email_verified, name, image, created_at, updated_at) VALUES (?, ?, 1, ?, ?, ?, ?)'
          ).bind(userId, userData.email, userData.name, userData.picture, now, now).run();

          user = { id: userId, email: userData.email, name: userData.name, image: userData.picture };
        }

        // Create session
        const token = Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('');
        const expiresAt = Date.now() + 604800000;
        const now = Date.now();

        await env.DB.prepare(
          'INSERT INTO session (id, user_id, token, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(crypto.randomUUID(), user.id, token, expiresAt, now, now).run();

        // Redirect to frontend with session token
        return Response.redirect('https://mgldigitalmedia.com/?token=' + token + '&provider=google', 302);
      } catch (e: any) {
        console.error('OAuth error:', e);
        return new Response(
          JSON.stringify({ error: 'OAuth failed', details: e.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};
