import { beforeEach, afterEach, expect, test, describe, vi } from "vitest";
import "vitest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App.tsx";
// import App from "../AppMaterialUI.tsx";
// import App from "../AppRadixUI.tsx";

describe("App Component", () => {
  const originalFetch = window.fetch;
  const user = userEvent.setup();
  let fetchMock: ReturnType<typeof vi.spyOn>;
  // expect(fetchMock).toHaveBeenCalledTimes(1);

  beforeEach(() => {
    // @ts-ignore
    fetchMock = vi.spyOn(window, "fetch").mockImplementation(async (...arg) => {
      return Promise.resolve({
        json: () => Promise.resolve({ id: 1000 }),
      });
    });
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  const renderApp = () => render(<App />);

  test("generates a random number on button click", async () => {
    // Arrange
    renderApp();

    // Assert
    expect(screen.getByRole("heading", { name: /number: 0/i })).toBeVisible();

    // Act
    await user.click(
      screen.getByRole("button", {
        name: /randomize number/i,
      })
    );

    // Assert
    expect(
      await screen.findByRole("button", { name: /Loading.../i })
    ).toBeDisabled();

    expect(
      await screen.findByRole("heading", { name: /number: 1000/i })
    ).toBeVisible();
  });
});
