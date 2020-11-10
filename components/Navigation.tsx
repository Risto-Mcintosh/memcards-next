import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="container flex justify-between px-2 mx-auto text-lg">
      <Link href="/">
        <a>Memcards</a>
      </Link>

      <nav aria-label="Main Menu">
        <ul className="flex">
          <li className="mr-3">
            <Link href="/decks">
              <a>Decks</a>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
