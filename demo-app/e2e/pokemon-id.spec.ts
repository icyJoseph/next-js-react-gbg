import { expect, test } from "@playwright/test";

test.describe("/pokemon/[id]", () => {
  test("renders Charmander page (prerendered id=4)", async ({ page }) => {
    await page.goto("/pokemon/4");

    await expect(page).toHaveTitle(/charmander \| Poké Adventure/i);
    await expect(
      page.getByRole("heading", { name: "charmander" })
    ).toBeVisible();
    await expect(page.getByText("#4")).toBeVisible();
  });

  test("renders Bulbasaur page (prerendered id=1)", async ({ page }) => {
    await page.goto("/pokemon/1");
    await expect(page).toHaveTitle(/bulbasaur \| Poké Adventure/i);
    await expect(
      page.getByRole("heading", { name: "bulbasaur" })
    ).toBeVisible();
    await expect(page.getByText("#1")).toBeVisible();
  });
});
