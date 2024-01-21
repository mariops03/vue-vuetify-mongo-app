<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="text-h6 grey lighten-2 pa-4">Sign Up</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field
                  v-model="username"
                  label="Username"
                  outlined
                  required
                ></v-text-field>
  
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
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
  
                <v-btn type="submit" color="success" class="mr-4" block>Register</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        email: "",
        password: "",
      };
    },
    methods: {
      register() {
        // Lógica para procesar el registro
        console.log(`Username: ${this.username}, Email: ${this.email}, Password: ${this.password}`);
      },
    },
  };
  </script>
  