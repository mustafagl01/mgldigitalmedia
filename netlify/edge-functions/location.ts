import type { Context } from 'https://edge.netlify.com';

export default async (_request: Request, context: Context) => {
  const country = context.geo?.country?.code?.toUpperCase() ?? 'GB';

  return new Response(JSON.stringify({ country }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const config = { path: '/api/location' };
