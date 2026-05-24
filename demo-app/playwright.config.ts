import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT) || 3000;
const baseURL = `http://localhost:${PORT}`;

const FIXTURE_PORT = Number(process.env.POKE_API_FIXTURE_PORT) || 5555;
const fixtureURL = `http://localhost:${FIXTURE_PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 30_000,
  use: {
    baseURL,
    trace: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: `node --experimental-strip-types --no-warnings e2e/fixtures/poke-api-server.ts`,
      url: `${fixtureURL}/healthz`,
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
      env: { POKE_API_FIXTURE_PORT: String(FIXTURE_PORT) },
    },
    {
      command: `yarn dev --port ${PORT}`,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: {
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? "foo-bar-dev",
        NEXT_PUBLIC_POKE_API_BASE: fixtureURL,
      },
    },
  ],
});
