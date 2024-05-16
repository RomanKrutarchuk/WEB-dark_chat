<template>
  <div v-if="userIsLoggined">
    <div id="header" class="flex flex-row items-center my-1">
      <NuxtLink class="ml-2 flex items-center" to="/">home</NuxtLink>
      <NuxtLink class="ml-2 flex items-center" to="/profile">profile</NuxtLink>
      <NuxtLink class="ml-2 flex items-center" to="/authentication">authentication</NuxtLink>
      <button class="ml-2 flex items-center" @click="logout()">logout</button>
    </div>
    <hr />
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

<style></style>
