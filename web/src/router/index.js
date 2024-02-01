import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import HomeView from "../views/HomeView.vue";
import SettingsView from "../views/SettingsView.vue";
import ExerciseDetails from "../components/ExerciseDetails.vue";
import SearchView from "../views/SearchView.vue";
import AddView from "../views/AddView.vue";
import Axios from "axios";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "/",
          name: "Home",
          component: HomeView,
        },
        {
          path: "/settings",
          name: "Settings",
          component: SettingsView,
          meta: {
            requiresAuth: true,
            requiredRoles: ['admin'],
          },
        },
        {
          path: "/exercise/:id",
          name: "Exercise",
          component: ExerciseDetails,
        },
        {
          path: "/search/:query",
          name: "Search",
          component: SearchView,
          props: true,
        },
        {
          path: "/addExercise",
          name: "addExercise",
          component: AddView,
          meta: {
            requiresAuth: true,
            requiredRoles: ['admin'],
          },
        }
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignUpView,
        meta: {
            requiresAuth: false,
        },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
      try {
        const response = await Axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        const user = response.data;
        const roles = to.meta.requiredRoles;
  
        if (roles && user && roles.includes(user.role)) {
          next();
        } else {
          console.error("No tiene los permisos necesarios");
          next(false)
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
        next(false)
      }
    } else if (to.meta.requiresAuth === false) {
      try {
        const response = await Axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        if (response.data) {
          next(false)
        } else {
          next();
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
        next();
      }
    } else {
      next();
    }
  });
  
  export default router;
