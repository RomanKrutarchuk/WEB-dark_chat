<template>
  <div id="header" class="h-[50px] flex flex-row">
    <NuxtLink class="ml-2 flex items-center" to="/">home</NuxtLink>
    <NuxtLink class="ml-2 flex items-center" to="/profile">profile</NuxtLink>
    <NuxtLink class="ml-2 flex items-center" to="/authentication">authentication</NuxtLink>
    <button class="ml-2 flex items-center" @click="logout()">logout</button>
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
