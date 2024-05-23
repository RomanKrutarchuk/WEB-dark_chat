<template>
  <div
    id="page"
    class="flex md:items-center md:justify-center flex flex-col md:flex-row"
  >
    <div
      v-if="!chooseValue"
      class="w-screen h-screen md:w-400 md:h-400 flex flex-col items-center justify-center md:justify-start"
    >
      <p class="my-2">Authentication</p>
      <input
        class="my-2 bg-transparent"
        type="text"
        placeholder="email"
        v-model="email"
      />
      <input
        class="my-2 bg-transparent"
        type="text"
        placeholder="name"
        v-model="name"
      />
      <button class="my-2" @click="choose()">Submit</button>
      <input
        class="my-2 bg-transparent"
        type="text"
        disabled
        placeholder="password"
      />
      <AuthenticationComponent class="my-2" />
    </div>
    <div
      v-else
      class="w-screen h-screen md:w-400 md:h-400 flex flex-col items-center justify-center md:justify-start border"
    >
      <div class="w-max h-max">
        <p class="my-2">Your name: {{ name }}</p>
        <p class="my-2">Your email: {{ email }}</p>
        <button class="my-2" @click="submit()">Submit</button>
      </div>
    </div>
    <div
      class="w-screen h-max md:w-400 md:h-400 flex flex-col items-center justify-center md:justify-start p-2"
    >
      <p class="my-2">Information:</p>
      <p class="text-sm">The password doesn't work.</p>
      <p class="text-sm">Use name and email or google quick auth.</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "~/store/user/auth";

export default {
  data() {
    return {
      name: "",
      email: "",
      chooseValue: false,
    };
  },
  methods: {
    choose() {
      if (this.name === "" && this.email === "") return;
      this.chooseValue = true;
    },
    submit() {
      if (this.name === "" && this.email === "") return;
      const { login } = useAuthStore();
      const authData = { email: this.email, name: this.name };
      console.log({ authData });
      login({ authData });
      this.name = "";
      this.email = "";
      this.chooseValue = false;
    },
  },
};
</script>
