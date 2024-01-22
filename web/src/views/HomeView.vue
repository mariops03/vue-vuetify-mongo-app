<template>
    <div>
      holaa
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    async created() {
      try {
        const response = await axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        this.$router.push("/login"); // Redirige al usuario a la página de inicio de sesión
      }
    },
  };
  </script>
  