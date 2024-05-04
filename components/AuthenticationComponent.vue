<template>
  <div id="AuthenticationComponent" class="max-w-max max-h-max">
    <GoogleSignInButton
      :theme="'filled_black'"
      class="m-0 p-0"
      @success="handleLoginSuccess"
      @error="handleLoginError"
    ></GoogleSignInButton>
  </div>
</template>
<script>
import GoogleSignInButton from "vue3-google-signin";
import { useAuthStore } from "~/store/user/auth";
import axios from "axios";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://api-1-0-0fru.onrender.com"
    : "http://localhost:3080";
export default {
  components: { GoogleSignInButton },
  methods: {
    handleLoginSuccess(loginResponse) {
      this.postAuthenticationToken(loginResponse);
    },
    handleLoginError() {
      console.error("Login failed");
    },
    async postAuthenticationToken(loginResponse) {
      const { credential } = loginResponse;
      if (credential) {
        const store = useAuthStore()
        store.login(credential)
      }
    },
    // assignUserData(data) {
    //   const store = useAuthStore();
    //   store.login(data);
    // },
  },
};
</script>
