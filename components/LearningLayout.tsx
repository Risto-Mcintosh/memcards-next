import { useFlashcardContext } from '@context/flashcard';
import Head from 'next/head';

export function LearningLayout({ children }) {
  const { progress } = useFlashcardContext();
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Memcards</title>
      </Head>
      <div className="flex items-baseline justify-between p-4">
        <p>menu</p>
        <div className="relative flex-1 h-3 max-w-lg overflow-hidden bg-gray-300 rounded-lg shadow-inner">
          <div
            className="absolute inset-y-0 bg-gradient-to-tr from-brand-600 to-brand-200"
            style={{
              width: progress + '%'
            }}
          ></div>
        </div>
        <p>close</p>
      </div>
      <main className="flex-1 px-2 overflow-x-hidden overflow-y-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
}
