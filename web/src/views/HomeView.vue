<template>
  <div>
    <h1>BIENVENIDO A HOME</h1>
    <v-row justify="center">
      <v-col v-for="(exercise, index) in exercises" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <ExcersiseCardVue :exercise="exercise" />
      </v-col>
    </v-row>
    <div v-if="exercises.length === 0">No hay ejercicios disponibles.</div>
  </div>
</template>

<style scoped>
.exercise-row {
  margin: -8px; /* Ajusta según sea necesario */
}
</style>

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
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/getExcersises", {
        withCredentials: true,
      });
      this.exercises = response.data;
    } catch (error) {
      console.error("Error al obtener los ejercicios:", error.message);
    }
  },
};
</script>
