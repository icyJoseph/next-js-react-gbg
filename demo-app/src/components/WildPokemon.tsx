"use client";

import { type RefObject, useEffect } from "react";

import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { assert } from "superstruct";

import { useWildPokemon } from "hooks/useWildPokemon";
import { sleep } from "lib/sleep";
import { Catch, type Pokemon, type Status } from "types";

type StatusProps = { status: Status };

type PokeCallbacks = {
  onFailure: () => void;
  onCapture: (pk: Pokemon) => void;
};

const StyledImg = styled.img`
  width: 240px;
  height: 240px;
  image-rendering: pixelated;
`;

const StyledMotionDiv = styled(motion.div)`
  position: absolute;
  width: 240px;
  height: 240px;
`;

const pokemonInitial = { x: "110vw", y: "calc(10vh - 3rem)" };
const pokemonReady = {
  x: "calc(80vw - 240px - 16px)",
  y: "calc(10vh - 3rem)",
  opacity: 1,
};

type WildPokemonProps = StatusProps &
  PokeCallbacks & { ref: RefObject<HTMLDivElement | null> };

export function WildPokemon({
  status,
  onCapture,
  onFailure,
  ref,
}: WildPokemonProps) {
  const control = useAnimation();
  const pokemon = useWildPokemon();

  useEffect(() => {
    if (status !== "trying") return;

    control.set({ opacity: 0 });
  }, [control, status]);

  useEffect(() => {
    if (!pokemon) return;

    if (status !== "pending") return;

    const raf = requestAnimationFrame(() => {
      control.start(pokemonReady);
    });

    return () => {
      cancelAnimationFrame(raf);
      control.stop();
    };
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
      .catch(() => {
        if (controller.signal.aborted) return;
        onFailure();
      });

    return () => {
      controller.abort("Cancelling Capture");
    };
  }, [status, pokemon, onCapture, onFailure]);

  if (pokemon === null) return null;

  const src = pokemon.sprites.frontDefault;

  return (
    <StyledMotionDiv ref={ref} initial={pokemonInitial} animate={control}>
      <StyledImg src={src} alt={pokemon.name} width="96" height="96" />
    </StyledMotionDiv>
  );
}
