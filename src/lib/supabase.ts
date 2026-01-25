// Supabase has been removed in favor of simulated authentication.
// This file is kept as a placeholder to avoid breaking imports in other files
// that might still reference it (though we should have cleaned them all up).

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
    signInWithPassword: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signInWithOAuth: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      maybeSingle: async () => ({ data: null }),
      order: () => ({ data: [] }),
    }),
    insert: async () => ({ error: null }),
  })
} as any;