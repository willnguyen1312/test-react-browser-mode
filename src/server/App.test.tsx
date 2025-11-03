// @ts-ignore
import VueApp from "../App.vue";
import { renderVanillaApp } from "../App.ts";
import { beforeEach, afterEach, expect, test, vi } from "vitest";
import "vitest-dom/extend-expect";
import { render as renderReact, screen } from "@testing-library/react";
import { render as renderVue } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import ReactApp from "../App.tsx";
// import ReactApp from "../AppMaterialUI.tsx";
// import ReactApp from "../AppRadixUI.tsx";

const originalFetch = window.fetch;
const user = userEvent.setup();
let fetchMock: ReturnType<typeof vi.spyOn>;
// expect(fetchMock).toHaveBeenCalledTimes(1);

const renderVueApp = () => renderVue(VueApp);
const renderReactApp = () => renderReact(<ReactApp />);

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

test("App generates a random number on button click", async () => {
  renderVueApp();
  expect(screen.getByRole("heading", { name: "Number: 0" })).toBeVisible();

  await user.click(
    screen.getByRole("button", {
      name: "Randomize number",
    })
  );

  expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();

  expect(
    await screen.findByRole("heading", { name: "Number: 1000" })
  ).toBeVisible();

  expect(
    screen.queryByRole("button", { name: "Loading..." })
  ).not.toBeInTheDocument();
});
