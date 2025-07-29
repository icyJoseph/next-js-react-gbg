"use client";

import { useCallback, useEffect, useState, useRef } from "react";

import { useAnimation, type LegacyAnimationControls } from "framer-motion";

import { CaptureDialog } from "../../../components/CaptureDialog";
import { Scene } from "../../../components/CaptureScene";
import { PokeBall } from "../../../components/PokeBall";
import { WildPokemon } from "../../../components/WildPokemon";
import type { Pokemon, Status } from "../../../types";

const pokeBallInitial = { x: 0, y: "calc(110vh - 3rem)", scale: 1 };
const pokeBallReady = { x: 0, y: "calc(80vh - 3rem)", scale: 1 };

const animatePokeBall = (
  controls: LegacyAnimationControls,
  { dx, dy }: { dx: number; dy: number }
) => {
  return Promise.all([
    controls.start({
      x: `calc(80vw - ${dx}px)`,
      transition: { duration: 0.75 },
    }),
    controls.start({
      y: dy,
      transition: {
        duration: 0.75,
        type: "spring",
        stiffness: 80,
        damping: 10,
        mass: 1,
      },
    }),
    controls.start({
      scale: 0.7,
      transition: { duration: 0.75 },
    }),
  ]);
};

export default function CapturePage() {
  const controls = useAnimation();

  const imageRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLButtonElement>(null);

  const [status, setStatus] = useState<Status>("pending");
  const [captured, setCaptured] = useState<Pokemon | null>(null);

  const onCapture = useCallback((pk: Pokemon) => {
    setStatus("captured");
    setCaptured(pk);
  }, []);

  const onFailure = useCallback(() => setStatus("pending"), []);

  useEffect(() => {
    if (status !== "captured") {
      if (captured) setCaptured(null);
    }
  }, [status, captured]);

  useEffect(() => {
    if (status !== "pending") return;

    const raf = requestAnimationFrame(() => {
      controls.start(pokeBallReady);
    });

    return () => {
      cancelAnimationFrame(raf);
      controls.stop();
    };
  }, [status, controls]);

  const handleClick = async () => {
    if (status !== "pending") return;
    if (!imageRef.current) return;
    if (!ballRef.current) return;

    const pokemon = imageRef.current.getBoundingClientRect();
    const ball = ballRef.current.getBoundingClientRect();

    // TODO: Document Magic Numbers
    const dx = pokemon.width / 2 + ball.width / 2 + 16;
    const dy = pokemon.top + pokemon.height / 2 - ball.height / 2 - 3 * 16;

    try {
      await animatePokeBall(controls, { dx, dy });

      setStatus("trying");
    } catch {
      onFailure();
    }
  };

  if (status === "captured") {
    return (
      <CaptureDialog
        captured={captured}
        onDismiss={() => setStatus("pending")}
      />
    );
  }

  return (
    <Scene>
      <WildPokemon
        status={status}
        onCapture={onCapture}
        onFailure={onFailure}
        ref={imageRef}
      />

      <PokeBall
        animate={controls}
        initial={pokeBallInitial}
        status={status}
        onClick={handleClick}
        ref={ballRef}
      />
    </Scene>
  );
}
