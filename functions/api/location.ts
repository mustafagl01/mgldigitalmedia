interface Ctx {
  request: Request;
}

export const onRequest = async ({ request }: Ctx): Promise<Response> => {
  const country = request.headers.get('CF-IPCountry');
  const body = JSON.stringify({
    country: country && country !== 'XX' && country !== 'T1' ? country : null,
  });
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
