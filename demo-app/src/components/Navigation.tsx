import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledNav = styled.nav`
  height: 100%;
  font-size: 0.8rem;

  & > ul {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  & > li {
    flex: 1;
  }

  @media (min-width: 514px) {
    font-size: 1rem;

    & > ul {
      gap: 1rem;
    }
  }
`;

const getAnchorClassName = (isActive: boolean) =>
  `nes-text ${isActive ? "is-success" : ""}`.trim();

export const Navigation = () => {
  const { pathname } = useRouter();

  return (
    <StyledNav>
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
    </StyledNav>
  );
};
