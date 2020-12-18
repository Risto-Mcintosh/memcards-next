import * as React from 'react';
import Layout from '@components/Layout';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { useFlashcardContext } from '@context/flashcard';

const flashcardFlip: Variants = {
  front: {
    rotateY: 0
  },
  back: {
    rotateY: 180
  }
};

const flashcardContent: Variants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      when: 'afterChildren'
    }
  }
};
const overlay: Variants = {
  show: {
    opacity: 0
  },
  hidden: {
    opacity: 1
  }
};
export function Flashcard() {
  const {
    isShowingFrontOfCard,
    flipCard,
    nextCard,
    flashcard,
    deckName
  } = useFlashcardContext();

  const flashcardControls = React.useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      flipCard();
    }
    if (e.code === 'KeyN') {
      nextCard();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', flashcardControls);
    return () => document.removeEventListener('keydown', flashcardControls);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!flashcard ? (
        <p>Loading....</p>
      ) : (
        <div className="flex flex-col min-h-full">
          <h1 className="mb-5 text-3xl text-center text-green-600">
            {deckName}
          </h1>
          <section className="flex items-start justify-center flex-1">
            <motion.div
              variants={flashcardFlip}
              animate={isShowingFrontOfCard ? 'front' : 'back'}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col items-center justify-center w-3/4 max-w-screen-sm border-2 border-gray-100 shadow-lg rounded-xl"
              style={{ minHeight: '250px' }}
            >
              {isShowingFrontOfCard ? (
                <motion.div
                  key="front"
                  variants={flashcardContent}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0 }}
                  className="flex flex-col items-center justify-center w-full p-4"
                >
                  <p className="mb-2 text-4xl text-center">{flashcard.front}</p>
                  <motion.div
                    variants={overlay}
                    className="absolute inset-0 bg-white"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  variants={flashcardContent}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0 }}
                  style={{ rotateY: 180 }}
                  className="flex flex-col items-center justify-center w-full p-4"
                >
                  <p className="mb-2 text-4xl">{flashcard.back}</p>
                  <div className="max-w-xs">
                    <img
                      src="https://source.unsplash.com/random/400x400"
                      alt="random image"
                    />
                  </div>
                  <motion.div
                    variants={overlay}
                    className="absolute inset-0 bg-white"
                  />
                </motion.div>
              )}
            </motion.div>
          </section>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => flipCard()}
              className="px-8 py-3 text-3xl text-white bg-gray-600 rounded-xl"
            >
              Flip
            </button>
            <button
              onClick={() => nextCard()}
              className="px-8 py-3 ml-4 text-3xl text-white bg-gray-600 rounded-xl"
            >
              Next
            </button>
            {/* add Edit Card button here */}
          </div>
        </div>
      )}
    </Layout>
  );
}
