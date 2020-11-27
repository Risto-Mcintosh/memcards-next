import Layout from 'components/Layout';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col items-center h-full ">
        <h1 className="my-10 text-3xl">Memcards</h1>
      </article>
    </Layout>
  );
}
