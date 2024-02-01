<template>
  <div>
    <Navbar v-if="!mobile" />
    <Sidebar v-else />
  </div>
</template>

<script setup>
import Navbar from "./components/NavBar.vue";
import Sidebar from "./components/SideBar"
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}

.remove-top-margin {
  margin-top: 0 !important;
}
</style>
