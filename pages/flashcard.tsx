import { FlashcardContent } from 'components/Flashcard';
import Layout from 'components/Layout';
import Head from 'next/head';

export default function FlashcardPage() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-full">
        <h1 className="mb-5 text-3xl text-center text-green-600">
          * Deck Name *
        </h1>
        <section className="flex items-start justify-center flex-1 ">
          <FlashcardContent text="Card Front" />
          {/* <FlashcardContent text="Card Back" /> */}
        </section>
        <div className="mt-5">
          <button className="block px-16 py-3 mx-auto text-3xl text-white bg-gray-600 rounded-xl">
            Show Answer
          </button>
          {/* add Edit Card button here */}
        </div>
      </div>
    </Layout>
  );
}
