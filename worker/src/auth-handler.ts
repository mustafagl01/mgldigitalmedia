export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  STRIPE_SECRET_KEY?: string;
}

/**
 * Checkout'ta kabul edilen fiyat kimlikleri.
 * İstemciden gelen price_id BURAYA karşı doğrulanır — aksi halde kullanıcı
 * hesaptaki herhangi bir (örn. £10'luk) fiyatı seçip pahalı bir ürünü ucuza
 * satın almış gibi checkout üretebilir.
 *
 * ⚠️ src/stripe-config.ts ile ELDE senkron tutulur. Worker ayrı bir deploy
 * artefaktı olduğu için oradan import edilemiyor. Yeni fiyat eklerken iki
 * dosyaya birden yaz.
 */
const ALLOWED_PRICE_IDS = new Set<string>([
  // Asistan aboneliği + sesli kontör + donanım (AloSipariş kalemleri)
  'price_1UAFHlDsBtMM0UXX0e37yiXd',
  'price_1UAGAEDsBtMM0UXXgjGKDtYv',
  'price_1UAGAFDsBtMM0UXXNWVptrwy',
  'price_1UAGAGDsBtMM0UXX5F9VQFZC',
  'price_1UAFHmDsBtMM0UXXOmlK0oz2',
  // WhatsApp kontörü
  'price_1UBL8IDsBtMM0UXXflQAnGg2',
  'price_1UBL8JDsBtMM0UXX0iFmTcEh',
  'price_1UBL8JDsBtMM0UXXObWWOPLH',
  // Kurulan sistemler
  'price_1UBL8FDsBtMM0UXXQZuR1X5a',
  'price_1UBL8GDsBtMM0UXXUiYtstcJ',
  'price_1UBL8HDsBtMM0UXXkmgXUrd7',
  // Web
  'price_1UBL8DDsBtMM0UXXVcMrrJjO',
  'price_1UBL8DDsBtMM0UXX6yZxjOMf',
  'price_1UBL8EDsBtMM0UXXj1TLO8SQ',
  'price_1UBL8FDsBtMM0UXXTITMOu0A',
  // Reklam
  'price_1UBL8HDsBtMM0UXXxNpvaedY',
  'price_1UBL8IDsBtMM0UXX4kflR7j6',
  'price_1UBL8IDsBtMM0UXXYaIHAzAR',
]);

/** Checkout dönüş adreslerinin ve CORS'un izin verdiği host'lar. */
const ALLOWED_HOSTS = new Set<string>([
  'mgl-ai.com',
  'www.mgl-ai.com',
  'localhost',
  '127.0.0.1',
]);

/** Origin başlığını host eşitliğiyle doğrular — `includes()` atlatılabilir. */
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  try {
    return ALLOWED_HOSTS.has(new URL(origin).hostname.toLowerCase());
  } catch {
    return false;
  }
}

/** Checkout success/cancel adresi kendi alan adımızda mı — açık yönlendirme kapanır. */
function isAllowedRedirect(target: string | undefined): boolean {
  if (!target) return false;
  try {
    const u = new URL(target);
    return (u.protocol === 'https:' || u.protocol === 'http:') && ALLOWED_HOSTS.has(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

const PBKDF2_ITERATIONS = 100_000;

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** PBKDF2-SHA256, tuz gövdenin içinde: pbkdf2$<iter>$<salt>$<hash> */
async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key,
    256
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt.buffer)}$${toHex(bits)}`;
}

/** Sabit süreli karşılaştırma — zamanlama sızıntısı olmasın. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function verifyPassword(password: string, stored: string | null | undefined): Promise<boolean> {
  if (!stored) return false;
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = Number(parts[1]);
  if (!Number.isFinite(iterations) || iterations < 1000) return false;
  const saltHex = parts[2];
  const salt = new Uint8Array((saltHex.match(/.{2}/g) || []).map((h) => parseInt(h, 16)));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    key,
    256
  );
  return timingSafeEqual(toHex(bits), parts[3]);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const requestOrigin = request.headers.get('Origin');
    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Vary': 'Origin',
    };
    if (isAllowedOrigin(requestOrigin)) {
      corsHeaders['Access-Control-Allow-Origin'] = requestOrigin as string;
    }

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
        // E-posta yalnızca oturumdan alınır; istemcinin gönderdiği yok sayılır.
        const customerEmail = activeSession.email;

        if (!priceId || !successUrl || !cancelUrl || (mode !== 'payment' && mode !== 'subscription')) {
          return new Response(
            JSON.stringify({ error: 'Missing required parameters' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Fiyat kataloğun dışındaysa reddet — ucuz fiyatla pahalı ürün alınmasın.
        if (!ALLOWED_PRICE_IDS.has(priceId)) {
          return new Response(
            JSON.stringify({ error: 'Unknown price' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Dönüş adresleri kendi alan adımızda olmalı — açık yönlendirme kapanır.
        if (!isAllowedRedirect(successUrl) || !isAllowedRedirect(cancelUrl)) {
          return new Response(
            JSON.stringify({ error: 'Invalid redirect URL' }),
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
            JSON.stringify({ error: 'Stripe checkout failed' }),
            { status: stripeResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ sessionId: stripeData.id, url: stripeData.url }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (e: any) {
        return new Response(
          JSON.stringify({ error: 'Internal error' }),
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

        // Sunucu tarafı doğrulama — istemci doğrulaması güvenlik değildir.
        if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          return new Response(
            JSON.stringify({ error: 'Invalid email' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        if (typeof password !== 'string' || password.length < 10 || password.length > 200) {
          return new Response(
            JSON.stringify({ error: 'Password must be between 10 and 200 characters' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        if (name != null && (typeof name !== 'string' || name.length > 120)) {
          return new Response(
            JSON.stringify({ error: 'Invalid name' }),
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
        // Parola artık SAKLANIYOR (PBKDF2-SHA256). Öncesinde hiç yazılmıyordu ve
        // login yalnızca sabit demo parolasıyla çalışıyordu — 2026-09-02'de düzeltildi.
        const passwordHash = await hashPassword(password);

        await env.DB.prepare(
          'INSERT INTO user (id, email, email_verified, name, password_hash, created_at, updated_at) VALUES (?, ?, 0, ?, ?, ?, ?)'
        ).bind(userId, email, name || null, passwordHash, now, now).run();

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
          JSON.stringify({ error: 'Internal error' }),
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
            JSON.stringify({ error: 'Invalid JSON' }),
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

        // Parola, kayıtta saklanan PBKDF2 özetine karşı doğrulanır.
        // (Sabit demo parolası 2026-09-02'de kaldırıldı — public repoda duruyordu.)
        const passwordMatch = await verifyPassword(password, user.password_hash);

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
          JSON.stringify({ error: 'Internal error' }),
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
          JSON.stringify({ error: 'Internal error' }),
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
