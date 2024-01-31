<template>
  <div>
    <Navbar />
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
  mounted(){
    console.log(this.$vuetify.display.mobile);
  }
};

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
