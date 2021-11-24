import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../components/Home.vue"
import PostSubmit from "../components/PostSubmit.vue"

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/post',
        name: "Post",
        component: PostSubmit
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router

