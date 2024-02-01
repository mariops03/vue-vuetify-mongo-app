<template>
  <v-main>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" @input="drawer = $event" :width="220">
      <v-list>
        <v-list-item @click="navigateHome">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="user && user.role === 'admin'"
          @click="navigateAddView"
        >
          <v-list-item-icon>
            <v-icon>mdi-plus-thick</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add Exercise</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="user && user.role === 'admin'"
          @click="navigateToSettings"
        >
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="toggleTheme">
          <v-list-item-icon>
            <v-icon>{{
              darkTheme ? "mdi-weather-sunny" : "mdi-weather-night"
            }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Toggle Theme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else @click="navigateToLogin">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-main>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useTheme } from "vuetify";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

export default {
  setup() {
    const drawer = ref(false);
    const theme = useTheme();
    const darkTheme = ref(theme.global.current.value.dark);
    const router = useRouter();
    const user = ref(null);

    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        user.value = response.data;
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    const toggleDrawer = () => {
      console.log("toggleDrawer");
      drawer.value = !drawer.value;
    };

    const navigateHome = () => {
      router.push({ name: "Home" });
      closeDrawer();
    };

    const navigateToSettings = () => {
      router.push({ name: "Settings" });
      closeDrawer();
    };

    const navigateToLogin = () => {
      router.push({ name: "Login" });
      closeDrawer();
    };

    const navigateAddView = () => {
      router.push({ path: "/addExercise" });
      closeDrawer();
    };

    const logout = async () => {
      try {
        await axios.post(
          "http://localhost:3001/auth/logout",
          {},
          { withCredentials: true }
        );
        props.user = null;
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
      darkTheme.value = theme.global.current.value.dark;
      Cookies.set("theme", theme.global.name.value);
    };

    const closeDrawer = () => {
      drawer.value = false;
    };

    onMounted(() => {
      const themeFromCookie = Cookies.get("theme");
      if (themeFromCookie) {
        theme.global.name.value = themeFromCookie;
        darkTheme.value = theme.global.current.value.dark;
      }
      getUser();
    });

    return {
      drawer,
      toggleDrawer,
      navigateHome,
      navigateToSettings,
      navigateToLogin,
      navigateAddView,
      logout,
      toggleTheme,
      user,
      darkTheme,
    };
  },
};
</script>
