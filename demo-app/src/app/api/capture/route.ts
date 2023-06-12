import { NextRequest, NextResponse } from "next/server";

import { catchPokemon } from "lib/pokemon";
import { createUserToken, USER_TOKEN, resolveUserToken } from "lib/token";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  if (typeof id !== "number")
    return NextResponse.json(
      { message: "Bad Request" },
      { status: 400, statusText: "Bad Request" }
    );

  const token = req.cookies.get(USER_TOKEN)?.value;

  const result = await resolveUserToken(token);

  if ("status" in result)
    return NextResponse.json(
      { message: result.message },
      { status: result.status, statusText: result.message }
    );

  try {
    const success = await catchPokemon(id);

    const { pokemonDb } = result;
    const current = pokemonDb.charAt(id);
    const value = current === "x" ? 0 : Number(current);

    const update = success ? Math.min(9, value + 1) : value;

    const start = pokemonDb.substring(0, id);
    const end = pokemonDb.substring(id + 1);
    const updatedDb = `${start}${update}${end}`;

    const newCookie = await createUserToken(updatedDb, result.jti);

    const response = NextResponse.json({ id, success });
    response.cookies.set({
      name: USER_TOKEN,
      value: newCookie,
      maxAge: 2592000 * 12,
      path: "/",
      httpOnly: true,
    });

    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
