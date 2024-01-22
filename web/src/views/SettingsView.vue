<template>
    <div>
      <p v-if="user">{{ userMessage }}</p>
      <p v-else>HOLAAAAAAA</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: null,
        userMessage: "",
      };
    },
    async created() {
      try {
        const response = await axios.get("http://localhost:3001/auth/admin", {
          withCredentials: true,
        });
        this.user = response.data;
        this.userMessage = "Acceso concedido";
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        this.$router.push({ name: "Home" });
      }
    },
  };
  </script>