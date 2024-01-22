<template>
  <v-app>
    <v-main>
      <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click="navigateHome" />
        <v-toolbar-title class="text-center">
          Página de inicio
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="user" text>
          <span class="white--text">
            {{ user.username }}
          </span>
        </v-btn>
        <v-btn v-if="user" @click.stop="logout" icon>
          <v-icon> mdi-logout </v-icon>
        </v-btn>
      </v-app-bar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    await this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    },
    navigateHome() {
      this.$router.push("/");
    },
    async logout() {
      try {
        await axios.post(
          "http://localhost:3001/auth/logout",
          {},
          {
            withCredentials: true,
          }
        );
        this.user = null;
        this.$router.push("/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
  },
};
</script>
