import { motion } from 'framer-motion';
import * as React from 'react';

export default function CreateButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const variants = {
    open: { rotate: 225 },
    closed: { rotate: 0 }
  };
  console.log({ isOpen });
  return (
    <div className="absolute bottom-0 right-0 mb-8 mr-8">
      <motion.button
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        className="w-12 focus:outline-none focus-visible:outline-black"
        aria-label="Create a new deck or new flashcard"
        onClick={() => setIsOpen((state) => !state)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="stroke-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </motion.button>
    </div>
  );
}
