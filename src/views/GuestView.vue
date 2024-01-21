<template>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="text-h5">Guest</v-card-title>
            <v-card-text>
              <router-link to="/login" class="no-underline">
                <v-btn class="pa- ma-3" color="primary" block>Login</v-btn>
              </router-link>
              <router-link to="/signup" class="no-underline">
                <v-btn class="pa- ma-3" color="success" block>Register</v-btn>
              </router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style scoped>
  .no-underline {
    text-decoration: none !important;
  }
  </style>
  
  
  <script>
  export default {
    methods: {
      login() {
        console.log('Botón de iniciar sesión clickeado');
      },
      register() {
        console.log('Botón de registrarse clickeado');
      }
    }
  };
  </script>
  