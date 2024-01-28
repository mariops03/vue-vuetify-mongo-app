<template>
  <div>
    <h1>EJERCICIOS DISPONIBLES</h1>
    <v-container class="pa-5">
      <div v-if="isLoading">Cargando ejercicios...</div>
      <v-row v-else justify="center">
        <v-col v-for="(exercise, index) in exercises.slice(0,20)" :key="index" cols="12" sm="6" md="4" lg="3">
          <ExcersiseCardVue :exercise="exercise"/>
        </v-col>
      </v-row>
      <div v-if="exercises.length === 0 && !isLoading">No hay ejercicios disponibles.</div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import ExcersiseCardVue from '../components/ExcersiseCard.vue';

export default {
  components: {
    ExcersiseCardVue
  },
  data() {
    return {
      exercises: [],
      isLoading: false,
    };
  },
  async mounted() {
    try {
      this.isLoading = true;
      const response = await axios.get("http://localhost:3001/api/v1/getExcersises", {
        withCredentials: true,
      });
      this.exercises = response.data;
    } catch (error) {
      console.error("Error al obtener los ejercicios:", error.message);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
