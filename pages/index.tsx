import Layout from 'components/Layout';
import Head from 'next/head';
import Link from 'next/link';

const deckList = ['deck 1', 'deck 2', 'deck 3'];

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1 className="sr-only">Deck List</h1>
        <div className="mt-8 max-w-xl mx-auto">
          {deckList.map((deckName, i) => {
            return (
              <Link href="#">
                <a
                  key={i}
                  className="flex justify-between text-2xl items-center hover:bg-gray-300 p-2 border-gray-400 border-b transition-colors duration-200"
                >
                  <div>{deckName}</div>
                  <span
                    aria-label="card count 25"
                    className="text-base font-bold"
                  >
                    25
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
