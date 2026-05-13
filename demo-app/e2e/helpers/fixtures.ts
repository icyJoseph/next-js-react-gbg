import type { Route } from "@playwright/test";

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
