import { type ComponentPropsWithRef, forwardRef } from "react";

import { motion, type AnimationControls } from "framer-motion";

import pokeball from "design-system/Pokeball.module.css";

import type { Status } from "../types";

type PokeBallProps = {
  status: Status;
  animate: AnimationControls;
  initial: Record<string, string | number>;
} & ComponentPropsWithRef<"button">;

export const PokeBall = forwardRef<HTMLButtonElement, PokeBallProps>(
  function PokeBall({ status, animate, initial, onClick }, ref) {
    return (
      <motion.button
        className={pokeball.wrapper}
        ref={ref}
        animate={animate}
        initial={initial}
        onClick={onClick}
      >
        <i className={`nes-pokeball ${status}`} />
      </motion.button>
    );
  }
);
