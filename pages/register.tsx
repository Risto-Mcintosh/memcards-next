import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <article className="flex flex-col items-center h-full ">
        <h1 className="my-10 text-3xl">Memcards</h1>
        <div className="w-full max-w-xs">
          <form>
            <TextInput name="email" labelId="email" label="Email" />
            <TextInput name="username" labelId="username" label="Username" />
            <TextInput
              name="password"
              labelId="password"
              label="Password"
              type="password"
            />
            <button
              className="block w-full py-2 mx-auto mb-6 text-xl text-white bg-gray-600 rounded"
              type="submit"
            >
              Register
            </button>

            <Link href="#">
              <a className="block w-full py-2 mx-auto text-xl text-center text-black border-2 border-gray-600 rounded">
                Login
              </a>
            </Link>
          </form>
        </div>
      </article>
    </Layout>
  );
}
