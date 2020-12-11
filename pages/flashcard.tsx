import { FlashcardContent } from 'components/Flashcard';
import Layout from 'components/Layout';
import { motion } from 'framer-motion';
import Head from 'next/head';
import * as React from 'react';

export default function FlashcardPage() {
  const [isShowingFrontOfCard, setCardSide] = React.useState(true);
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
          <motion.div
            className="flex flex-col items-center justify-center w-3/4 max-w-screen-sm border-2 border-gray-100 shadow-lg rounded-xl"
            style={{ minHeight: '250px' }}
          >
            <FlashcardContent isShowingFrontOfCard={isShowingFrontOfCard} />
          </motion.div>
        </section>
        <div className="mt-5">
          <button
            onClick={() => setCardSide((s) => !s)}
            className="block px-16 py-3 mx-auto text-3xl text-white bg-gray-600 rounded-xl"
          >
            Show Answer
          </button>
          {/* add Edit Card button here */}
        </div>
      </div>
    </Layout>
  );
}
