import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import GuestView from "../views/GuestView.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: LoginView
    },
    {
        path: "/signup",
        name: "Signup",
        component: SignUpView
    },
    {
        path: "/guest",
        name: "Guest",
        component: GuestView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router