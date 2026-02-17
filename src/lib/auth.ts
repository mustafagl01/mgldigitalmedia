import { betterAuth } from 'better-auth';
import { cloudflareAdapter } from 'better-auth/adapters/cloudflare';

// Better Auth configuration for Cloudflare D1
export const auth = betterAuth({
  database: cloudflareAdapter({
    // This will be bound to the D1 database in Cloudflare Workers
    dbName: 'DB'
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false // Set to true in production
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      enabled: !!process.env.GOOGLE_CLIENT_ID
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day
  },
  advanced: {
    cookiePrefix: 'mgl_auth',
    crossSubDomainCookies: {
      enabled: false
    }
  }
});

// Type definitions for our auth
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;
