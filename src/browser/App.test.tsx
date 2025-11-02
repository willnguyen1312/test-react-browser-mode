import { beforeEach, afterEach, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";

import App from "../App.tsx";
// import App from "../AppMaterialUI.tsx";
// import App from "../AppRadixUI.tsx";

const originalFetch = window.fetch;
let fetchMock: ReturnType<typeof vi.spyOn>;
// expect(fetchMock).toHaveBeenCalledTimes(1);

beforeEach(() => {
  // @ts-ignore
  fetchMock = vi.spyOn(window, "fetch").mockImplementation(async (...arg) => {
    // Wait for 10ms to simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return Promise.resolve({
      json: () => Promise.resolve({ id: 1000 }),
    });
  });
});

afterEach(() => {
  window.fetch = originalFetch;
});

const renderApp = () => render(<App />);
test("App generates a random number on button click", async () => {
  // Arrange
  await renderApp();

  // Assert
  await expect
    .element(page.getByRole("heading", { name: "number: 0" }))
    .toBeVisible();

  // Act
  await userEvent.click(page.getByRole("button", { name: "Randomize number" }));
  // Assert
  await expect
    .element(page.getByRole("button", { name: "Loading..." }))
    .toBeDisabled();
  await expect
    .element(page.getByRole("heading", { name: "number: 1000" }))
    .toBeVisible();
});
