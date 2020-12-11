import { AnimatePresence, motion, Variants } from 'framer-motion';

type props = {
  isShowingFrontOfCard: boolean;
};

const variants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  show: {
    opacity: 1,
    scale: 1
  }
};
export function FlashcardContent({ isShowingFrontOfCard }: props) {
  return (
    <AnimatePresence>
      {isShowingFrontOfCard ? (
        <motion.div
          key="front"
          variants={variants}
          exit={{ rotateX: 90, opacity: 0 }}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center w-full p-4 "
        >
          <p className="mb-2 text-4xl">Card Front</p>
        </motion.div>
      ) : (
        <motion.div
          key="back"
          variants={variants}
          exit={{ rotateX: 90, opacity: 0 }}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center w-full p-4 "
        >
          <p className="mb-2 text-4xl">Card Back</p>
          <img
            src="https://source.unsplash.com/random/400x400"
            alt="random image"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
