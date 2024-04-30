<template>
  <div id="header" class="h-[50px] bg-white flex flex-row">
    <NuxtLink class="ml-2" to="/">home</NuxtLink>
    <NuxtLink class="ml-2" to="/profile">profile</NuxtLink>
    <NuxtLink class="ml-2" to="/authentication">authentication</NuxtLink>
    <button @click="logout()">logout</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/user/auth";
const store = useAuthStore();

function logout() {
  store.logout();
}
</script>

<style></style>
