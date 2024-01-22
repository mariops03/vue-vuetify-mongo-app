<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="text-h6 grey lighten-2 pa-4">Sign Up</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field v-model="username" label="Username" outlined required></v-text-field>
                <v-text-field v-model="email" label="Email" type="email" outlined required></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" outlined required></v-text-field>
                <v-btn type="submit" color="success" class="mr-4" block>
                  Register
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <div class="text-center text-subtitle-2">
          <router-link to="/login">Already have an account? Click here to login!</router-link>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      registrationMessage: "",
      registrationMessageType: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:3001/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          }),
        });

        const data = await response.json();

        if (data.success) {
          this.showRegistrationMessage(data.message, 'success');
          this.$router.push ({ name: 'Home' });
        } else {
          this.showRegistrationMessage(data.message, 'error');
        }
      } catch (error) {
        console.error("Error during registration:", error);
        this.showRegistrationMessage('Internal server error', 'error');
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
