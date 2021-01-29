import CreateButton from 'components/CreateButton';
import CreateDeckForm from '@components/DeckCreateForm';
import DeckMenu from 'components/DeckMenu';
import Layout from 'components/Layout';
import Link from 'next/link';
import * as React from 'react';
import { useDeckList } from 'utils/client';
import { Spacer } from '@ui/Spacer';
export default function Decks() {
  const { data: deckList, isLoading } = useDeckList();
  const [isCreateDeckFormOpen, showCreateDeckFrom] = React.useState(false);
  const createButtonRef = React.useRef(null);

  return (
    <Layout>
      <div className="relative max-w-2xl min-h-full py-4 mx-auto">
        <h1 className="sr-only">Deck List</h1>
        <div className="relative max-w-xs mx-auto">
          {isLoading
            ? 'Loading...'
            : deckList.map((deck, i) => {
                const isDeckEmpty = deck.cardCount === 0;
                return (
                  <div
                    key={i}
                    className="flex items-center pl-2 mb-1 text-2xl border-b-2 border-gray-200"
                  >
                    <Link href={`deck/${deck.id}`}>
                      <a
                        className={`flex items-center justify-between flex-1 ${
                          isDeckEmpty && 'pointer-events-none'
                        }`}
                        aria-disabled={isDeckEmpty ? true : false}
                      >
                        <div>{deck.name}</div>
                        <span
                          aria-label={`card count ${deck.cardCount}`}
                          className="text-xl"
                        >
                          {deck.cardCount}
                        </span>
                      </a>
                    </Link>
                    <Spacer size={15} />
                    <DeckMenu deck={deck} />
                  </div>
                );
              })}
          {isCreateDeckFormOpen && (
            <CreateDeckForm
              hideForm={() => showCreateDeckFrom(false)}
              focusOnCloseEl={createButtonRef}
            />
          )}
        </div>
        <CreateButton
          ref={createButtonRef}
          showCreateDeckForm={() => showCreateDeckFrom(true)}
        />
      </div>
    </Layout>
  );
}
