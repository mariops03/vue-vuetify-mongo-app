import { defineStore } from 'pinia';

export const useExercisesStore = defineStore({
  id: 'exercises',
  state: () => ({
    currentExercise: null,
    searchedExercsises: [],
  }),
  getters: {
    getCurrentExercise: state => state.currentExercise,
    getSearchedExercises: state => state.searchedExercsises,
  },
  actions: {
    updateCurrentExercise(exercise) {
      if (exercise !== undefined && exercise !== null) {
        this.currentExercise = exercise;
      } else {
        console.error('Se intentó almacenar un ejercicio no válido en el store');
      }
    },
    updateSearchedExercises(exercises) {
      if (exercises !== undefined && exercises !== null) {
        this.searchedExercsises = exercises;
        console.log(this.searchedExercsises);
      } else {
        console.error('Se intentó almacenar una lista de ejercicios no válida en el store');
      }
    },
  },
  persist: true,
});
