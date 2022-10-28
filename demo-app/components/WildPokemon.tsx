import { useEffect, forwardRef } from "react";

import { motion, useAnimation } from "framer-motion";
import { assert } from "superstruct";

import wild from "design-system/Wild.module.css";
import { Catch, Pokemon, Status } from "types";

import { useWildPokemon } from "../hooks/useWildPokemon";
import { sleep } from "../lib/sleep";

type StatusProps = { status: Status };

type PokeCallbacks = {
  onFailure: () => void;
  onCapture: (pk: Pokemon) => void;
};

const pokemonInitial = { x: "110vw", y: "10vh" };
const pokemonReady = {
  x: "calc(80vw - 240px - 16px)",
  y: "10vh",
  opacity: 1,
};

type WildPokemonProps = StatusProps & PokeCallbacks;

export const WildPokemon = forwardRef<HTMLImageElement, WildPokemonProps>(
  function Pokemon({ status, onCapture, onFailure }, ref) {
    const control = useAnimation();
    const pokemon = useWildPokemon();

    useEffect(() => {
      if (status !== "trying") return;

      control.set({ opacity: 0 });
    }, [control, status]);

    useEffect(() => {
      if (!pokemon) return;

      if (status !== "pending") return;

      control.start(pokemonReady);
    }, [control, status, pokemon]);

    useEffect(() => {
      if (!pokemon) return;
      if (status !== "trying") return;

      const controller = new AbortController();

      fetch("/api/capture", {
        method: "POST",
        body: JSON.stringify({ id: pokemon.id }),
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      })
        .then(async (res) => {
          if (res.status !== 200) return onFailure();

          await sleep(1250 * 4);

          const data = await res.json();

          assert(data, Catch);

          return data.success ? onCapture(pokemon) : onFailure();
        })
        .catch(() => onFailure());

      return () => {
        controller.abort();
      };
    }, [status, pokemon, onCapture, onFailure]);

    if (pokemon === null) return null;

    const src = pokemon.sprites.frontDefault;

    return (
      <motion.img
        className={wild.pokemon}
        src={src}
        alt={pokemon.name}
        ref={ref}
        initial={pokemonInitial}
        animate={control}
        width="96"
        height="96"
      />
    );
  }
);
