import { useState } from "react";
import "@radix-ui/themes/styles.css";
import { Theme, Button, Heading } from "@radix-ui/themes";

function App() {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <Theme>
      <Heading size="4">Number: {number}</Heading>
      <Button
        variant="outline"
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
      </Button>
    </Theme>
  );
}

export default App;
