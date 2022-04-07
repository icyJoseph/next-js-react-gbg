import NextImage from "next/image";
import styled from "styled-components";

import type { Poke } from "hooks/usePokemon";

type PokeCardProps = {
  pokemon: Poke;
};

const StyledDiv = styled.div`
  display: grid;
  place-items: center;
  min-height: 100%;

  & img {
    image-rendering: pixelated;
  }

  & pre {
    white-space: pre-line;
  }

  & > .nes-container {
    width: 80%;
    max-width: 514px;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

export const PokeCard = ({ pokemon }: PokeCardProps) => (
  <StyledDiv className="max-width-wrapper">
    <section className="nes-container with-title">
      <header className="title">
        <h1>{pokemon.name}</h1>

        <p>#{pokemon.id}</p>
      </header>

      <NextImage
        src={pokemon.sprites.frontDefault}
        width="240"
        height="240"
        alt={pokemon.name}
      />

      <div>
        <pre>
          {(pokemon.height * 0.1).toFixed(2)} m -{" "}
          {(pokemon.weight * 0.1).toFixed(2)} kg
        </pre>
      </div>

      <div>
        <pre>{pokemon.description}</pre>
      </div>
    </section>
  </StyledDiv>
);
