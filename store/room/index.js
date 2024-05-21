import { defineStore } from "pinia"
import { ref, watch } from "vue"
import axios from "axios"
export const useRoomStore = defineStore("room", () => {
    const { $socket } = useNuxtApp()
    const { $URLs } = useNuxtApp()
    const URL = $URLs.API

    const room = ref(null)

    $socket.on("Room_update", async (data) => {
        // room.value = JSON.parse(data)
        const roomUsers = JSON.parse(data)
        console.log("Room_update", roomUsers);
        const activeUsers = [null, null]
        for (let id = 0; id < roomUsers.length; id++) {
            if (roomUsers[id].id != null) {
                const data = JSON.stringify(roomUsers[id])
                await axios.post(URL + "/getUserData", data).then((res) => {
                    const roomActiveUserData = res.data
                    console.log("store.room.Room_update.roomActiveUserData", {roomActiveUserData});
                    activeUsers[id] = roomActiveUserData
                })
            }
        }
        return room.value = activeUsers
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
