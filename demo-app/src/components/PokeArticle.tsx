"use client";

import { use } from "react";

import NextImage from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

import type { Poke } from "hooks/usePokemon";
import type { Pokemon } from "types";

type PokeCardProps = {
  pokemon: Poke;
  qty: number;
};

const bounce = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-12px) rotate(20deg); }
`;

const Placeholder = styled.div`
  width: 120px;
  height: 120px;
  display: grid;
  place-items: center;
  font-size: 3rem;
  color: #888;
`;

const BouncingBall = styled.i`
  display: inline-block;
  animation: ${bounce} 1.4s ease-in-out infinite;
`;

export const PokeArticleSkeleton = ({
  id,
  value,
}: {
  id: string | number;
  value: number;
}) => {
  const caught = Boolean(value);
  return (
    <section
      className={`nes-container with-title ${caught ? "is-dark" : ""}`.trim()}
    >
      <header className="title">
        <h3 aria-hidden>?</h3>
        <span className="nes-text is-primary">#{id}</span>
      </header>

      <Placeholder>
        {caught ? (
          <BouncingBall className="nes-pokeball" aria-label="caught" />
        ) : (
          <span aria-hidden>?</span>
        )}
      </Placeholder>

      <p>Caught {value} time(s)</p>
    </section>
  );
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
