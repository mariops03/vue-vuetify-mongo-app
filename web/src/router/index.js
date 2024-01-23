import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import HomeView from "../views/HomeView.vue";
import SettingsView from "../views/SettingsView.vue";


const routes = [
    {
        path: "/",
        name: "DefaultLayout",
        component: DefaultLayout,
        children: [
            {
                path: "/",
                name: "Home",
                component: HomeView
            },
            {
                path: "/settings",
                name: "Settings",
                component: SettingsView
            }
            
        ]
    },
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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL || '/'),
    routes
})

export default router