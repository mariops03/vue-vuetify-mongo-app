<template>
  <div>
    <h1>EJERCICIOS DISPONIBLES</h1>
    <v-container>
    <v-row justify="center">
      <v-col v-for="(exercise, index) in exercises.slice(0,20)" :key="index" cols="12" sm="6" md="4" lg="3" xl="3">
        <ExcersiseCardVue :exercise="exercise" class="ma-1"/>
      </v-col>
    </v-row>
    <div v-if="exercises.length === 0">No hay ejercicios disponibles.</div>
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
