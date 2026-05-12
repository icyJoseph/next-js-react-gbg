"use client";

import { use } from "react";

import NextImage from "next/image";
import Link from "next/link";

import type { Poke } from "hooks/usePokemon";
import type { Pokemon } from "types";

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
        <h3 className="capitalize">{pokemon.name}</h3>

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
  value,
  promise,
}: {
  id: string | number;
  value: number;
  promise: Promise<Pokemon | null>;
}) => {
  const pokemon = use(promise);

  if (!pokemon) return null;

  return <SimplePokeCard pokemon={pokemon} qty={value} />;
};
