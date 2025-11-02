// @ts-ignore
import VueApp from "../App.vue";
import { beforeEach, afterEach, expect, test, vi } from "vitest";
import "vitest-dom/extend-expect";
import { render as renderReact, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ReactApp from "../App.tsx";
import { sleep } from "../utils.ts";
// import ReactApp from "../AppMaterialUI.tsx";
// import ReactApp from "../AppRadixUI.tsx";

const originalFetch = window.fetch;
const user = userEvent.setup();
let fetchMock: ReturnType<typeof vi.spyOn>;

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

const renderReactApp = () => renderReact(<ReactApp />);

test("App generates a random number on button click", async () => {
  renderReactApp();

  await user.click(
    screen.getByRole("button", {
      name: "Track event",
    })
  );

  // Wait some time to ensure no extra fetch calls are made
  await sleep(1000);
  expect(fetchMock).toHaveBeenCalledTimes(1);
});
