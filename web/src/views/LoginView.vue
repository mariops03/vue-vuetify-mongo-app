<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="mt-10">
            <v-card-title class="text-h6 grey pa-4">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="username"
                  label="Username"
                  outlined
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  outlined
                  required
                ></v-text-field>

                <v-btn type="submit" color="primary" class="mr-4">Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <div class="text-center text-subtitle-2">
          <router-link to="/signup">¿No tienes cuenta? Haz click para crear una!</router-link>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-alert
          v-if="loginMessage"
          :type="loginMessageType"
          class="mt-4"
          transition="fade-transition"
        >
          {{ loginMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { useUserStore } from '../store/user';

export default {
  data() {
    return {
      username: "",
      password: "",
      loginMessage: "",
      loginMessageType: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          this.showLoginMessage(data.message, "success");
          const userStore = useUserStore();
          userStore.updateUser(data.user);
          console.log("User:", data.user);
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 2000);
          

        } else {
          this.showLoginMessage(data.message, "error");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    showLoginMessage(message, type) {
      console.log("Showing login message:", message, type);

      this.loginMessage = message;
      this.loginMessageType = type;

      setTimeout(() => {
        console.log("Hiding login message.");
        this.loginMessage = "";
        this.loginMessageType = "";
      }, 2000);
    },
  },
};
</script>
