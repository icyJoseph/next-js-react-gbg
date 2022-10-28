import NextImage from "next/legacy/image";

import card from "design-system/Card.module.css";
import type { Poke } from "hooks/usePokemon";

type PokeCardProps = {
  pokemon: Poke;
};

export const PokeCard = ({ pokemon }: PokeCardProps) => (
  <div className={card.wrapper}>
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
  </div>
);
