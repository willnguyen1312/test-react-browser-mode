import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <h1>Number: {number}</h1>
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const randomID = Math.floor(Math.random() * 200) + 1;
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${randomID}`,
          );
          const data = await response.json();
          setNumber(data.id);
          setLoading(false);
        }}
      >
        {loading ? "Loading..." : "Randomize number"}
      </button>
    </main>
  );
}

export default App;
