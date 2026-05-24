"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

import {
  type LegacyAnimationControls,
  motion,
  useAnimation,
} from "framer-motion";
import styled, { keyframes } from "styled-components";

const shake = keyframes`
0% {
    transform: translate(0, 0) rotate(0);
  }
  20% {
    transform: translate(-10px, 0) rotate(-20deg);
  }
  30% {
    transform: translate(10px, 0) rotate(20deg);
  }
  50% {
    transform: translate(-10px, 0) rotate(-10deg);
  }
  60% {
    transform: translate(10px, 0) rotate(10deg);
  }
  100% {
    transform: translate(0, 0) rotate(0);
  }
`;

const Animated = styled.i`
  &.trying {
    animation: ${shake} 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  }

  &.trying::before {
    color: hotpink;
  }
`;

const ThrowTrigger = styled(motion.button)`
  position: absolute;
  background: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;

const pokeBallInitial = { x: 0, y: "calc(110vh - 3rem)", scale: 1 } as const;
const pokeBallReady = { x: 0, y: "calc(80vh - 3rem)", scale: 1 } as const;

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

export const PokeBall = function PokeBall({
  target,
  pending,
}: {
  target: RefObject<HTMLDivElement | null>;
  pending: boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const control = useAnimation();
  // x-ref: https://github.com/facebook/react/issues/30368
  // const { pending } = useFormStatus();

  const [state, setState] = useState<"idle" | "thrown" | "waiting">("idle");

  useEffect(() => {
    if (state !== "idle") return;

    const raf = requestAnimationFrame(() => {
      control.start(pokeBallReady);
    });

    return () => {
      cancelAnimationFrame(raf);
      control.stop();
    };
  }, [control, state]);

  useEffect(() => {
    // ball was thrown and the form is not pending
    if (state === "thrown" && pending) {
      setState("waiting");
    }

    if (state === "waiting" && !pending) {
      setState("idle");
    }
  }, [state, pending]);

  const handleClick = async () => {
    if (!buttonRef.current || pending) return;

    if (!target.current) return;

    const pokemon = target.current.getBoundingClientRect();
    const ball = buttonRef.current.getBoundingClientRect();

    const dx = pokemon.width / 2 + ball.width / 2 + 16;
    const dy = pokemon.top + pokemon.height / 2 - ball.height / 2 - 3 * 16;

    await animatePokeBall(control, { dx, dy });
    setState("thrown");
    buttonRef.current.form?.requestSubmit();
  };

  return (
    <ThrowTrigger
      ref={buttonRef}
      type="button"
      initial={pokeBallInitial}
      animate={control}
      onClick={handleClick}
    >
      <Animated className={`nes-pokeball ${pending ? "trying" : ""}`} />
    </ThrowTrigger>
  );
};
