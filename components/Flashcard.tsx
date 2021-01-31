import * as React from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useFlashcardContext } from '@context/flashcard';
import { Controls } from './Controls';
import { LearningLayout } from '@components/LearningLayout';

const flashcardContent: Variants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1
  }
};

const flashcardAnimationVariants: Variants = {
  front: {
    rotateY: 0,
    transition: {
      when: 'beforeChildren',
      duration: 0.5
    }
  },
  back: {
    rotateY: 180,
    transition: {
      when: 'beforeChildren',
      duration: 0.5
    }
  },
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0
    }
  },
  show: {
    height: 'auto',
    opacity: 1,
    transition: {
      // when: 'beforeChildren',
      // duration: 0.5
      delayChildren: 0.7
    }
  }
};

export function Flashcard() {
  const { isShowingFrontOfCard, flashcard, deck } = useFlashcardContext();
  const animateControl = useAnimation();
  const sideToShow = isShowingFrontOfCard ? 'front' : 'back';
  React.useEffect(() => {
    animateControl.set('hidden');
    animateControl.start('show');
  }, [flashcard]);
  return (
    <LearningLayout>
      {!flashcard ? (
        <p>Loading....</p>
      ) : (
        <div className="flex flex-col min-h-full pt-4 pb-6">
          <h1 className="text-3xl text-center">{deck.name}</h1>
          <motion.section
            variants={flashcardAnimationVariants}
            animate={animateControl}
            className="flex items-center justify-center flex-1"
          >
            <motion.div
              variants={flashcardAnimationVariants}
              animate={sideToShow}
              className="relative flex flex-col items-center justify-center w-3/4 max-w-md border-2 border-gray-100 shadow-lg rounded-xl"
              style={{ minHeight: '250px' }}
            >
              {isShowingFrontOfCard ? (
                <motion.div
                  key="front"
                  variants={flashcardContent}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center justify-center w-full p-4"
                >
                  <p className="mb-2 text-4xl text-center">{flashcard.front}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  variants={flashcardContent}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.2 }}
                  style={{ rotateY: 180 }}
                  className="flex flex-col items-center justify-center w-full p-4"
                >
                  <p className="mb-2 text-4xl">{flashcard.back}</p>
                  {flashcard.image && (
                    <div className="bg-gray-400 max-w-xxs">
                      <img
                        className="object-contain"
                        width="400"
                        src={flashcard.image.src}
                        alt={flashcard.image.alt}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.section>
          <Controls />
        </div>
      )}
    </LearningLayout>
  );
}
