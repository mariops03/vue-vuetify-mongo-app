<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
export default {
  data() {
    return {
      user: null,
    };
  },
  components: {
    Navbar,
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.remove-top-margin {
  margin-top: 0 !important;
}
</style>
