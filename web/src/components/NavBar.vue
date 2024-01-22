<template>
    <v-app>
      <v-main>
        <v-app-bar app color="primary">
          <v-app-bar-nav-icon @click.stop="navigateHome" />
          <v-toolbar-title class="ml-4">
            Página de inicio
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-avatar class="mr-4" v-if="loggedIn">
            {{ username.charAt(0).toUpperCase() }}
          </v-avatar>
          <v-btn v-if="loggedIn" @click.stop="logout" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-app-bar>
        <router-view></router-view> <!-- Para la navegación con Vue Router -->
      </v-main>
    </v-app>
</template>
  
  <script>
  export default {
    data() {
      return {
        loggedIn: false,
        username: "Usuario",
      };
    },
    methods: {
      navigateHome() {
        console.log("Ir a la página de inicio");
        // Agrega la lógica de navegación a la página de inicio
      },
      logout() {
        console.log("Cerrar sesión");
        // Agrega la lógica de cierre de sesión
      },
    },
  };
  </script>
  