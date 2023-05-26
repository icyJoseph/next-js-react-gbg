import NextImage from "next/image";
import Link from "next/link";

import { usePokemon, type Poke } from "hooks/usePokemon";

type PokeCardProps = {
  pokemon: Poke;
  qty: number;
};

const Pokemon = ({ pokemon, qty }: PokeCardProps) => {
  const cn = "nes-container with-title";
  const caught = Boolean(qty);

  return (
    <section className={`${cn} ${!!caught ? "is-dark" : ""}`}>
      <header className="title">
        <h1 className="capitalize">{pokemon.name}</h1>

        <Link href={`/pokemon/${pokemon.id}`}>
          <span className="nes-text is-primary">#{pokemon.id}</span>
        </Link>
      </header>

      <NextImage
        className="pokemon-img"
        src={pokemon.sprites.frontDefault}
        width="120"
        height="120"
        alt={pokemon.name}
      />

      <p>Caught {qty} time(s)</p>
    </section>
  );
};

export const PokeArticle = ({
  id,
  value,
}: {
  id: string | number;
  value: number;
}) => {
  const { data, error } = usePokemon(id);

  if (error) return <div>Error</div>;

  if (!data) return null;

  return <Pokemon pokemon={data} qty={value} />;
};
