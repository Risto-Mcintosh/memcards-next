import CreateButton from 'components/CreateButton';
import DeckMenu from 'components/DeckMenu';
import Layout from 'components/Layout';
import Head from 'next/head';
import Link from 'next/link';

const deckList = ['deck 1', 'deck 2', 'deck 3'];

export default function Decks() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1 className="sr-only">Deck List</h1>
        <div className="max-w-xs mx-auto mt-8">
          {deckList.map((deckName, i) => {
            return (
              <div
                key={i}
                className="flex items-center py-2 text-2xl transition-colors duration-200 border-b border-gray-400 focus-within:bg-gray-300 hover:bg-gray-300"
              >
                <Link href="#">
                  <a className="flex items-center justify-between flex-1 pl-2">
                    <div>{deckName}</div>
                    <span aria-label="card count 25" className="text-xl">
                      25
                    </span>
                  </a>
                </Link>
                <DeckMenu />
              </div>
            );
          })}
        </div>
      </section>
      <CreateButton />
    </Layout>
  );
}
