import "tailwindcss/tailwind.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

console.log({ env: process.env.NEXT_PUBLIC_USE_MOCK_SERVER });
if (process.env.NEXT_PUBLIC_USE_MOCK_SERVER === "true") {
  if (typeof window !== "undefined") {
    const { server } = require("test/server");
    server.start();
  }
}

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryCache}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
