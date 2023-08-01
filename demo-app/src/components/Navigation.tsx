"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import style from "design-system/navigation.module.css";

const getAnchorClassName = (isActive: boolean) =>
  `nes-text ${isActive ? "is-success" : ""}`.trim();

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={style.navigation}>
      <ul>
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
