"use client";

import type { ComponentPropsWithRef } from "react";

import { motion, type LegacyAnimationControls } from "framer-motion";
import styled, { keyframes } from "styled-components";

import type { Status } from "types";

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

const StyledIcon = styled.i`
  &.trying {
    animation: ${shake} 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  }

  &.trying::before {
    color: hotpink;
  }
`;

const StyledMotionButton = styled(motion.button)`
  position: absolute;
  background: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;

type PokeBallProps = {
  status: Status;
  animate: LegacyAnimationControls;
  initial: Record<string, string | number>;
} & ComponentPropsWithRef<"button">;

export const PokeBall = function PokeBall({
  status,
  animate,
  initial,
  onClick,
  ref,
}: PokeBallProps) {
  return (
    <StyledMotionButton
      ref={ref}
      animate={animate}
      initial={initial}
      onClick={onClick}
    >
      <StyledIcon className={`nes-pokeball ${status}`} />
    </StyledMotionButton>
  );
};
