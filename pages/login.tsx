import Layout from 'components/Layout';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col items-center h-full ">
        <h1 className="my-10 text-3xl">Memcards</h1>
        <div className="w-full max-w-xs">
          <form>
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <input
              className="w-full mb-6 text-xl rounded"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />

            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className="w-full mb-6 text-xl rounded"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <button
              className="block w-full py-2 mx-auto mb-6 text-xl text-white bg-gray-600 rounded"
              type="submit"
            >
              Login
            </button>

            <Link href="#">
              <a className="block w-full py-2 mx-auto text-xl text-center text-black border-2 border-gray-600 rounded">
                Register
              </a>
            </Link>
          </form>
        </div>
      </article>
    </Layout>
  );
}
