import { defineStore } from 'pinia';

export const useExercisesStore = defineStore({
  id: 'exercises',
  state: () => ({
    currentExercise: JSON.parse(localStorage.getItem('currentExercise')) || null,
  }),
  getters: {
    getCurrentExercise: state => state.currentExercise,
  },
  actions: {
    updateCurrentExercise(exercise) {
      if (exercise !== undefined && exercise !== null) {
        this.currentExercise = exercise;
        localStorage.setItem('currentExercise', JSON.stringify(exercise));
      } else {
        console.error('Se intentó almacenar un ejercicio no válido en localStorage');
      }
    },
  },
});
