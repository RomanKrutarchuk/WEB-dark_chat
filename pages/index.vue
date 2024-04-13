<template>
  <div id="page" class="flex flex-col">
    <p>index page here</p>
  </div>
</template>

<script setup>

const { $socket } = useNuxtApp();
$socket.on("socket send message", (res) => {
  console.log({ socket: res });
});

</script>
