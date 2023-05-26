"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";

import { motion, type AnimationControls } from "framer-motion";

import pokeBall from "design-system/pokeball.module.css";
import type { Status } from "types";

type PokeBallProps = {
  status: Status;
  animate: AnimationControls;
  initial: Record<string, string | number>;
} & ComponentPropsWithRef<"button">;

export const PokeBall = forwardRef<HTMLButtonElement, PokeBallProps>(
  function PokeBall({ status, animate, initial, onClick }, ref) {
    return (
      <motion.button
        className={pokeBall.wrapper}
        ref={ref}
        animate={animate}
        initial={initial}
        onClick={onClick}
      >
        <i className={`nes-pokeball ${pokeBall.inner} ${status}`} />
      </motion.button>
    );
  }
);
