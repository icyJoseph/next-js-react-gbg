import { useEffect, forwardRef } from "react";

import { motion, useAnimation } from "framer-motion";

import capture from "design-system/capture.module.css";
import { Pokemon, Status } from "types";

const pokemonInitial = { x: "110vw", y: "calc(10vh - 3rem)" };
const pokemonReady = {
  x: "calc(80vw - 240px - 16px)",
  y: "calc(10vh - 3rem)",
  opacity: 1,
};

type WildPokemonProps = { pokemon: Pokemon | null; status: Status };

export const WildPokemon = forwardRef<HTMLImageElement, WildPokemonProps>(
  function Pokemon({ pokemon, status }, ref) {
    const control = useAnimation();

    useEffect(() => {
      if (status !== "trying") return;

      control.set({ opacity: 0 });
    }, [control, status]);

    useEffect(() => {
      if (!pokemon) return;
      if (status !== "pending") return;

      control.start(pokemonReady);
    }, [control, status, pokemon]);

    if (!pokemon) return null;

    const src = pokemon.sprites.frontDefault;

    return (
      <motion.img
        className={capture.wildPokemon}
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
