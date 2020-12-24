function client(endpoint: string, { body, ...customConfig }: RequestInit = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  return fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}${endpoint}`, config).then(
    async (response) => {
      const data = await response.json().catch((err) => console.log);
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  );
}

export { client };
