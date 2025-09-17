import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const devMode = import.meta.env.VITE_DEV_MODE === 'true';

// Create a mock client for development when env vars are not available or dev mode is enabled
const createMockClient = () => ({
  auth: {
    signUp: (credentials: any) => {
      console.log('Mock signUp:', credentials.email);
      return Promise.resolve({ 
        data: { 
          user: { 
            id: 'mock-user-id', 
            email: credentials.email, 
            email_confirmed_at: new Date().toISOString() 
          }, 
          session: null 
        }, 
        error: null 
      });
    },
    signInWithPassword: (credentials: any) => {
      console.log('Mock signIn:', credentials.email);
      return Promise.resolve({ 
        data: { 
          user: { 
            id: 'mock-user-id', 
            email: credentials.email, 
            email_confirmed_at: new Date().toISOString() 
          }, 
          session: { 
            access_token: 'mock-token', 
            user: { 
              id: 'mock-user-id', 
              email: credentials.email 
            } 
          } 
        }, 
        error: credentials.email === 'error@test.com' ? new Error('Invalid credentials') : null 
      });
    },
    signOut: () => {
      console.log('Mock signOut');
      return Promise.resolve({ error: null });
    },
    signInWithOAuth: (options: any) => {
      console.log('Mock Google OAuth signIn:', options.provider);
      if (options.provider === 'google') {
        // Mock olarak browser'ı redirect etme, sadece log
        console.log('Mock: Google OAuth redirect simulated');
        return Promise.resolve({ error: null });
      }
      return Promise.resolve({ error: new Error('Unsupported OAuth provider') });
    },
    resetPasswordForEmail: (email: string) => {
      console.log('Mock resetPassword:', email);
      return Promise.resolve({ error: null });
    },
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: (callback: any) => {
      // Simulate auth state change after 1 second for testing
      setTimeout(() => callback('SIGNED_OUT', null), 100);
      return { data: { subscription: { unsubscribe: () => {} } }, unsubscribe: () => {} };
    },
  },
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => {
        console.log(`Mock select from ${table} where ${column} = ${value}`);
        return Promise.resolve({ data: [], error: null });
      },
      order: (column: string, options?: any) => {
        console.log(`Mock select from ${table} order by ${column}`);
        return Promise.resolve({ data: [], error: null });
      },
    }),
    insert: (data: any) => {
      console.log(`Mock insert into ${table}:`, data);
      return Promise.resolve({ data: [{ ...data, id: 'mock-id', created_at: new Date().toISOString() }], error: null });
    },
    update: (data: any) => ({
      eq: (column: string, value: any) => {
        console.log(`Mock update ${table} set`, data, `where ${column} = ${value}`);
        return Promise.resolve({ data: [{ ...data, id: value, updated_at: new Date().toISOString() }], error: null });
      }
    }),
  }),
});

// Use mock client if in development mode or if credentials are placeholders
const shouldUseMock = devMode || 
                     !supabaseUrl || 
                     !supabaseAnonKey || 
                     supabaseUrl.includes('your-project') || 
                     supabaseAnonKey.includes('your-anon-key');

export const supabase = shouldUseMock 
  ? createMockClient() 
  : createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common database operations
export const insertLead = async (leadData: {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  pain_point?: string;
  generated_idea?: string;
  source: string;
}) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([leadData]);
  
  if (error) {
    console.error('Error inserting lead:', error);
    return { success: false, error };
  }
  
  console.log('Lead inserted successfully:', data);
  return { success: true, data };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (userId: string, profileData: {
  full_name?: string;
  phone?: string;
  company?: string;
  industry?: string;
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...profileData, updated_at: new Date().toISOString() })
    .eq('id', userId);
  
  return { data, error };
};

export type Database = {
  public: {
    Tables: {
      stripe_customers: {
        Row: {
          id: number;
          user_id: string;
          customer_id: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          user_id: string;
          customer_id: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          user_id?: string;
          customer_id?: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      stripe_subscriptions: {
        Row: {
          id: number;
          customer_id: string;
          subscription_id: string | null;
          price_id: string | null;
          current_period_start: number | null;
          current_period_end: number | null;
          cancel_at_period_end: boolean;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
          status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          customer_id: string;
          subscription_id?: string | null;
          price_id?: string | null;
          current_period_start?: number | null;
          current_period_end?: number | null;
          cancel_at_period_end?: boolean;
          payment_method_brand?: string | null;
          payment_method_last4?: string | null;
          status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          customer_id?: string;
          subscription_id?: string | null;
          price_id?: string | null;
          current_period_start?: number | null;
          current_period_end?: number | null;
          cancel_at_period_end?: boolean;
          payment_method_brand?: string | null;
          payment_method_last4?: string | null;
          status?: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      stripe_orders: {
        Row: {
          id: number;
          checkout_session_id: string;
          payment_intent_id: string;
          customer_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          status: 'pending' | 'completed' | 'canceled';
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          checkout_session_id: string;
          payment_intent_id: string;
          customer_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          status?: 'pending' | 'completed' | 'canceled';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          checkout_session_id?: string;
          payment_intent_id?: string;
          customer_id?: string;
          amount_subtotal?: number;
          amount_total?: number;
          currency?: string;
          payment_status?: string;
          status?: 'pending' | 'completed' | 'canceled';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
    };
    Views: {
      stripe_user_subscriptions: {
        Row: {
          customer_id: string;
          subscription_id: string | null;
          subscription_status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          price_id: string | null;
          current_period_start: number | null;
          current_period_end: number | null;
          cancel_at_period_end: boolean;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
        };
      };
      stripe_user_orders: {
        Row: {
          customer_id: string;
          order_id: number;
          checkout_session_id: string;
          payment_intent_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          order_status: 'pending' | 'completed' | 'canceled';
          order_date: string;
        };
      };
    };
  };
};