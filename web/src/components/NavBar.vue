<template>
  <v-app>
    <v-main>
      <v-app-bar app color="primary">
        <v-btn icon @click="navigateHome">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
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
      </v-app-bar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useTheme } from 'vuetify';

export default {
  setup() {
    const user = ref(null);
    const theme = useTheme();
    const darkTheme = ref(theme.value === 'dark'); // Añade esta línea

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
      this.$router.push({ name: "Home" });
    };

    const navigateToSettings = () => {
      this.$router.push({ name: "Settings" });
    };

    const navigateToLogin = () => {
      this.$router.push({ name: "Login" });
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
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      darkTheme.value = theme.value === 'dark';
    };

    onMounted(getUser);

    return {
      user,
      navigateHome,
      navigateToSettings,
      navigateToLogin,
      logout,
      toggleTheme,
      darkTheme // Añade esta línea
    };
  }
};
</script>