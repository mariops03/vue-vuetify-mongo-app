<template>
  <v-main>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-card class="mt-10">
          <v-card-title class="text-h6 grey lighten-2 pa-4"
            >Sign Up</v-card-title
          >
          <v-card-text>
            <v-form @submit.prevent="register" ref="form">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="usernameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="emailRules"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="passwordRules"
                outlined
                required
              ></v-text-field>
              <v-btn type="submit" color="success" class="mr-4" block>
                Register
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5">
        <div class="text-center text-subtitle-2">
          <router-link to="/login"
            >Already have an account? Click here to login!</router-link
          >
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-alert
          v-if="registrationMessage"
          :type="registrationMessageType"
          class="mt-4"
          transition="fade-transition"
        >
          {{ registrationMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { useUserStore } from "../store/user";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      registrationMessage: "",
      registrationMessageType: "",
      usernameRules: [
        (v) => {
          const isValid = !!v;
          console.log(`Username validation: ${isValid}`);
          return isValid || "El nombre de usuario es requerido";
        },
      ],
      emailRules: [
        (v) => {
          const isValid = !!v;
          console.log(`Email presence validation: ${isValid}`);
          return isValid || "El correo electrónico es requerido";
        },
        (v) => {
          const isValid = /.+@.+\..+/.test(v);
          console.log(`Email format validation: ${isValid}`);
          return isValid || "El correo electrónico debe ser válido";
        },
      ],
      passwordRules: [
        (v) => {
          const isValid = !!v;
          console.log(`Password presence validation: ${isValid}`);
          return isValid || "La contraseña es requerida";
        },
        (v) => {
          const isValid = v && v.length >= 8;
          console.log(`Password length validation: ${isValid}`);
          return isValid || "La contraseña debe tener al menos 8 caracteres";
        },
      ],
    };
  },
  methods: {
    async register() {
      const isValid = await this.$refs.form.validate();
      if (isValid.valid) {
        try {
          const response = await fetch("http://localhost:3001/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
            }),
          });

          const data = await response.json();

          if (data.success) {
            const userStore = useUserStore();
            userStore.updateUser(data.user);
            this.showRegistrationMessage(data.message, "success");
            this.$router.push({ name: "Home" });
          } else {
            this.showRegistrationMessage(data.message, "error");
          }
        } catch (error) {
          console.error("Error during registration:", error);
          this.showRegistrationMessage("Internal server error", "error");
        }
      } else {
        this.showRegistrationMessage(
          "Please fill out the form correctly",
          "error"
        );
      }
    },
    showRegistrationMessage(message, type) {
      this.registrationMessage = message;
      this.registrationMessageType = type;

      setTimeout(() => {
        this.registrationMessage = "";
        this.registrationMessageType = "";
      }, 2000);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
