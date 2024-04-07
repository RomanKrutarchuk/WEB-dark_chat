<template>
  <div id="page">
    <div v-for="(field, index) in userProfile" :key="index">
      {{ field }}
    </div>
  </div>
</template>

<script>
import { useStore } from "~/stores";

export default {
  data() {
    return {
      userProfile: null,
    };
  },
  mounted() {
    const store = useStore();
    this.userProfile = store.$state.userProfile;
  },
};
</script>

<style></style>
