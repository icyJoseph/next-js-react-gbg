import { PokeCard } from "components/PokeCard";
import { fetchPokemon } from "lib/pokemon";

const initial = [1, 4, 7];

export const dynamicParams = true;

export async function generateStaticParams() {
  return initial.map((id) => ({
    id: `${id}`,
  }));
}

async function PokeView({ params }: { params: { id: string } }) {
  const pokemon = await fetchPokemon(params.id);
  return <PokeCard pokemon={pokemon} />;
}

export default PokeView;
