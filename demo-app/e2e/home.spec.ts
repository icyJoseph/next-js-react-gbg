import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders title and main navigation links", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Home \| Poké Adventure/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Poké Adventure" })
    ).toBeVisible();

    // Both the top nav and the intro paragraph link to /pokemon/capture and
    // /collection. Assert at least one of each is visible without strict-mode
    // ambiguity.
    await expect(
      page.getByRole("link", { name: "Capture", exact: true }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Collection", exact: true }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "/pokemon/[id]" })
    ).toBeVisible();
  });

  test("About + Architecture anchors are present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#architecture")).toBeVisible();
  });

  test("links to repo on github", async ({ page }) => {
    await page.goto("/");
    const repoLink = page.getByRole("link", { name: /this repository/ });
    await expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/icyJoseph/next-js-react-gbg"
    );
  });
});
