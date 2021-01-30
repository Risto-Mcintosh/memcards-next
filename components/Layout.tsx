import Navigation from './Navigation';
import Head from 'next/head';

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Memcards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-4 bg-gradient-to-tr from-brand-600 to-brand-200">
        <Navigation />
      </div>
      <main className="flex-1 px-2 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
