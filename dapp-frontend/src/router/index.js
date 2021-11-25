import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../components/Home.vue"
import PostSubmit from "../components/PostSubmit.vue"
import CreatePost from "../components/CreatePost.vue"

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
    },
    {
        path: '/create_post',
        name: "CreatePost",
        component: CreatePost
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router

