import styled from "styled-components";
import Link from "next/link";

const StyledNav = styled.nav`
  padding: 1rem;

  & > ul {
    display: flex;
    list-style: none;
    justify-content: space-evenly;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
  }

  & > li {
    flex: 1;
    text-align: center;
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
