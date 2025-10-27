import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function App() {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Typography variant="h3">Number: {number}</Typography>
      <Button
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
    </>
  );
}

export default App;
