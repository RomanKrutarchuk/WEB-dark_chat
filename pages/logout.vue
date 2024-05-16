<template>
    <div>logout</div>
</template>

<script>
import { useAuthStore } from "~/store/user/auth";
export default {
    mounted() {
        console.log("/logout");
        const store = useAuthStore();
        store.logout();
    }
}
</script>