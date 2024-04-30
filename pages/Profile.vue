<template>
  <div id="page">
    <div class="flex flex-col">
      <div class="w-screen h-screen p-2 flex flex-col items-start">
        <div id="userProfile" v-if="!loading" class="w-400 border p-2">
          <div v-for="(field, index) in userProfileFields" :key="index">
            <div v-if="field === 'picture'">
              <img :src="userProfileData[field]" class="" />
            </div>
            <div v-else>{{ userProfileData[field] }}</div>
          </div>
          <hr />
          <div v-if="activeUSers !== null">
            <div>activeUsers:</div>
            <div v-for="(user, index) in activeUSers" :key="index">
              {{ user.email }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "~/store";
export default {
  data() {
    return {
      activeUSers: null,
      loading: true,
      userProfileData: null,
      userProfileFields: ["picture", "name", "email"],
    };
  },
  mounted() {
    const store = useStore();
    if (store.$state.userProfile) {
      const { $socket } = useNuxtApp();

      $socket.emit("sendUserProfile", store.$state.userProfile);
      $socket.on("serverEmitAllUsers", (data) => {
        // console.log("serverSendAllUsers",data);
        store.assignActiveUsers(data);
        console.log(data);
        this.activeUSers = data;
      });
    }
    this.userProfileData = store.$state.userProfile;
    this.loading = false;
  },
  methods: {},
};
</script>
