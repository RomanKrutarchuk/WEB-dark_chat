import { defineStore } from "pinia"
import { ref, watch } from "vue"
import axios from "axios"

export const useRoomStore = defineStore("room", () => {
    const { $socket } = useNuxtApp()

    const room = ref(null)

    $socket.on("Room_update", (data) => {
        room.value = JSON.parse(data)
        console.log("Room_update", room.value);
    })
    async function roomSetUser(plaseIndex, id) {
        console.log("roomSetUser...");
        const data = JSON.stringify({ plaseIndex, id })
        $socket.emit("Room_enter", data)
    }
    async function roomExcludeUser(id) {
        console.log("roomExcludeUser...");
        $socket.emit("Room_exit", id)
    }
    return { room, roomSetUser, roomExcludeUser }
})
