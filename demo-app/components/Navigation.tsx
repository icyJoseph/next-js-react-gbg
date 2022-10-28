"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// import navigation from "design-system/Navigation.module.css";

const getAnchorClassName = (isActive: boolean) =>
  `nes-text ${isActive ? "is-success" : ""}`.trim();

export const Navigation = ({
  navClassName,
  listClassName,
}: {
  navClassName: string;
  listClassName: string;
}) => {
  const pathname = usePathname();

  return (
    <nav className={navClassName}>
      <ul className={listClassName}>
        <li>
          <Link href="/" className={getAnchorClassName(pathname === "/")}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/pokemon/capture"
            className={getAnchorClassName(pathname === "/pokemon/capture")}
          >
            Capture
          </Link>
        </li>
        <li>
          <Link
            href="/collection"
            className={getAnchorClassName(pathname === "/collection")}
          >
            Collection
          </Link>
        </li>
      </ul>
    </nav>
  );
};
