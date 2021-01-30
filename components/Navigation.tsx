import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="flex justify-between max-w-2xl px-4 mx-auto text-lg">
      <Link href="/">
        <a>Memcards</a>
      </Link>

      <nav aria-label="Main Menu">
        <ul className="flex">
          <li className="mr-3">
            <Link href="/decks">
              <a className="py-1 px-1.5 rounded-lg ring-brand-600 hover:ring-4">
                Decks
              </a>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <a className="py-1 px-1.5 rounded-lg ring-brand-600 hover:ring-4">
                Logout
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
