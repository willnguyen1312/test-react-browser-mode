import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useRef, useReducer } from "react";
import { ref, watch } from "@vue/reactivity";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { sleep } from "./utils";

function App() {
  const [_, rerender] = useReducer((x) => x + 1, 0);
  const stateRef = useRef<{
    number: ReturnType<typeof ref<number>>;
    loading: ReturnType<typeof ref<boolean>>;
  } | null>(null);

  if (!stateRef.current) {
    stateRef.current = {
      number: ref(0),
      loading: ref(false),
    };

    watch(stateRef.current.number, () => rerender());
    watch(stateRef.current.loading, () => rerender());
  }

  return (
    <>
      <Typography variant="h3">
        Number: {stateRef.current?.number.value}
      </Typography>
      <Button
        disabled={stateRef.current?.loading.value}
        onClick={async () => {
          if (!stateRef.current) {
            return;
          }

          stateRef.current.loading.value = true;
          const randomID = Math.floor(Math.random() * 200) + 1;
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${randomID}`
          );
          // Sleep for 500ms to simulate network delay
          await sleep(500);
          const data = await response.json();

          if (stateRef.current) {
            stateRef.current.number.value = data.id;
            stateRef.current.loading.value = false;
          }
        }}
      >
        {stateRef.current?.loading.value ? "Loading..." : "Randomize number"}
      </Button>
    </>
  );
}

export default App;
