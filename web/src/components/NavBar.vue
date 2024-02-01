<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-btn icon @click="navigateHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn v-if="user && user.role === 'admin'" icon @click="navigateAddView">
        <v-icon>mdi-plus-thick</v-icon>
      </v-btn>

      <v-btn icon @click="toggleTheme">
        <v-icon>{{
          darkTheme ? "mdi-weather-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>

      <v-menu v-if="user" open-on-hover>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <div class="white--text text-h6 font-weight-bold text-uppercase">
          {{ user.username }}
        </div>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="navigateToSettings">
        <v-list-item-content class="d-flex align-center">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Ajustes</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-content class="d-flex align-center">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>

      <v-btn text v-else @click="navigateToLogin">
        <div>
          <v-icon>mdi-account</v-icon>
          <div>Log in</div>
        </div>
      </v-btn>

      <v-dialog
        v-model="searchDialog"
        :fullscreen="mobile"
        :max-width="mobile ? 'none' : '600'"
        persistent
      >
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
  </v-app>
</template>

<script>
import { toRef, ref, onMounted } from "vue";
import axios from "axios";
import { useTheme } from "vuetify";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { useExercisesStore } from "../store/exercises";
import { useDisplay } from "vuetify";
import { useUserStore } from "../store/user";

export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const user = toRef(props, "user");
    const theme = useTheme();
    const darkTheme = ref(theme.global.current.value.dark);
    const router = useRouter();
    const searchDialog = ref(false);
    const searchQuery = ref("");
    const exercisesStore = useExercisesStore();
    const { mobile } = useDisplay();
    const useStore = useUserStore();

    const navigateHome = () => {
      router.push({ name: "Home" });
    };

    const navigateToSettings = () => {
      router.push({ name: "Settings" });
    };

    const navigateToLogin = () => {
      router.push({ name: "Login" });
    };

    const navigateAddView = () => {
      router.push({ path: "/addExercise" });
    };

    const logout = async () => {
      useStore.updateUser(null);
      user.value = null;
      try {
        await axios.post(
          "http://localhost:3001/auth/logout",
          {},
          {
            withCredentials: true,
          }
        );

        console.log("User: ", user.value);
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
    });

    return {
      user,
      navigateHome,
      navigateToSettings,
      navigateToLogin,
      navigateAddView,
      logout,
      toggleTheme,
      darkTheme,
      searchDialog,
      searchQuery,
      toggleSearch,
      closeSearchDialog,
      searchExercises,
      mobile,
    };
  },
};
</script>
