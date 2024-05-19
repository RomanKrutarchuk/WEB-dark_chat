<template>
  <div id="nuxtLayout" class="relative">
    <Header v-if="connected" />
    <slot />
  </div>
</template>
<script>
export default {
  computed: {
    connected: {
      get() {
        const { $connected } = useNuxtApp();
        // console.log($connected);
        return $connected.value;
      },
    },
  },
  watch: {
    connected(newValue) {
      const router = useRouter();
      console.log("await.connected.newValue", newValue);
      if (!newValue) {
        router.push("/await");
      }
    },
  },
};
</script>