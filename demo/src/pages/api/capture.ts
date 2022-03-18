import type { NextApiRequest, NextApiResponse } from "next";

import { catchPokemon } from "lib/pokemon";
import { createUserToken, USER_TOKEN, verifyUserToken } from "lib/token";

export async function capture(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not Found" });

  const { id } = req.body;

  if (typeof id !== "number")
    return res.status(400).json({ message: "Bad Request" });

  const token = req.cookies[USER_TOKEN];

  const result = await verifyUserToken(token);

  if ("status" in result)
    return res.status(result.status).json({ message: result.message });

  try {
    const success = await catchPokemon(id);

    const { pokemonDb } = result;
    const current = pokemonDb.at(id);
    const value = current === "x" ? 0 : Number(current);

    const update = success ? Math.min(9, value + 1) : value;

    const start = pokemonDb.substring(0, id);
    const end = pokemonDb.substring(id + 1);
    const updatedDb = `${start}${update}${end}`;

    const newCookie = await createUserToken(updatedDb, result.jti);

    res.setHeader("set-cookie", `${USER_TOKEN}=${newCookie}; Path=/; HttpOnly`);

    return res.status(200).json({ id, success });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default capture;
