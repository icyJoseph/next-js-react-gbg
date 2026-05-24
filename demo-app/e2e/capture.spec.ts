import { expect, test } from "@playwright/test";

import { fulfillJson, mockBulbasaur, mockFailMon } from "./helpers/fixtures";

test.describe("capture flow", () => {
  test("successful capture shows the dialog", async ({ page }) => {
    // /api/wild controls the encounter; id=1 maps to capture_rate=256 in
    // the fixture PokéAPI, so the server-side roll is always success.
    await page.route("**/api/wild", (route) =>
      fulfillJson(route, mockBulbasaur)
    );

    await page.goto("/pokemon/capture");

    const sprite = page.getByAltText(mockBulbasaur.name);
    await expect(sprite).toBeVisible();

    await page.getByRole("button").first().click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Nice!" })
    ).toBeVisible({ timeout: 15_000 });

    await expect(
      page.getByRole("link", { name: mockBulbasaur.name })
    ).toHaveAttribute("href", `/pokemon/${mockBulbasaur.id}`);
  });

  test("failed capture returns user to the catching scene", async ({
    page,
  }) => {
    // id=2 maps to capture_rate=0 → always fails.
    await page.route("**/api/wild", (route) =>
      fulfillJson(route, mockFailMon)
    );

    await page.goto("/pokemon/capture");
    await expect(page.getByAltText(mockFailMon.name)).toBeVisible();

    await page.getByRole("button").first().click();

    // Wait long enough for the throw animation + 5s pending delay.
    await expect(
      page.getByRole("heading", { level: 1, name: "Nice!" })
    ).toBeHidden({ timeout: 15_000 });

    await expect(page.getByAltText(mockFailMon.name)).toBeVisible();
  });

  test("dismiss button on success dialog returns to the scene", async ({
    page,
  }) => {
    await page.route("**/api/wild", (route) =>
      fulfillJson(route, mockBulbasaur)
    );

    await page.goto("/pokemon/capture");
    await page.getByRole("button").first().click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Nice!" })
    ).toBeVisible({ timeout: 15_000 });

    await page.getByRole("button", { name: "Catch more" }).click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Nice!" })
    ).toBeHidden();
  });
});
