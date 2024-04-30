<template>
  <div class="main">
    <input type="text" placeholder="name" v-model="inputName" />
    <input type="text" placeholder="message" v-model="inputMessage" />
    <button @click="insertMessage">submit</button>
    <button @click="updateDoc">update</button>
    <div class="messages flex flex-col">
      <div id="message" v-for="(message, index) in messageCount" :key="index">
        {{ index }} {{ message.name }}: {{ message.message }}
      </div>
    </div>
  </div>
</template>
<script>
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ouetmxjpnlvcnzlicxbc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZXRteGpwbmx2Y256bGljeGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NDkwMjgsImV4cCI6MjAyNzAyNTAyOH0.famvL5BH6jftXG6rKH_cOJIW9sXRRRER3XVXmhE-LmA";
const supabase = createClient(supabaseUrl, supabaseKey);

// let { data: messages } = await supabase.from("messages").select("*");
// console.log("get",messages);

const channels = supabase
  .channel("custom-insert-channel")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "messages" },
    (payload) => {
      console.log("Change received!", payload);
    }
  )
  .subscribe();

// definePageMeta({
//   layout: false,
//   middleware: "auth",
// });

export default {
  data() {
    return {
      messageCount: null,
      inputMessage: "",
      inputName: "",
    };
  },
  methods: {
    async insertMessage() {
      try {
        const { data, error } = await supabase
          .from("messages")
          .insert({ name: this.inputName, message: this.inputMessage })
          .select();
        this.clearInput();
        if (data) console.log(data);
      } catch (error) {
        console.log(error);
        this.clearInput();
      }
    },
    async updateDoc() {
      try {
        const { error } = await supabase
          .from("messages")
          .update({ message: "ea net" })
          .eq("id", 27);
        this.clearInput();
      } catch (error) {
        console.log(error);
        this.clearInput();
      }
    },
    clearInput() {
      this.inputMessage = "";
      this.inputName = "";
    },
  },
  async mounted() {
    let { data: messages } = await supabase.from("messages").select("*");
    // console.log("get", messages);
    this.messageCount = messages;

    const channels = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          // console.log("Change received!", payload.new);
          this.messageCount.push(payload.new);
        }
      )
      .subscribe();
  },
};
</script>

<style>
.main {
  width: 100%;
  height: 100%;
}
</style>
