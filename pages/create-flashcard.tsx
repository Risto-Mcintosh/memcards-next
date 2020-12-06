import ImageSearch from 'components/ImageSearch';
import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Head from 'next/head';
import React from 'react';

export default function Home() {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col items-center">
        <h1 className="mb-6 text-3xl">Create A New Flashcard</h1>
        <div className="w-full max-w-xs">
          <form>
            <select className="w-full mb-6 text-xl rounded" name="deck-name">
              <option value="deck1">deck1</option>
              <option value="deck2">deck2</option>
              <option value="deck3">deck3</option>
            </select>

            <TextInput name="front" labelId="card-front" label="Front:" />

            <div className="flex mb-6">
              <p className="">Image (optional):</p>
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="px-3 py-2 ml-4 bg-gray-300 rounded"
              >
                Search
              </button>
            </div>

            <TextInput name="back" labelId="card-back" label="Back:" />

            <button
              className="block px-16 py-3 mx-auto text-2xl text-white bg-gray-600 rounded-xl"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </article>
      {isOpen && <ImageSearch closeSearch={() => setOpen(false)} />}
    </Layout>
  );
}
