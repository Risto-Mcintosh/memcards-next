import Layout from 'components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1 className="text-3xl text-green-600">* Deck Name *</h1>
      </section>
    </Layout>
  );
}
