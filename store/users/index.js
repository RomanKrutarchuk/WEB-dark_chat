import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "~/store/user";
import { ref } from "vue";
import axios from "axios";

export const useUsersStore = defineStore("users", () => {
    const { $URLs } = useNuxtApp()
    const URL = $URLs.API
    
    const { $socket } = useNuxtApp()
    const { user } = storeToRefs(useUserStore())
    const users = ref([])

    if (user.value != null && user.value.id) {
        const id = user.value.id
        $socket.emit("clientSendUserId", id)
        // console.log("clientSendUserId");
        $socket.on("serverEmitAllUsers", (data) => {
            // console.log(JSON.parse(data));
            const ids = JSON.parse(data)
            // console.log({ ids });
            setUsersData(ids)
        })
    }
    async function setUsersData(ids) {
        let usersCount = []
        for (let index = 0; index < ids.length;) {
            const data = JSON.stringify({ id: ids[index] })
            await axios.post(URL + "/getUserData", data).then((res) => {
                // console.log("res", res.data);
                usersCount.push(res.data)
                index++
            })
        }
        console.log("store.users.setUsersData", usersCount);
        users.value = usersCount
    }

    return { users }
})