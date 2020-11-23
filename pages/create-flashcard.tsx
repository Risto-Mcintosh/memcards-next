import Layout from 'components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col items-center h-full ">
        <h1 className="my-10 text-3xl">Create A New Flashcard</h1>
        <div className="w-full max-w-xs">
          <form>
            <select className="w-full mb-6 rounded" name="deck-name" id="">
              <option value="deck1">deck1</option>
              <option value="deck2">deck2</option>
              <option value="deck3">deck3</option>
            </select>

            <label className="sr-only" htmlFor="card-front">
              Front
            </label>
            <input
              className="w-full mb-6 rounded"
              type="text"
              name="front"
              id="card-front"
              placeholder="Front"
            />

            <input
              className="mb-6"
              type="file"
              name="image"
              id=""
              placeholder="Image"
            />

            <label className="sr-only" htmlFor="card-back">
              Back
            </label>
            <input
              className="w-full mb-6 rounded"
              type="text"
              name="back"
              id="card-back"
              placeholder="Back"
            />
            <button
              className="block px-16 py-3 mx-auto text-2xl text-white bg-gray-600 rounded-xl"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </article>
    </Layout>
  );
}
