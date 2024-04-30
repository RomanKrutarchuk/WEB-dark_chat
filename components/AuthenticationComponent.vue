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
        await $fetch("/api/authentication/token", {
          method: "POST",
          body: { token: credential },
        }).then((userProfileData) => {
          this.assignUserData(userProfileData);
          this.$emit("succes");
        });
      }
    },
    assignUserData(data) {
      const store = useAuthStore();
      store.login(data);
    },
  },
};
</script>
