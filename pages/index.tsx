import Layout from 'components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-red-600 text-5xl">What up!</h1>
    </Layout>
  );
}
