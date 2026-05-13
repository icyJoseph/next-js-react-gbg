import type { Route } from "@playwright/test";

// Capture-rate convention (see e2e/fixtures/poke-api-server.ts):
//   id 1 → 256 (always succeeds)
//   id 2 → 0   (always fails)
export const mockBulbasaur = {
  id: 1,
  name: "bulbasaur",
  order: 1,
  sprites: {
    frontDefault:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  weight: 69,
  height: 7,
  captureRate: 45,
  description: "A strange seed was planted on its back at birth.",
};

export const mockFailMon = {
  id: 2,
  name: "fake-fail-mon",
  order: 2,
  sprites: {
    frontDefault:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
  weight: 20,
  height: 7,
  captureRate: 0,
  description: "A deterministic fail-mon.",
};

export const mockCharmander = {
  id: 4,
  name: "charmander",
  order: 5,
  sprites: {
    frontDefault:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  weight: 85,
  height: 6,
  captureRate: 45,
  description: "Obviously prefers hot places.",
};

export const fulfillJson = (route: Route, body: unknown, status = 200) =>
  route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
