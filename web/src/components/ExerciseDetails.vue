<template>
    <v-container v-if="exercise" class="exercise-details">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="headline">{{ exercise.name }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title><strong>Force:</strong> {{ exercise.force }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title><strong>Level:</strong> {{ exercise.level }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="exercise.mechanic">
                      <v-list-item-content>
                        <v-list-item-title><strong>Mechanic:</strong> {{ exercise.mechanic }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title><strong>Equipment:</strong> {{ exercise.equipment }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title><strong>Primary Muscles:</strong> {{ exercise.primaryMuscles.join(', ') }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="exercise.secondaryMuscles">
                      <v-list-item-content>
                        <v-list-item-title><strong>Secondary Muscles:</strong> {{ exercise.secondaryMuscles.join(', ') }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title><strong>Instructions:</strong></v-list-item-title>
                        <v-list-item-subtitle>
                          <v-row>
                            <v-col v-for="(instruction, index) in exercise.instructions" :key="index" class="mb-2">
                              {{ index + 1 }}. {{ instruction }}
                            </v-col>
                          </v-row>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title><strong>Category:</strong> {{ exercise.category }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="exercise.images.length" style="width: 1000px;" class="align-center justify-center" >
                      <v-list-item-content>
                        <v-list-item-title><strong>Images:</strong></v-list-item-title>
                        <v-row>
                          <v-col>
                            <v-img :src="currentImage" alt="Exercise Image" aspect-ratio="1.5"></v-img>
                          </v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-alert type="error">Acceso denegado</v-alert>
    </v-container>
  </template>
  
  <script>
  import { useExercisesStore } from '../store/exercises';

  export default {
    data() {
      return {
        currentImageIndex: 0,
        imageInterval: null
      };
    },
    computed: {
      exercise() {
        const exerciseStore = useExercisesStore();
        return exerciseStore.getCurrentExercise;
      },
      currentImage() {
        if (this.exercise && this.exercise.images.length > 0) {
          return `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${this.exercise.images[this.currentImageIndex]}`;
        } else {
          return '';
        }
      }
    },
    methods: {
        changeImage() {
  if (this.exercise && this.exercise.images && this.exercise.images.length > 0) {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.exercise.images.length;
  }
},

    },
    watch: {
      exercise: {
        handler() {
          if (this.imageInterval) {
            clearInterval(this.imageInterval);
          }
          this.imageInterval = setInterval(this.changeImage, 2000);
        },
        immediate: true
      }
    }
  };
</script>
