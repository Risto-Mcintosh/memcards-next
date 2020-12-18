function client(endpoint: string, { body, ...customConfig }: RequestInit = {}) {
  console.count('called');
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
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
        return Promise.reject(data);
      }
    }
  );
}

export { client };
