<template>
  <div class="ma-4">
    <div>
      <v-expand-transition>
        <v-card style="width: 100%; height: 100%; border-radius: 15px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); transition: transform .2s;">
          <div 
            @mouseover="changeImage(1)" 
            @mouseleave="changeImage(0)"
            style="width: 100%; height: 60%;"
          >
            <v-img 
              :src="currentImage" 
              aspect-ratio="1.5"
              style="width: 100%; height: 100%;"
            ></v-img>
          </div>
          <v-divider></v-divider>

          <router-link :to="`/exercise/${exercise.id}`" class="no-underline">
            <v-card-title class="font-weight-bold no-underline primary--text" @click="selectExercise">{{ exercise.name }}</v-card-title>
          </router-link>

        </v-card>
      </v-expand-transition>
    </div>
  </div>
</template>

<script>

import { useExercisesStore } from '../store/exercises';


export default {
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentImage: `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${this.exercise.images[0]}`
    };
  },
  methods: {
    selectExercise() {
      const exerciseStore = useExercisesStore();
      exerciseStore.updateCurrentExercise(this.exercise);
    },
    changeImage(isHovering) {
      if (isHovering) {
        this.currentImage = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${this.exercise.images[1]}`;
      } else {
        this.currentImage = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${this.exercise.images[0]}`;
      }
    }
  }
};
</script>

<style scoped>
.no-underline {
  text-decoration: none !important;
  color: var(--v-primary-base) !important;
}
</style>
