// Minimal PokéAPI stand-in for e2e tests. Serves a deterministic subset of
// /api/v2/pokemon/:id and /api/v2/pokemon-species/:id so capture outcomes are
// reproducible.
//
// Capture-rate convention:
//   id 1  → 256 (always succeeds — `coin < 256` is always true)
//   id 2  → 0   (always fails)
//   other → 45  (real bulbasaur-ish rate; fine for non-capture flows)

import { createServer, type IncomingMessage, type ServerResponse } from "http";

type Pokemon = {
  id: number;
  name: string;
  order: number;
  weight: number;
  height: number;
  sprite: string;
};

const SPRITE = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const NAMED: Record<number, string> = {
  1: "bulbasaur",
  2: "fake-fail-mon",
  4: "charmander",
  7: "squirtle",
};

const pokemon = (id: number): Pokemon => ({
  id,
  name: NAMED[id] ?? `mock-${id}`,
  order: id,
  weight: 10 * id,
  height: 5 + id,
  sprite: SPRITE(id),
});

const captureRateFor = (id: number) => {
  if (id === 1) return 256;
  if (id === 2) return 0;
  return 45;
};

const json = (res: ServerResponse, status: number, body: unknown) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const handler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url ?? "/";

  const speciesMatch = url.match(/^\/api\/v2\/pokemon-species\/(\d+)\/?$/);
  if (speciesMatch) {
    const id = Number(speciesMatch[1]);
    return json(res, 200, {
      id,
      name: NAMED[id] ?? `mock-${id}`,
      capture_rate: captureRateFor(id),
      flavor_text_entries: [
        { flavor_text: `A deterministic ${NAMED[id] ?? `mock-${id}`}.` },
      ],
    });
  }

  const pokemonMatch = url.match(/^\/api\/v2\/pokemon\/(\d+)\/?$/);
  if (pokemonMatch) {
    const id = Number(pokemonMatch[1]);
    const p = pokemon(id);
    return json(res, 200, {
      id: p.id,
      name: p.name,
      order: p.order,
      weight: p.weight,
      height: p.height,
      sprites: { front_default: p.sprite },
    });
  }

  if (url === "/healthz") return json(res, 200, { ok: true });

  return json(res, 404, { message: "Not found" });
};

const port = Number(process.env.POKE_API_FIXTURE_PORT ?? 5555);

createServer(handler).listen(port, () => {
  console.log(`[poke-api-fixture] listening on http://localhost:${port}`);
});
