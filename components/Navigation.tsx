import Link from 'next/link';

function Navigation() {
  return (
    <div className="container mx-auto flex justify-between">
      <header>
        <Link href="/">
          <a>Memcards</a>
        </Link>
      </header>
      <nav>
        <ul>
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
