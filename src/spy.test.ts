import { vi, expect, test } from "vitest";

test("spy example", async () => {
  const spy = vi.spyOn(window, "fetch");
  //   .mockResolvedValue(
  //     new Response(JSON.stringify({ id: 1 }), {
  //       status: 200,
  //       headers: { "Content-type": "application/json" },
  //     })
  //   );

  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();

  console.log(data);

  expect(spy).toHaveBeenCalledTimes(1);
});
