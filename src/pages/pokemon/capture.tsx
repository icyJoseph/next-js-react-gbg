import { useEffect, useRef, useState, forwardRef, useCallback } from "react";

import type { NextPage } from "next";

import { motion, useAnimation } from "framer-motion";

import { assert } from "superstruct";

import { useWildPokemon } from "hooks/useWildPokemon";
import { sleep } from "lib/sleep";
import { Pokemon, Catch } from "types";

type Status = "pending" | "trying" | "captured";

type StatusProps = { status: Status };

type PokeCallbacks = { onFailure: () => void; onCapture: () => void };

const PokeBall = ({ status }: StatusProps) => (
  <i className={`nes-pokeball ${status}`}></i>
);

const pokeInitial = { x: "110vw", y: "10vh" };
const pokeReady = { x: "calc(90vw - 240px)", y: "10vh", opacity: 1 };

const WildPokemon = forwardRef<HTMLImageElement, StatusProps & PokeCallbacks>(
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

      control.start(pokeReady);
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
      }).then(
        async (res) => {
          if (res.status !== 200) return onFailure();

          await sleep(1250 * 4);

          const data = await res.json();

          assert(data, Catch);

          return data.success ? onCapture() : onFailure();
        },
        () => onFailure()
      );

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
        initial={pokeInitial}
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
  }
);

const pokeballInitial = Object.freeze({ x: "10vh", y: "110vh", scale: 1 });
const pokeballReady = Object.freeze({ x: "10vh", y: "80vh", scale: 1 });

const Capture: NextPage = () => {
  const controls = useAnimation();

  const imageRef = useRef<HTMLImageElement>(null);
  const ballRef = useRef<HTMLButtonElement>(null);

  const [status, setStatus] = useState<Status>("pending");

  const onCapture = useCallback(() => setStatus("captured"), []);

  const onFailure = useCallback(() => {
    setStatus("pending");

    controls.set(pokeballReady);
  }, [controls]);

  useEffect(() => {
    if (status !== "pending") return;

    controls.start(pokeballReady);
  }, [status, controls]);

  const handleClick = async () => {
    if (status !== "pending") return;
    if (!imageRef.current) return;
    if (!ballRef.current) return;

    const image = imageRef.current.getBoundingClientRect();
    const { width, height } = ballRef.current.getBoundingClientRect();

    const dx = imageRef.current.width / 2 + width / 2;

    const y = image.top + imageRef.current.height / 2 - height / 2;

    try {
      await Promise.all([
        controls.start({
          x: `calc(90vw - ${dx}px)`,
          transition: { duration: 0.75 },
        }),
        controls.start({
          y,
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

      setStatus("trying");
    } catch (e) {
      onFailure();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute" }}>
        <span>{status}</span>
      </div>

      <WildPokemon
        status={status}
        ref={imageRef}
        onCapture={onCapture}
        onFailure={onFailure}
      />

      <motion.button
        className="btn-pokeball"
        animate={controls}
        initial={pokeballInitial}
        style={{
          position: "absolute",
        }}
        ref={ballRef}
        onClick={handleClick}
      >
        <PokeBall status={status} />
      </motion.button>
    </div>
  );
};

export default Capture;
