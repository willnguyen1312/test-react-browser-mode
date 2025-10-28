import { useReducer } from "react";
import "@radix-ui/themes/styles.css";
import { Theme, Button, Heading } from "@radix-ui/themes";
import { sleep } from "./utils";
import { createSignal } from "solid-js";

const [number, setNumber] = createSignal(0);
const [loading, setLoading] = createSignal(false);

function App() {
  const [_, rerender] = useReducer((x) => x + 1, 0);

  return (
    <Theme>
      <Heading size="4">Number: {number()}</Heading>
      <Button
        variant="outline"
        disabled={loading()}
        onClick={async () => {
          setLoading(true);
          rerender();

          const randomID = Math.floor(Math.random() * 200) + 1;
          // Sleep for 500ms to simulate network delay
          await sleep(500);
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${randomID}`,
          );
          const data = await response.json();
          setNumber(data.id);
          setLoading(false);
          rerender();
        }}
      >
        {loading() ? "Loading..." : "Randomize number"}
      </Button>
    </Theme>
  );
}

export default App;
