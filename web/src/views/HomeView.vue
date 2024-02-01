<template>
  <v-main>
    <h1>EJERCICIOS ALEATORIOS</h1>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <div v-if="isLoading">Cargando ejercicios...</div>
          <v-carousel v-if="!isLoading && exercises.length > 0" hide-delimiters class="mx-auto" style="max-width: 675px; height: auto;">
            <v-carousel-item
              v-for="(exercise, index) in exercises"
              :key="index"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <router-link :to="`/exercise/${exercise.id}`" class="no-underline" @click="updateCurrentExercise(exercise)">
                <v-card variant="flat">
                  <v-img
                    v-if="exercise && exercise.images && exercise.images.length"
                    :src="`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`"
                    :alt="exercise.name"
                    height="450px"
                  ></v-img>
                  <v-card-title class="white--text font-weight-bold">{{ exercise.name }}</v-card-title>
                </v-card>
              </router-link>
            </v-carousel-item>
          </v-carousel>
          <div v-if="exercises.length === 0 && !isLoading">
            No hay ejercicios disponibles.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import { useExercisesStore } from "../store/exercises";

export default {
  data() {
    return {
      exercises: [],
      isLoading: false,
    };
  },
  async mounted() {
    try {
      this.isLoading = true;
      const n = 5;
      const response = await axios.get(
        `http://localhost:3001/api/v1/getRandomExcersise/${n}`,
        {
          withCredentials: true,
        }
      );
      this.exercises = response.data;
    } catch (error) {
      console.error("Error al obtener los ejercicios:", error.message);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    updateCurrentExercise(exercise) {
      const exerciseStore = useExercisesStore();
      exerciseStore.updateCurrentExercise(exercise);
    },
  }
};
</script>

<style scoped>
.exercise-container {
  max-width: 1200px;
  margin: 0 auto;
}

.no-underline {
  text-decoration: none !important;
  color: var(--v-primary-base) !important;
}
</style>