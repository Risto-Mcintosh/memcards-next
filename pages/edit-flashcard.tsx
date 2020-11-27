import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col items-center h-full ">
        <h1 className="my-10 text-3xl">Edit Flashcard</h1>
        <div className="w-full max-w-xs">
          <form>
            <label className="block mb-2" htmlFor="deck-name">
              Deck Name:
            </label>
            <input
              className="w-full px-0 mb-6 border-0 border-b"
              type="text"
              name="front"
              id="deck-name"
              value="Deck 1"
              readOnly
            />
            <TextInput
              labelId="card-front"
              name="front"
              label="Front:"
              hideLabel={false}
            />

            <input className="mb-6" type="file" name="image" id="" />

            <TextInput
              labelId="card-back"
              name="back"
              label="Back:"
              hideLabel={false}
            />
            <button
              className="block px-16 py-3 mx-auto text-2xl text-white bg-gray-600 rounded-xl"
              type="submit"
            >
              Edit
            </button>
          </form>
        </div>
      </article>
    </Layout>
  );
}
