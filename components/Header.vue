<template>
  <div v-if="userIsLoggined" id="header" class="h-[50px] flex flex-row">
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
    userIsLoggined() {
      const store = useAuthStore();
      const userIsLoggined = store.user != null ? true : false;
      return userIsLoggined;
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

<style></style>
