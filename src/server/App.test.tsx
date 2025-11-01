// @ts-ignore
import VueApp from "../App.vue";
import { beforeEach, afterEach, expect, test, vi } from "vitest";
import "vitest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { render as renderVue } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import App from "../App.tsx";
// import App from "../AppMaterialUI.tsx";
// import App from "../AppRadixUI.tsx";

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

const renderAppWithReact = () => render(<App />);
const renderAppWithVue = () => renderVue(VueApp);

test("App generates a random number on button click", async () => {
  // Arrange
  // renderAppWithVue();
  renderAppWithReact();

  // Assert
  expect(screen.getByRole("heading", { name: "Number: 0" })).toBeVisible();

  // Act
  await user.click(
    screen.getByRole("button", {
      name: "Randomize number",
    })
  );

  // Assert
  expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();

  expect(
    await screen.findByRole("heading", { name: "Number: 1000" })
  ).toBeVisible();
});
