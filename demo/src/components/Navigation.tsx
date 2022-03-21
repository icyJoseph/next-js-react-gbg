import Link from "next/link";
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

export const Navigation = () => {
  return (
    <StyledNav>
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
    </StyledNav>
  );
};
