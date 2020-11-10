import Link from 'next/link';

function Navigation() {
  return (
    <div className="container mx-auto flex justify-between text-lg">
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

export default Navigation;
