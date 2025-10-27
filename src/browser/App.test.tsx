import { beforeEach, afterEach, expect, test, describe, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";

import App from "../App.tsx";
// import App from "../AppMaterialUI.tsx";
// import App from "../AppRadixUI.tsx";

describe("App Component", () => {
  const originalFetch = window.fetch;
  let fetchMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // @ts-ignore
    fetchMock = vi.spyOn(window, "fetch").mockImplementation(async (...arg) => {
      // Wait for 100ms to simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve({
        json: () => Promise.resolve({ id: 1000 }),
      });
    });
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  test("renders name", async () => {
    // Arrange
    await render(<App />);

    // Assert
    await expect
      .element(page.getByRole("heading", { name: "number: 0" }))
      .toBeVisible();

    // Act
    await userEvent.click(
      page.getByRole("button", { name: "Randomize number" })
    );
    // Assert
    await expect
      .element(page.getByRole("button", { name: "Loading..." }))
      .toBeDisabled();
    await expect
      .element(page.getByRole("heading", { name: "number: 1000" }))
      .toBeVisible();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
