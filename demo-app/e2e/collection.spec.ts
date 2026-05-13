import { expect, test } from "@playwright/test";

import { fulfillJson, mockBulbasaur, mockCharmander } from "./helpers/fixtures";
import { mintUserToken } from "./helpers/token";

test.describe("collection page", () => {
  test("renders empty state when no pokemon have been caught", async ({
    page,
    context,
  }) => {
    const token = await mintUserToken([]);
    await context.addCookies([
      {
        name: "app-token",
        value: token,
        domain: "localhost",
        path: "/",
        httpOnly: true,
      },
    ]);

    await page.goto("/collection");

    await expect(
      page.getByRole("heading", { name: "My Collection" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Empty Collection" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "capture", exact: true })
    ).toHaveAttribute("href", "/pokemon/capture");
  });

  test("renders caught pokemon cards", async ({ page, context }) => {
    const token = await mintUserToken([
      { id: 1, qty: 2 },
      { id: 4, qty: 1 },
    ]);
    await context.addCookies([
      {
        name: "app-token",
        value: token,
        domain: "localhost",
        path: "/",
        httpOnly: true,
      },
    ]);

    // PokeArticle calls usePokemon → SWR fetches PokéAPI directly from the
    // client. Stub the upstream so the test is deterministic.
    await page.route("**/api/v2/pokemon/1", (route) =>
      fulfillJson(route, {
        id: 1,
        name: mockBulbasaur.name,
        order: mockBulbasaur.order,
        weight: mockBulbasaur.weight,
        height: mockBulbasaur.height,
        sprites: { front_default: mockBulbasaur.sprites.frontDefault },
      })
    );
    await page.route("**/api/v2/pokemon/4", (route) =>
      fulfillJson(route, {
        id: 4,
        name: mockCharmander.name,
        order: mockCharmander.order,
        weight: mockCharmander.weight,
        height: mockCharmander.height,
        sprites: { front_default: mockCharmander.sprites.frontDefault },
      })
    );

    await page.goto("/collection");

    await expect(page.getByText(mockBulbasaur.name)).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText(mockCharmander.name)).toBeVisible();
    await expect(page.getByText("Caught 2 time(s)")).toBeVisible();
    await expect(page.getByText("Caught 1 time(s)")).toBeVisible();
  });

  test("pagination button appears when collection has multiple pages", async ({
    page,
    context,
  }) => {
    // 6 items per page — create 7 entries so we get 2 pages.
    const caught = [1, 4, 7, 10, 13, 16, 19].map((id) => ({ id, qty: 1 }));
    const token = await mintUserToken(caught);
    await context.addCookies([
      {
        name: "app-token",
        value: token,
        domain: "localhost",
        path: "/",
        httpOnly: true,
      },
    ]);
    // Stub upstream so PokeArticle's SWR resolves quickly.
    await page.route("**/api/v2/pokemon/*", (route) => {
      const url = route.request().url();
      const id = Number(url.split("/").pop());
      return fulfillJson(route, {
        id,
        name: `mock-${id}`,
        order: id,
        weight: 10,
        height: 5,
        sprites: { front_default: mockBulbasaur.sprites.frontDefault },
      });
    });

    await page.goto("/collection");

    const pageBtn2 = page.getByRole("button", { name: /Go to Page 2/i });
    await expect(pageBtn2).toBeVisible();
    await pageBtn2.click();
    await expect(
      page.getByRole("button", { name: /Current Page, Page 2/i })
    ).toBeVisible();
  });
});
