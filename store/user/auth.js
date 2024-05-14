import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";



export const useAuthStore = defineStore("auth", () => {
  const { $URLs } = useNuxtApp()
  const URL = $URLs.API

  const store = useStore()
  const router = store.router
  const fetching = ref(false)
  const id = getId()
  const user = ref(null)

  async function userIsLoggined() {
    console.log("store.user.auth.userIsLoggined...");
    return new Promise((resolve, reject) => {
      // console.log("fetching", fetching.value);
      if (fetching.value) {
        watch(user, (newValue, oldValue) => {
          console.log("newValue", newValue);
          if (newValue != null) {
            resolve(true)
          } else resolve(false)
        })
      } else {
        if (user.value != null) resolve(true)
        resolve(false)
      }
    })
  }
  async function fetchUser() {
    if (!id) {
      console.log('store.user.auth.fetchUser.missingStorageId');
      // user.value = null
    }
    if (id) {
      fetching.value = true
      const data = JSON.stringify({ userID: id });
      await axios.post(URL + "/auth", data).then((userProfileData) => {
        const data = userProfileData.data
        console.log('store.auth.fetchUser', { userProfileData: data })
        // console.log({ userProfileDataById: userProfileData.data });
        user.value = data
        return data
      });
      fetching.value = false
    }

  }
  async function login(credential) {
    const data = JSON.stringify({ token: credential });
    user.value = await axios.post(URL + "/auth", data).then((userProfileData) => {
      console.log({ userProfileData: userProfileData.data });
      return userProfileData.data
    });
    localStorage.setItem("userID", JSON.stringify(user.value.userID));
    console.log('store.auth.login.redirect');
    router.push({ path: "/profile" });
  }
  async function logout() {
    console.log("store.user.authStore.logout");
    user.value = null;
    localStorage.setItem("userID", null);
    console.log('store.auth.logout.redirect');
    router.push({ path: "/authentication" });
  }
  function getId() {
    return JSON.parse(localStorage.getItem("userID"))
  }


  return { user, login, logout, fetchUser, userIsLoggined };
});
