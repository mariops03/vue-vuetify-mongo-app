<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Aquí puedes agregar la lógica de inicio de sesión
        console.log(`Username: ${this.username}, Password: ${this.password}`);
      }
    }
  };
  </script>
  