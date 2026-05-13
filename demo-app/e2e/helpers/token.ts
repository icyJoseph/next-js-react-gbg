import { SignJWT } from "jose";
import { nanoid } from "nanoid";

import { SUPPORTED_POKEMON } from "../../src/lib/constants";

const SECRET = () =>
  new TextEncoder().encode(process.env.JWT_SECRET_KEY ?? "foo-bar-dev");

const emptyDb = () =>
  `$${Array.from({ length: SUPPORTED_POKEMON }, () => "x").join("")}`;

export type CaughtEntry = { id: number; qty: number };

export const buildPokemonDb = (caught: CaughtEntry[] = []) => {
  const arr = emptyDb().split("");

  for (const { id, qty } of caught) {
    if (id < 1 || id > SUPPORTED_POKEMON) continue;
    arr[id] = String(Math.min(9, Math.max(0, qty)));
  }

  return arr.join("");
};

export const mintUserToken = async (caught: CaughtEntry[] = []) => {
  return new SignJWT({ pokemonDb: buildPokemonDb(caught) })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .sign(SECRET());
};
