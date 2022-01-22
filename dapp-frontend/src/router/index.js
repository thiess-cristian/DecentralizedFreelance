import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import PostSubmit from "../views/PostSubmit.vue"
import CreatePost from "../views/CreatePost.vue"
import Account from "../views/Account.vue"
import Mining from "../views/Mining.vue"

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
    },
    {
        path: "/account",
        name: "Account",
        component: Account
    },
    {
        path: "/mining",
        name: "Mining",
        component: Mining
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
