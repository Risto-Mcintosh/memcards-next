import { AnimatePresence, motion, Variants } from 'framer-motion';

type props = {
  isShowingFrontOfCard: boolean;
};

const variants: Variants = {
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
export function FlashcardContent({ isShowingFrontOfCard }: props) {
  return (
    <>
      {isShowingFrontOfCard ? (
        <motion.div
          key="front"
          variants={variants}
          initial="hidden"
          animate="show"
          transition={{ duration: 0 }}
          className="flex flex-col items-center justify-center w-full p-4"
        >
          <p className="mb-2 text-4xl">Card Front</p>
          <motion.div
            variants={overlay}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      ) : (
        <motion.div
          key="back"
          variants={variants}
          initial="hidden"
          animate="show"
          transition={{ duration: 0 }}
          style={{ rotateY: 180 }}
          className="flex flex-col items-center justify-center w-full p-4"
        >
          <p className="mb-2 text-4xl">Card Back</p>
          <img
            src="https://source.unsplash.com/random/400x400"
            alt="random image"
          />
          <motion.div
            variants={overlay}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      )}
    </>
  );
}
