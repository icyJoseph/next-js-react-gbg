import type { NextApiRequest, NextApiResponse } from "next";

import { SUPPORTED_POKEMON } from "lib/constants";
import { fetchPokemon } from "lib/pokemon";
import type { Pokemon, Message } from "types";

export async function wildPokemon(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon | Message>
) {
  if (req.method !== "GET")
    return res.status(404).json({ message: "Not Found" });
  try {
    const id = 1 + Math.floor(Math.random() * SUPPORTED_POKEMON);

    const data = await fetchPokemon(id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default wildPokemon;
