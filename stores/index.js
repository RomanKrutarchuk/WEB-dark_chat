// store/filters.ts
import { defineStore } from "pinia";
const store = {
  id: "store",
  state: () => ({
    userProfile: {
      online: false,
      email: null,
      name: null,
    },
  }),
  actions: {
    assignUserProfileData(userProfileData) {
      console.log("userProfileData", userProfileData);
      const { email, name } = userProfileData;
      userProfile.email = email;
      userProfile.name = name;
      userProfile.online = true;
    },
  },
};
export const useStore = defineStore(store);
