import { beforeEach, afterEach, expect, test, describe, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import App from "./App.tsx";

describe("App Component", () => {
  const originalFetch = window.fetch;

  beforeEach(() => {
    // @ts-ignore
    window.fetch = vi.fn(async (...arg) => {
      // Wait for 250ms to simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 250));
      return Promise.resolve({
        json: () => Promise.resolve({ id: 999 }),
      });
    });
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  test("renders name", async () => {
    vi.useFakeTimers();
    // Arrange
    await render(<App />);

    // Assert
    await expect
      .element(page.getByRole("heading", { name: "number: 0" }))
      .toBeVisible();

    // Act
    await userEvent.click(
      page.getByRole("button", { name: "Randomize number" }),
    );
    // Assert
    await expect
      .element(page.getByRole("button", { name: "Loading..." }))
      .toBeDisabled();
    await vi.runAllTimersAsync();
    await expect
      .element(page.getByRole("heading", { name: "number: 999" }))
      .toBeVisible();
  });
});
