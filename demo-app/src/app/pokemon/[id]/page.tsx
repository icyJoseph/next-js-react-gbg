import { notFound, redirect } from "next/navigation";

import { PokeCard } from "components/PokeCard";
import { fetchPokemon } from "lib/pokemon";

const initial = [1, 4, 7];

export const generateStaticParams = () => {
  return initial.map((id) => ({ id: `${id}` }));
};

const pokemonData = async (id: string) => {
  const idx = Number(id);

  if (Number.isNaN(idx)) {
    redirect("/");
  }

  try {
    const pokemon = await fetchPokemon(idx);

    return pokemon;
  } catch (e) {
    notFound();
  }
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const pokemon = await pokemonData(params.id);

  return {
    title: `${pokemon.name} | Poké Adventure `,
  };
};

const PokeView = async ({ params }: { params: { id: string } }) => {
  const pokemon = await pokemonData(params.id);

  return <PokeCard pokemon={pokemon} />;
};

export default PokeView;
