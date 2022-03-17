import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/pokemon/capture">
            <a>Capture</a>
          </Link>
        </li>
        <li>
          <Link href="/collection">
            <a>Collection</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
