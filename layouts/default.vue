<template>
  <div id="layout default">
    <div class="w-full h-full flex flex-row">
      <NuxtLink to="/authentication" class="mx-2">authentication</NuxtLink>
      <!-- <NuxtLink to="/dashboard" class="mx-2">dashboard</NuxtLink> -->
      <NuxtLink to="/profile" class="mx-2">profile</NuxtLink>
      <NuxtLink to="/" class="mx-2">home</NuxtLink>
      <button @click="exit()">exit</button>
    </div>
    <slot/>
  </div>
</template>

<script setup>
import { useStore } from "~/store";
const store = useStore();
// console.log(store.$state);

function exit() {
  store.exit();
}
</script>

<style></style>
