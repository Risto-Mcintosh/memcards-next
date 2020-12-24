import 'tailwindcss/tailwind.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
if (typeof window !== 'undefined') {
  const { server } = require('test/server');
  server.start();
}

// if (process.env.NODE_ENV === 'development') {
//   makeServer({ environment: 'development' });
// }

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(count, err) {
        if (err === 'no endpoint' || count >= 3) {
          return false;
        }
        return true;
      }
    }
  }
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
