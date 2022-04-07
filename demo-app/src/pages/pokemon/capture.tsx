import { useEffect, useRef, useState, useCallback } from "react";

import { useAnimation, type AnimationControls } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";

import { CaptureDialog } from "components/CaptureDialog";
import { Scene } from "components/CaptureScene";
import { PokeBall } from "components/PokeBall";
import { WildPokemon } from "components/WildPokemon";
import type { Pokemon, Status } from "types";

const pokeBallInitial = { x: 0, y: "calc(110vh - 3rem)", scale: 1 };
const pokeBallReady = { x: 0, y: "calc(80vh - 3rem)", scale: 1 };

const animatePokeBall = (
  controls: AnimationControls,
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

const Capture: NextPage = () => {
  const controls = useAnimation();

  const imageRef = useRef<HTMLImageElement>(null);
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

    controls.start(pokeBallReady);
  }, [status, controls]);

  const handleClick = async () => {
    if (status !== "pending") return;
    if (!imageRef.current) return;
    if (!ballRef.current) return;

    const pokemon = imageRef.current.getBoundingClientRect();
    const ball = ballRef.current.getBoundingClientRect();

    // TODO: Document Magic Numbers
    const dx = imageRef.current.width / 2 + ball.width / 2 + 16;
    const dy =
      pokemon.top + imageRef.current.height / 2 - ball.height / 2 - 3 * 16;

    try {
      await animatePokeBall(controls, { dx, dy });

      setStatus("trying");
    } catch (e) {
      onFailure();
    }
  };

  if (status === "captured") {
    return (
      <>
        <Head>
          <title>🎉🎉🎉 | Poké Adventure</title>
        </Head>

        <CaptureDialog
          captured={captured}
          onDismiss={() => setStatus("pending")}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Capture | Poké Adventure</title>
      </Head>

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
    </>
  );
};

export default Capture;
