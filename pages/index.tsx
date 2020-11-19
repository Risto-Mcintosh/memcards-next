import Layout from 'components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col h-full">
        <h1 className="my-5 text-3xl text-center text-green-600">
          Add New Card
        </h1>
      </article>
    </Layout>
  );
}
