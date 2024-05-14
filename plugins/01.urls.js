const URLs = {
    API:
        process.env.NODE_ENV === "production"
            ? "https://api-1-0-0fru.onrender.com/"
            : "http://localhost:3080"
}
export default defineNuxtPlugin(() => {
    return {
        provide: {
            URLs
        }
    }
})
