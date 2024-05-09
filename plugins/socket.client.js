import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://api-1-0-0fru.onrender.com/"
    : "http://localhost:3080";
const socket = io(URL);
// socket.on("hello", (data) => {
//   console.log(data);
// });

export default defineNuxtPlugin(() => {
  return {
    provide: {
      socket,
    },
  };
});
