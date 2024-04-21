// store/filters.ts
import { defineStore } from "pinia";
// function getUserProfileFields() {
//   return {
//     isLoggined: false,
//     email: null,
//     name: null,
//     picture: null,
//     isOnline: false,
//     data: null,
//   };
// }
// function getUserProfileData() {
//   const userProfile = getUserProfileFields();
//   // const userProfileSavedData = JSON.parse(localStorage.getItem("userData"));
//   // console.log("store.index.", { userProfileSavedData });
//   // if (userProfileSavedData && userProfileSavedData.email)
//   //   return userProfileSavedData;
//   // console.log("store.index.",JSON.parse(data));
//   // const data = localStorage.getItem(store);
//   // return data.email ? JSON.parse(data) : userProfileDefault;
//   return userProfile;
// }

export const useStore = defineStore("store", {
  state: () => {
    return {
      userProfile: null,
      activeUsers: null,
    };
  },
  actions: {
    async getUserProfileData() {
      const config = useRuntimeConfig();
      const userProfile_StorageData = JSON.parse(
        localStorage.getItem("userData")
      );
      if (userProfile_StorageData && userProfile_StorageData.email != null) {
        // console.log("userProfile_StorageData", userProfile_StorageData);
        console.log("store.index.userProfile_StorageData", userProfile_StorageData);

        this.userProfile = userProfile_StorageData;
        return;
      }
      const data = await $fetch(config.public.API_URL + "/userProfileDefault");
      console.log("store.index.default_user", data);
      this.userProfile = data;
    },
    assignActiveUsers(activeUsers) {
      this.activeUsers = activeUsers;
    },
    assignUserProfileData(userProfileData) {
      // console.log("store.index.", userProfileData);
      const { email, name, picture } = userProfileData;
      this.userProfile.email = email;
      this.userProfile.name = name;
      this.userProfile.isLoggined = true;
      this.userProfile.picture = picture;
      this.saveUserProfile();
    },
    saveUserProfile() {
      localStorage.setItem("userData", JSON.stringify(this.userProfile));
      // console.log("store.index.",this.$state.userProfile);
    },
    clearUserProfile() {
      localStorage.removeItem("userData");
      this.userProfile = this.getUserProfileData();
    },
    exit() {
      this.clearUserProfile();
      this.router.push({ path: "/authentication" });
      // console.log("store.index.",);
    },
    onlineUserStatus(status) {
      this.userProfile.isOnline = status;
    },
  },
});

// localStorage.setItem('name',value);
// localStorage.getItem('name')
// localStorage.removeItem('name')
