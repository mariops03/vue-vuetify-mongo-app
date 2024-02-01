<template>
  <v-app>
    <Navbar v-if="!mobile" :user="user" />
    <Sidebar v-else :user="user" />
  </v-app>
</template>

<script setup>
import Navbar from "./components/NavBar.vue";
import Sidebar from "./components/SideBar"
import { useDisplay } from "vuetify";
import { useUserStore } from "./store/user";
import { computed } from "vue";

const { mobile } = useDisplay();

const userStore = useUserStore();

const user = computed(() => userStore.getCurrentUser);


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.remove-top-margin {
  margin-top: 0 !important;
}
</style>