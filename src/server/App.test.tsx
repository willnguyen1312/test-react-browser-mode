import { beforeEach, afterEach, expect, test, describe, vi } from "vitest";
import "vitest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// import App from "../App.tsx";
import App from "../AppMaterialUI.tsx";
// import App from "../AppRadixUI.tsx";

describe("App Component", () => {
  const originalFetch = window.fetch;

  beforeEach(() => {
    // @ts-ignore
    vi.spyOn(window, "fetch").mockImplementation(async (...arg) => {
      // Wait for 100ms to simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 100));
      return Promise.resolve({
        json: () => Promise.resolve({ id: 1000 }),
      });
    });
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  test("works", async () => {
    // Arrange
    render(<App />);
    const user = userEvent.setup();

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
