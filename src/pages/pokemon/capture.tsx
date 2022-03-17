import { useEffect, useRef, useState, useCallback } from "react";

import type { NextPage } from "next";
import { motion, useAnimation } from "framer-motion";

import { PokeBall } from "components/PokeBall";
import { WildPokemon } from "components/WildPokemon";

import type { Status } from "types";
import Head from "next/head";

const pokeBallInitial = { x: 0, y: "calc(110vh - 3rem)", scale: 1 };
const pokeBallReady = { x: 0, y: "calc(80vh - 3rem)", scale: 1 };

const Capture: NextPage = () => {
  const controls = useAnimation();

  const imageRef = useRef<HTMLImageElement>(null);
  const ballRef = useRef<HTMLButtonElement>(null);

  const [status, setStatus] = useState<Status>("pending");

  const onCapture = useCallback(() => setStatus("captured"), []);

  const onFailure = useCallback(() => {
    setStatus("pending");

    controls.set(pokeBallReady);
  }, [controls]);

  useEffect(() => {
    if (status !== "pending") return;

    controls.start(pokeBallReady);
  }, [status, controls]);

  const handleClick = async () => {
    if (status !== "pending") return;
    if (!imageRef.current) return;
    if (!ballRef.current) return;

    const image = imageRef.current.getBoundingClientRect();
    const { width, height } = ballRef.current.getBoundingClientRect();

    const dx = imageRef.current.width / 2 + width / 2 + 16;

    const dy = image.top + imageRef.current.height / 2 - height / 2 - 3 * 16;

    try {
      await Promise.all([
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

      setStatus("trying");
    } catch (e) {
      onFailure();
    }
  };

  return (
    <>
      <Head>
        <title>Capture | Poke Adventure</title>
      </Head>

      <div
        style={{
          minHeight: "100%",
          width: "100%",
          position: "relative",
          overflowX: "hidden",
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
          initial={pokeBallInitial}
          style={{
            position: "absolute",
          }}
          ref={ballRef}
          onClick={handleClick}
        >
          <PokeBall status={status} />
        </motion.button>
      </div>
    </>
  );
};

export default Capture;
