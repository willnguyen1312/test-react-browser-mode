import { sleep } from "./utils";

export const renderVanillaApp = () => {
  let number = 0;
  let isLoading = false;
  let heading = document.createElement("h3");
  heading.textContent = `Number: ${number}`;
  let button = document.createElement("button");
  button.textContent = "Randomize number";
  const appWrapper = document.createElement("div");
  appWrapper.appendChild(heading);
  appWrapper.appendChild(button);

  const updateUI = () => {
    heading.textContent = `Number: ${number}`;
    button.textContent = isLoading ? "Loading..." : "Randomize number";
    button.disabled = isLoading;
  };

  button.addEventListener("click", async () => {
    isLoading = true;
    updateUI();
    const randomID = Math.floor(Math.random() * 200) + 1;
    // Sleep for 10ms to simulate network delay
    await sleep(10);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${randomID}`
    );
    const data = await response.json();
    number = data.id;
    isLoading = false;
    updateUI();
  });

  document.body.appendChild(appWrapper);
};
