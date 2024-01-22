<template>
  <v-app>
    <v-main>
      <v-app-bar app color="primary">
        <v-btn @click="navigateHome" >
          <div class="text-h6 font-weight-bold">
            HOME
          </div>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="user && user.role === 'admin'" @click="navigateToSettings" text>
          <div class="white--text text-h8 font-weight-bold text-uppercase">
            CFG
          </div>
        </v-btn>
        <v-btn v-if="user" text>
          <div class="white--text text-h6 font-weight-bold text-uppercase">
            {{ user.username }}
          </div>
        </v-btn>
        <v-btn v-if="user" @click="logout" text>
          <div class="white--text text-h8 font-weight-bold text-uppercase">
            Logout
          </div>
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
        this.$router.push({ name: "Login" });
      }
    },
    navigateHome() {
      this.$router.push({ name: "Home" });
    },
    navigateToSettings() {
      this.$router.push({ name: "Settings" });
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
        this.$router.push({ name: "Login"});
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
  },
};
</script>
