<template>
  <NuxtLayout id="nuxtLayout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import { useStore } from "~/store";
export default {
  mounted() {
    const store = useStore();
    store.getUserProfileData();
  },
  destroyed() {},
};
</script>
