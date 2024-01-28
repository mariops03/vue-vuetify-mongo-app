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
      this.currentExercise = exercise;
      localStorage.setItem('currentExercise', JSON.stringify(exercise));
    },
  },
});
