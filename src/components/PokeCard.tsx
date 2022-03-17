import type { Poke } from "hooks/usePokemon";
import NextImage from "next/image";

type PokeCardProps = {
  pokemon: Poke;
};

export const PokeCard = ({ pokemon }: PokeCardProps) => (
  <div className="max-width-wrapper pokecard-container">
    <section className="nes-container with-title pokecard">
      <header className="title">
        <h1>{pokemon.name}</h1>

        <p>#{pokemon.id}</p>
      </header>

      <NextImage
        className="pokemon-img"
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
