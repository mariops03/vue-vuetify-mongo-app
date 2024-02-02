<template>
  <v-main>
    <v-row justify="center" class="mt-3">
      <v-col cols="6" >
        <v-container>
          <h1>Informacion del usuario</h1>
          <v-card class="mt-8">
            <v-row justify="center" align="center">
              <v-col cols="6">
                <h3>Nombre del usuario</h3>
                <h3>Correo electronico del usuario</h3>
              </v-col>
              <v-col cols="6">
                <h2 hover>{{ user.username }}</h2>
                <h2>{{ user.email }}</h2>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { useUserStore } from "../store/user";

export default {
  setup() {
    const userStore = useUserStore();

    return {
      user: userStore.getCurrentUser,
    };
  },
};
</script>
