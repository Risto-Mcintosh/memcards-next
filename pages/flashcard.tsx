import { FlashcardContent } from 'components/Flashcard';
import Layout from 'components/Layout';
import { motion, Variants } from 'framer-motion';
import Head from 'next/head';
import * as React from 'react';

const variants: Variants = {
  front: {
    rotateY: 0
  },
  back: {
    rotateY: 180
  }
};

export default function FlashcardPage() {
  const [isShowingFrontOfCard, setCardSide] = React.useState(true);

  const flashcardControls = React.useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setCardSide((s) => !s);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', flashcardControls);
    return () => document.removeEventListener('keydown', flashcardControls);
  });

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-full">
        <h1 className="mb-5 text-3xl text-center text-green-600">
          * Deck Name *
        </h1>
        <section className="flex items-start justify-center flex-1">
          <motion.div
            variants={variants}
            animate={isShowingFrontOfCard ? 'front' : 'back'}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center justify-center w-3/4 max-w-screen-sm border-2 border-gray-100 shadow-lg rounded-xl"
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
