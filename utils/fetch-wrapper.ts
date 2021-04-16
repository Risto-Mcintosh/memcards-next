function client(
  endpoint: string,
  { data, ...customConfig }: RequestInit & { data?: any } = {}
) {
  const headers = { "Content-Type": "application/json" };
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  return fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}${endpoint}`, config).then(
    async (response) => {
      if (response.ok) {
        return response.status === 204
          ? null
          : await response.json().catch((err) => console.warn(err));
      } else {
        const data = await response.json();
        return Promise.reject(new Error(data?.message ?? "unknown"));
      }
    }
  );
}

export { client };
