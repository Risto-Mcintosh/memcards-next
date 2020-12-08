import CreateButton from 'components/CreateButton';
import CreateDeckForm from 'components/CreateDeckForm';
import DeckMenu from 'components/DeckMenu';
import Layout from 'components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { useQuery } from 'react-query';
import { client } from 'utils/client';
export default function Decks() {
  const { data: deckList, isLoading } = useQuery('decks', () =>
    client('/decks')
  );
  const [isCreateDeckFormOpen, showCreateDeckFrom] = React.useState(false);
  const createButtonRef = React.useRef(null);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="relative h-full max-w-2xl mx-auto">
        <h1 className="sr-only">Deck List</h1>
        <div className="relative max-w-xs mx-auto">
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
            <CreateDeckForm
              hideCreateDeckForm={() => showCreateDeckFrom(false)}
              anchorEl={createButtonRef}
            />
          )}
        </div>
        <CreateButton
          ref={createButtonRef}
          showCreateDeckForm={() => showCreateDeckFrom(true)}
        />
      </section>
    </Layout>
  );
}
