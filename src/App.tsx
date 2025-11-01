import { useReducer } from "react";
import { sleep } from "./utils";

const state = {
  number: 0,
  loading: false,
};

function App() {
  const [_, rerender] = useReducer((x) => x + 1, 0);

  return (
    <>
      <h3>Number: {state.number}</h3>
      <button
        disabled={state.loading}
        onClick={async () => {
          state.loading = true;
          rerender();
          const randomID = Math.floor(Math.random() * 200) + 1;
          // Sleep for 100ms to simulate network delay
          await sleep(100);
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${randomID}`
          );
          // fetch(`https://jsonplaceholder.typicode.com/todos/${randomID}`);
          const data = await response.json();
          state.number = data.id;
          state.loading = false;
          rerender();
        }}
      >
        {state.loading ? "Loading..." : "Randomize number"}
      </button>
    </>
  );
}

export default App;
