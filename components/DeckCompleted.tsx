import { useFlashcardContext } from '@context/flashcard';
import Link from 'next/link';
import Layout from './Layout';

export function DeckCompleted() {
  const { deck, initialize } = useFlashcardContext();
  return (
    <Layout>
      <div className="flex items-center justify-center w-full h-full">
        <div className="p-8 text-center border border-gray-300 rounded shadow-lg">
          <h1 className="mb-2 text-2xl">{deck.name}</h1>
          <p className="mb-4 text-lg">
            Congratulations! You have finished this deck.
          </p>
          <div className="flex justify-evenly">
            <button
              onClick={() => initialize()}
              className="px-8 py-3 text-base text-white bg-gray-600 rounded-lg"
            >
              Study Again?
            </button>
            <Link href="/decks">
              <a className="px-8 py-3 text-base text-white bg-gray-600 rounded-lg">
                Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
