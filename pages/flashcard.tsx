import Layout from 'components/Layout';
import Head from 'next/head';

export default function Flashcard() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col h-full">
        <h1 className="my-5 text-3xl text-center text-green-600">
          * Deck Name *
        </h1>
        <section className="flex items-start justify-center">
          <div
            className="flex items-center justify-center border-2 border-gray-100 shadow-lg rounded-xl"
            style={{ minHeight: '400px', minWidth: '300px' }}
          >
            <p className="mb-2 text-4xl">Card Front</p>
          </div>
        </section>
        <div className="py-5">
          <button className="block px-16 py-3 mx-auto text-3xl text-white bg-gray-600 rounded-xl">
            Flip
          </button>
        </div>
      </article>
    </Layout>
  );
}
