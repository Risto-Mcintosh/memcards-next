import 'tailwindcss/tailwind.css';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

if (typeof window !== 'undefined') {
  const { server } = require('server');
  server.start();
}

// if (process.env.NODE_ENV === 'development') {
//   makeServer({ environment: 'development' });
// }

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Component {...pageProps} />
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
