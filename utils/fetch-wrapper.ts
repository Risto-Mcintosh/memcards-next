function client(
  endpoint: string,
  { data, ...customConfig }: RequestInit & { data?: any } = {}
) {
  const headers = { 'Content-Type': 'application/json' };
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  return fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}${endpoint}`, config).then(
    async (response) => {
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(new Error(data?.message ?? 'unknown'));
      }
    }
  );
}

export { client };
