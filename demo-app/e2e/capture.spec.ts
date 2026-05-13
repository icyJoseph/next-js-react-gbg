import { expect, test } from "@playwright/test";

import { fulfillJson, mockBulbasaur } from "./helpers/fixtures";

test.describe("capture flow", () => {
  test("successful capture shows the dialog", async ({ page }) => {
    await page.route("**/api/wild", (route) =>
      fulfillJson(route, mockBulbasaur)
    );
    await page.route("**/api/capture", (route) =>
      fulfillJson(route, { id: mockBulbasaur.id, success: true })
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
    await page.route("**/api/wild", (route) =>
      fulfillJson(route, mockBulbasaur)
    );
    await page.route("**/api/capture", (route) =>
      fulfillJson(route, { id: mockBulbasaur.id, success: false })
    );

    await page.goto("/pokemon/capture");
    await expect(page.getByAltText(mockBulbasaur.name)).toBeVisible();

    await page.getByRole("button").first().click();

    // give the animation + the simulated 5s wait time to finish
    await expect(
      page.getByRole("heading", { level: 1, name: "Nice!" })
    ).toBeHidden({ timeout: 15_000 });

    // pokemon should still be on screen since capture failed
    await expect(page.getByAltText(mockBulbasaur.name)).toBeVisible();
  });

  test("dismiss button on success dialog returns to the scene", async ({
    page,
  }) => {
    await page.route("**/api/wild", (route) =>
      fulfillJson(route, mockBulbasaur)
    );
    await page.route("**/api/capture", (route) =>
      fulfillJson(route, { id: mockBulbasaur.id, success: true })
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
