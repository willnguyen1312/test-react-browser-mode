import { useEffect, useState } from "react";
import { sleep } from "./utils";

function App() {
  const [config, setConfig] = useState<object>();

  useEffect(() => {
    const fetchData = async () => {
      const randomID = Math.floor(Math.random() * 200) + 1;
      // Sleep for 10ms to simulate network delay
      await sleep(10);
      fetch(`https://jsonplaceholder.typicode.com/todos/${randomID}`);
      setConfig({});
    };

    if (config) {
      fetchData();
    }
  }, [config]);

  return (
    <button
      onClick={async () => {
        setConfig({});
      }}
    >
      Track event
    </button>
  );
}

export default App;
