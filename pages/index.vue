<template>
  <div id="page"></div>
</template>
<script setup>
import { io } from "socket.io-client";
const socket = io("https://api-1-0-0fru.onrender.com/");
socket.on("socket send message", (res) => {
  console.log({ socket: res });
});
await $fetch("https://api-1-0-0fru.onrender.com/").then((res) => {
  console.log(res);
});

definePageMeta({
  layout: false,
});
</script>
