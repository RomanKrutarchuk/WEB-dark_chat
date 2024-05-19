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
    console.log("store.user.auth.awaitUserAuthStatus...");
    return new Promise((resolve, reject) => {
      if (fetching.value) {
        watch(user, (newValue, oldValue) => {
          // console.log("store.user.auth.authStatusLoggined", true);
          if (newValue != null) {
            return resolve(true)
          } else {
            // console.log("store.user.auth.authStatusLoggined", false);
            return resolve(false)
          }
        })
      } else {
        if (user.value != null) {
          // console.log("store.user.auth.authStatusLoggined", true);
          return resolve(true)
        }
        // console.log("store.user.auth.authStatusLoggined", false);
        return resolve(false)
      }
    })
  }
  async function fetchUser() {
    console.log("store.user.auth.fetchUser...");
    const apiHasWork = await axios.get(URL).then((res) => {
      return true
    }
    ).catch(error => {
      return false
    })
    if (!id) {
      console.log('store.user.auth.fetchUser.missingStorageId');
    }
    if (id) {
      fetching.value = true
      const data = JSON.stringify({ id: id });
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
    localStorage.setItem("id", JSON.stringify(user.value.id));
    console.log('store.auth.login.redirect');
    router.push({ path: "/profile" });
  }
  async function logout() {
    console.log("store.user.authStore.logout");
    user.value = null;
    localStorage.setItem("id", null);
    console.log('store.auth.logout.redirect');
    router.push({ path: "/authentication" });
  }
  function getId() {
    return JSON.parse(localStorage.getItem("id"))
  }


  return { user, login, logout, fetchUser, userIsLoggined };
});
