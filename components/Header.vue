<template>
  <div
    v-if="userIsLoggined"
    id="header"
    class="flex flex-row items-center py-2"
  >
    <NuxtLink class="ml-2 flex items-center" to="/">home</NuxtLink>
    <NuxtLink class="ml-2 flex items-center" to="/profile">profile</NuxtLink>
    <NuxtLink class="ml-2 flex items-center" to="/authentication"
      >authentication</NuxtLink
    >
    <button class="ml-2 flex items-center" @click="logout()">logout</button>
  </div>
</template>

<script>
import { useAuthStore } from "~/store/user/auth";

export default {
  computed: {
    userIsLoggined: {
      get() {
        // const store = useAuthStore();
        const { user } = storeToRefs(useAuthStore());
        if (user.value !== null && user.value.email !== null) return true;
        return false;
      },
    },
  },
  methods: {
    logout() {
      const store = useAuthStore();
      store.logout();
    },
  },
};
</script>

<style>
#header {
  color: rgb(255, 255, 255);
}
</style>
