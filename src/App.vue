<template>
  <h3>Number: {{ number }}</h3>
  <button @click="randomize" :disabled="isLoading">
    {{ isLoading ? "Loading..." : "Randomize number" }}
  </button>
</template>

<script setup lang="ts" vapor>
import { ref } from "vue";
import { sleep } from "./utils";

const unneededCode = () => {
  // This function is not used anywhere
  console.log("This is unneeded code");
};

const number = ref(0);
const isLoading = ref(false);
const randomize = async () => {
  isLoading.value = true;
  const randomID = Math.floor(Math.random() * 200) + 1;
  // Sleep for 100ms to simulate network delay
  await sleep(100);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${randomID}`
  );
  const data = await response.json();
  number.value = data.id;
  isLoading.value = false;
};
</script>
