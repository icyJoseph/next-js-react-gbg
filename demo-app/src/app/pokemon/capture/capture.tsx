"use client";

import { useEffect, useRef, useState, startTransition } from "react";

import { useAnimation, type AnimationControls } from "framer-motion";
import { assert } from "superstruct";

import { CaptureDialog } from "components/CaptureDialog";
import { PokeBall } from "components/PokeBall";
import { WildPokemon } from "components/WildPokemon";
import capture from "design-system/capture.module.css";
import { RenderWithPokemon } from "hooks/useWildPokemon";
import { sleep } from "lib/sleep";
import { Catch, Pokemon, Status } from "types";

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

export const PokemonCapture = ({
  updateCollection,
}: {
  updateCollection: VoidFunction;
}) => {
  const controls = useAnimation();

  const imageRef = useRef<HTMLImageElement>(null);
  const ballRef = useRef<HTMLButtonElement>(null);

  const [status, setStatus] = useState<Status>("pending");
  const [captured, setCaptured] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (status !== "captured") {
      if (captured) setCaptured(null);
    }
  }, [status, captured]);

  useEffect(() => {
    if (status !== "pending") return;

    controls.start(pokeBallReady);
  }, [status, controls]);

  useEffect(() => {
    if (status === "captured") {
      document.title = "🎉🎉🎉 | Poké Adventure";
    } else {
      document.title = "Capture | Poké Adventure";
    }
  }, [status]);

  const controllerRef = useRef<AbortController>();

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  const handleClick = async (target: Pokemon | null) => {
    if (!target) return;
    if (status !== "pending") return;
    if (!imageRef.current) return;
    if (!ballRef.current) return;

    const pokemon = imageRef.current.getBoundingClientRect();
    const ball = ballRef.current.getBoundingClientRect();

    // TODO: Document Magic Numbers
    const dx = imageRef.current.width / 2 + ball.width / 2 + 16;
    const dy =
      pokemon.top + imageRef.current.height / 2 - ball.height / 2 - 3 * 16;

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      await animatePokeBall(controls, { dx, dy });

      setStatus("trying");

      const response = await fetch("/api/capture", {
        method: "POST",
        body: JSON.stringify({ id: target.id }),
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      // At this point the cookie has been mutated, refresh the collection
      startTransition(() => updateCollection());

      await sleep(1000 * 5);

      if (response.status !== 200) {
        throw new Error("Failed to capture");
      }

      const data = await response.json();

      assert(data, Catch);

      const nextStatus = data.success ? "captured" : "pending";

      const nextCaptured = data.success ? target : null;

      setStatus(nextStatus);

      setCaptured(nextCaptured);
    } catch (_reason) {
      if (controller.signal.aborted) return;

      setStatus("pending");
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
    <div className={capture.scene}>
      <RenderWithPokemon>
        {({ pokemon }) => (
          <>
            <WildPokemon pokemon={pokemon} status={status} ref={imageRef} />

            <PokeBall
              animate={controls}
              initial={pokeBallInitial}
              status={status}
              onClick={() => handleClick(pokemon)}
              ref={ballRef}
            />
          </>
        )}
      </RenderWithPokemon>
    </div>
  );
};
