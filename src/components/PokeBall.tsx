import type { Status } from "types";

type PokeBallProps = { status: Status };

export const PokeBall = ({ status }: PokeBallProps) => (
  <i className={`nes-pokeball ${status}`}></i>
);
