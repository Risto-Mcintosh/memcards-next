import * as React from 'react';
import Layout from '@components/Layout';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { useFlashcardContext } from '@context/flashcard';
import { Controls } from './Controls';

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
  const { isShowingFrontOfCard, flashcard, deck } = useFlashcardContext();
  return (
    <Layout>
      {!flashcard ? (
        <p>Loading....</p>
      ) : (
        <div className="flex flex-col min-h-full">
          <h1 className="mb-5 text-3xl text-center text-green-600">
            {deck.name}
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
                  {flashcard.image && (
                    <div className="max-w-xs">
                      <img
                        src={flashcard.image.src}
                        alt={flashcard.image.alt}
                      />
                    </div>
                  )}
                  <motion.div
                    variants={overlay}
                    className="absolute inset-0 bg-white"
                  />
                </motion.div>
              )}
            </motion.div>
          </section>
          <Controls />
        </div>
      )}
    </Layout>
  );
}
