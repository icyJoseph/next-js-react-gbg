import { usePokemon, type Poke } from "hooks/usePokemon";
import NextImage from "next/image";
import Link from "next/link";

type PokeCardProps = {
  pokemon: Poke;
  qty: number;
};

const SimplePokeCard = ({ pokemon, qty }: PokeCardProps) => {
  const cn = "nes-container with-title";
  const caught = Boolean(qty);

  return (
    <section className={`${cn} ${!!caught ? "is-dark" : ""}`}>
      <header className="title">
        <h1>{pokemon.name}</h1>

        <Link href={`/pokemon/${pokemon.id}`}>
          <a>
            <span className="nes-text is-primary">#{pokemon.id}</span>
          </a>
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

  return <SimplePokeCard pokemon={data} qty={value} />;
};
