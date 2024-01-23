import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import HomeView from "../views/HomeView.vue";
import SettingsView from "../views/SettingsView.vue";
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
          // Si el usuario está autenticado y tiene los roles necesarios, permite el acceso
          next();
        } else {
          // Si no tiene los permisos necesarios, redirige a la página de inicio
          console.error("No tiene los permisos necesarios");
          router.replace({ name: "Home" });
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
        // Si hay un error, redirige a la página de inicio de sesión
        router.replace({ name: "Login" });
      }
    } else if (to.meta.requiresAuth === false) {
      try {
        const response = await Axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
  
        // Si el usuario está autenticado, redirige a la página de inicio
        if (response.data) {
          router.replace({ name: "Home" });
        } else {
          // Si el usuario no está autenticado, permite el acceso a las rutas de inicio de sesión y registro
          next();
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
        // En caso de error, permite el acceso a las rutas de inicio de sesión y registro
        next();
      }
    } else {
      // Si la ruta no requiere autenticación, permite el acceso
      next();
    }
  });
  
  export default router;
