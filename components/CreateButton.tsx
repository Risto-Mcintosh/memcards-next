import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

export default function CreateButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const variants = {
    open: { rotate: 225 },
    closed: { rotate: 0 }
  };
  return (
    <div className="absolute bottom-0 right-0 mb-8 mr-8">
      <div className="relative flex flex-col items-center">
        <button
          className="z-10 w-12 mt-3 focus:outline-none focus-visible:outline-black"
          aria-label="Create a new deck or new flashcard"
          onClick={() => setIsOpen((state) => !state)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="origin-bottom-right stroke-1"
          >
            <motion.path
              animate={isOpen ? 'open' : 'closed'}
              variants={variants}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, top: '-100%' }}
              exit={{ opacity: 0, top: '-50%' }}
              className="absolute p-2 text-right bg-gray-300 w-36 right-1/4"
            >
              <a href="#" className="block">
                Create Deck
              </a>
              <a href="#" className="block">
                Create Flashcard
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
