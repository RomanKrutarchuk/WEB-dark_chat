<template>
  <div class="w-screen h-screen flex items-center">
    <div id="alert" class="w-screen h-max flex flex-col items-center py-2">
      <h3>Aplication does not work please await</h3>
      <p>You'll be automatically rerouted</p>
      <LoadingIndicator />
    </div>
  </div>
</template>
<script setup>
import { watch } from "vue";

const router = useRouter();
const { $connected } = useNuxtApp();

watch(
  $connected,
  (newValue) => {
    console.log("await.connected.newValue", newValue);
    if (newValue) {
      router.push("/");
    }
  },
  { immediate: true }
);
</script>
<style scoped>
#alert {
  background-color: rgb(255, 255, 255);
  color: black;
}
</style>