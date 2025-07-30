import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PokeCard } from "../../../components/PokeCard";
import { fetchPokemon } from "../../../lib/pokemon";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const idx = Number(id);

  if (Number.isNaN(idx)) {
    return { title: "Pokemon Not Found | Poké Adventure" };
  }

  const pokemon = await fetchPokemon(idx);

  if (!pokemon) {
    return { title: "Pokemon Not Found | Poké Adventure" };
  }

  return {
    title: `${pokemon.name} | Poké Adventure`,
  };
}

export default async function PokemonPage({ params }: PageProps) {
  const { id } = await params;
  const idx = Number(id);

  if (Number.isNaN(idx)) {
    notFound();
  }

  const pokemon = await fetchPokemon(idx);

  if (!pokemon) notFound();

  return <PokeCard pokemon={pokemon} />;
}

// Generate static params for the initial Pokemon
export async function generateStaticParams() {
  const initial = [1, 4, 7];

  return initial.map((id) => ({
    id: id.toString(),
  }));
}
