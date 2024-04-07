<template>
  <div id="layout navigation">
    <div class="w-full h-full flex flex-row">
      <NuxtLink to="/authentication" class="mx-2">authentication</NuxtLink>
      <NuxtLink to="/dashboard" class="mx-2">dashboard</NuxtLink>
      <NuxtLink to="/profile" class="mx-2">profile</NuxtLink>
    </div>
    <slot id="page"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>
