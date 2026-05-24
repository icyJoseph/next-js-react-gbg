"use client";

import {
  type ComponentType,
  type RefObject,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";

import { capturePokemonAction } from "app/actions/capture";
import { CaptureDialog } from "components/CaptureDialog";
import { useWildPokemon } from "hooks/useWildPokemon";
import { sleep } from "lib/sleep";
import type { Pokemon } from "types";

const PokeImg = styled.img`
  width: 240px;
  height: 240px;
  image-rendering: pixelated;
`;

const PokeWrapper = styled(motion.div)`
  position: absolute;
  width: 240px;
  height: 240px;
`;

const Hint = styled.p<{ $hidden: boolean }>`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
  color: #6c757d;
  font-size: 0.75rem;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

const pokemonInitial = { x: "110vw", y: "calc(10vh - 3rem)" };
const pokemonReady = {
  x: "calc(80vw - 240px - 16px)",
  y: "calc(10vh - 3rem)",
  opacity: 1,
};

type WildPokemonProps = {
  PokeBall: ComponentType<{
    pending: boolean;
    target: RefObject<HTMLDivElement | null>;
  }>;
};

async function captureWithDelay(
  ...params: Parameters<typeof capturePokemonAction>
) {
  const result = await capturePokemonAction(...params);
  await sleep(1250 * 4);
  return result.success;
}

function WildPokemon({
  pokemon,
  pending,
  ref,
}: {
  pokemon: Pokemon | null;
  pending: boolean;
  ref: RefObject<HTMLDivElement | null>;
}) {
  const control = useAnimation();

  useEffect(() => {
    if (!pokemon) return;

    const raf = requestAnimationFrame(() => {
      control.start(pokemonReady);
    });

    return () => {
      cancelAnimationFrame(raf);
      control.stop();
    };
  }, [pokemon, control]);

  useEffect(() => {
    control.start({ opacity: pending ? 0 : 1 });
  }, [pending, control]);

  const imgSrc = pokemon?.sprites.frontDefault;

  return (
    <PokeWrapper ref={ref} initial={pokemonInitial} animate={control}>
      <PokeImg src={imgSrc} alt={pokemon?.name} width="96" height="96" />
    </PokeWrapper>
  );
}

export function Capture({ PokeBall }: WildPokemonProps) {
  const [pokemon, reset] = useWildPokemon();

  const [captured, formAction, pending] = useActionState(
    captureWithDelay,
    false
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (captured === true) setShowDialog(true);
  }, [captured]);

  if (showDialog) {
    return (
      <CaptureDialog
        captured={pokemon}
        onDismiss={() => {
          setShowDialog(false);
          reset();
        }}
      />
    );
  }

  return (
    <form action={formAction.bind(null, pokemon?.id ?? "")}>
      <WildPokemon pokemon={pokemon} pending={pending} ref={containerRef} />

      <PokeBall target={containerRef} pending={pending} />

      <Hint $hidden={pending || !pokemon}>Tap the Pokéball to throw!</Hint>
    </form>
  );
}
