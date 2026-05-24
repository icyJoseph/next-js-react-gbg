import { NextResponse } from "next/server";

import { SUPPORTED_POKEMON } from "../../../lib/constants";
import { fetchPokemon } from "../../../lib/pokemon";

export async function GET() {
  try {
    const id = 1 + Math.floor(Math.random() * SUPPORTED_POKEMON);

    const data = await fetchPokemon(id);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
