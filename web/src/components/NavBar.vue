<template>
  <v-app>
    <v-main>
      <v-app-bar app color="primary">
        <v-btn icon @click="navigateHome">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="user && user.role === 'admin'"
          @click="navigateToSettings"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn icon @click="toggleTheme">
          <v-icon>{{
            darkTheme ? "mdi-weather-sunny" : "mdi-weather-night"
          }}</v-icon>
        </v-btn>

        <v-menu v-if="user">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <div class="white--text text-h6 font-weight-bold text-uppercase">
                {{ user.username }}
              </div>
            </v-btn>
          </template>
        </v-menu>
        <v-btn v-if="user" @click="logout" icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn text v-else @click="navigateToLogin">
          <div>
            <v-icon>mdi-account</v-icon>
            <div>Log in</div>
          </div>
        </v-btn>
        <v-dialog v-model="searchDialog" persistent max-width="600">
          <v-card>
            <v-card-title>Buscar ejercicios</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="searchQuery"
                label="Buscar ejercicios"
                clearable
                solo-inverted
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="searchExercises">Buscar</v-btn>
              <v-btn text @click="closeSearchDialog">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useTheme } from "vuetify";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { useExercisesStore } from "../store/exercises";

export default {
  setup() {
    const user = ref(null);
    const theme = useTheme();
    const darkTheme = ref(theme.global.current.value.dark);
    const router = useRouter();
    const searchDialog = ref(false);
    const searchQuery = ref("");
    const exercisesStore = useExercisesStore();

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

    const navigateHome = () => {
      router.push({ name: "Home" });
    };

    const navigateToSettings = () => {
      router.push({ name: "Settings" });
    };

    const navigateToLogin = () => {
      router.push({ name: "Login" });
    };

    const logout = async () => {
      try {
        await axios.post(
          "http://localhost:3001/auth/logout",
          {},
          {
            withCredentials: true,
          }
        );
        user.value = null;
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

    const toggleSearch = () => {
      searchDialog.value = !searchDialog.value;
    };

    const closeSearchDialog = () => {
      searchDialog.value = false;
    };

    const searchExercises = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/getExcersiseByName/${searchQuery.value}`,
          {
            withCredentials: true,
          }
        );
        const exercises = response.data;
        exercisesStore.updateSearchedExercises(exercises);
        router.push({ name: "Search", params: { query: searchQuery.value } });
        closeSearchDialog();
      } catch (error) {
        console.error("Error searching exercises:", error.message);
      }
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
      user,
      navigateHome,
      navigateToSettings,
      navigateToLogin,
      logout,
      toggleTheme,
      darkTheme,
      searchDialog,
      searchQuery,
      toggleSearch,
      closeSearchDialog,
      searchExercises,
    };
  },
};
</script>
