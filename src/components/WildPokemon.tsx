import { useEffect, forwardRef } from "react";

import { motion, useAnimation } from "framer-motion";

import { assert } from "superstruct";

import { useWildPokemon } from "hooks/useWildPokemon";
import { sleep } from "lib/sleep";
import { Catch, Status } from "types";

type StatusProps = { status: Status };

type PokeCallbacks = { onFailure: () => void; onCapture: () => void };

const pokemonInitial = { x: "110vw", y: "calc(10vh - 3rem)" };
const pokemonReady = {
  x: "calc(90vw - 240px)",
  y: "calc(10vh - 3rem)",
  opacity: 1,
};

export const WildPokemon = forwardRef<
  HTMLImageElement,
  StatusProps & PokeCallbacks
>(function Pokemon({ status, onCapture, onFailure }, ref) {
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

        return data.success ? onCapture() : onFailure();
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
      src={src}
      alt={pokemon.name}
      ref={ref}
      initial={pokemonInitial}
      animate={control}
      width="96"
      height="96"
      style={{
        width: "240px",
        height: "240px",
        position: "absolute",
        imageRendering: "pixelated",
      }}
    />
  );
});
