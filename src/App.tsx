import { useState } from "react";
import { sleep } from "./utils";

function App() {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h3>Number: {number}</h3>
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const randomID = Math.floor(Math.random() * 200) + 1;
          // Sleep for 500ms to simulate network delay
          await sleep(500);
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${randomID}`
          );
          // await fetch(`https://jsonplaceholder.typicode.com/todos/${randomID}`);
          const data = await response.json();
          setNumber(data.id);
          setLoading(false);
        }}
      >
        {loading ? "Loading..." : "Randomize number"}
      </button>
    </>
  );
}

export default App;
