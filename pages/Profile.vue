<template>
  <div id="page" class="flex justify-center items-center">
    <div id="userProfile" v-if="loading" class="w-600 h-400 border p-2">
      <div v-for="(field, index) in userProfileFields" :key="index">
        <div v-if="field === 'picture'">
          <img :src="userProfileData[field]" class="" />
        </div>
        <div v-else>{{ userProfileData[field] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "~/store";

definePageMeta({
  layout: "navigation",
});

export default {
  data() {
    return {
      loading: false,
      userProfileData: null,
      userProfileFields: ["picture", "name", "email"],
    };
  },
  mounted() {
    const store = useStore();
    this.userProfileData = store.$state.userProfile;
    // console.log(store.$state.userProfile);
    this.loading = true;
  },
};
</script>

<style></style>
