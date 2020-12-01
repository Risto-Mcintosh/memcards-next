import CreateButton from 'components/CreateButton';
import DeckMenu from 'components/DeckMenu';
import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { client } from 'utils/client';

export default function Decks() {
  const { data: deckList, isLoading } = useQuery('decks', () =>
    client('/decks')
  );
  const [isCreateDeckFormOpen, showCreateDeckFrom] = useState(false);
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1 className="sr-only">Deck List</h1>
        <div className="max-w-xs mx-auto mt-8">
          {isLoading
            ? 'Loading...'
            : deckList.map((deck, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center py-2 text-2xl transition-colors duration-200 border-b border-gray-400 hover:bg-gray-300"
                  >
                    <Link href="#">
                      <a className="flex items-center justify-between flex-1 pl-2">
                        <div>{deck.name}</div>
                        <span aria-label="card count 25" className="text-xl">
                          {deck.cardCount}
                        </span>
                      </a>
                    </Link>
                    <DeckMenu />
                  </div>
                );
              })}
          {isCreateDeckFormOpen && (
            <div className="mt-2">
              <form className="flex justify-items-center">
                <TextInput
                  className="w-full rounded-l"
                  name="deck-name"
                  labelId="deck-name"
                  placeholder="Deck Name"
                />
                <button className="px-2 py-1 bg-gray-400 rounded-r">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
      <CreateButton showCreateDeckForm={() => showCreateDeckFrom(true)} />
    </Layout>
  );
}
