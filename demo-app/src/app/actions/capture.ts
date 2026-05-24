"use server";

import { cookies } from "next/headers";

import { catchPokemon } from "lib/pokemon";
import { createUserToken, USER_TOKEN, verifyUserToken } from "lib/token";

export type CaptureState = { success: boolean };

export async function capturePokemonAction(
  _prev: boolean,
  rawId: string | number
): Promise<CaptureState> {
  try {
    const id = Number(rawId);

    if (!Number.isFinite(id)) return { success: false };

    const cookieStore = await cookies();
    const token = cookieStore.get(USER_TOKEN)?.value;

    const result = await verifyUserToken(token);
    if ("status" in result) return { success: false };

    const success = await catchPokemon(id);

    const { pokemonDb } = result;
    const current = pokemonDb.charAt(id);
    const value = current === "x" ? 0 : Number(current);
    const update = success ? Math.min(9, value + 1) : value;

    const start = pokemonDb.substring(0, id);
    const end = pokemonDb.substring(id + 1);
    const updatedDb = `${start}${update}${end}`;

    const newCookie = await createUserToken(updatedDb, result.jti);

    cookieStore.set({
      name: USER_TOKEN,
      value: newCookie,
      maxAge: 2592000 * 12,
      path: "/",
      httpOnly: true,
    });

    return { success };
  } catch {
    return { success: false };
  }
}
