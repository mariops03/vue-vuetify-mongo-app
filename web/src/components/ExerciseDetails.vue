<template>
  <v-container>
    <v-row v-if="exercise" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title
            class="font-weight-bold ma-4"
            style="font-size: xx-large"
            >{{ exercise.name }}</v-card-title
          >
          <v-row class="ma-4" >
            <v-col cols="12" md="6">
              <v-img :src="currentImage" aspect-ratio="1.5"></v-img>
            </v-col>

            <v-col cols="12" md="6">
                <div class="details">
                  <div class="difficulty">
                    <strong class="mr-1">Level:</strong>
                    <template v-if="exercise.level === 'beginner'">
                      <v-icon :color="difficultyColor">
                        mdi-star
                      </v-icon>
                    </template>
                    <template v-else-if="exercise.level === 'intermediate'">
                      <v-icon
                        v-for="n in 2"
                        :key="n"
                        :color="difficultyColor"
                        height="14"
                        rounded
                      >
                        mdi-star
                      </v-icon>
                    </template>
                    <template v-else>
                      <v-icon
                        v-for="n in 3"
                        :key="n"
                        :color="difficultyColor"
                        height="14"
                        rounded
                      >
                        mdi-star
                      </v-icon>
                    </template>
                  </div>
                  <div v-if="exercise.force">
                    <strong>Force:</strong> {{ exercise.force }}
                  </div>
                  <div v-if="exercise.mechanic">
                    <strong>Mechanic:</strong> {{ exercise.mechanic }}
                  </div>
                  <div v-if="exercise.equipment">
                    <strong>Equipment:</strong> {{ exercise.equipment }}
                  </div>
                  <div>
                    <strong>Primary Muscles:</strong>
                    {{ exercise.primaryMuscles.join(", ") }}
                  </div>
                  <div
                    v-if="
                      exercise.secondaryMuscles &&
                      exercise.secondaryMuscles.length > 0
                    "
                  >
                    <strong>Secondary Muscles:</strong>
                    {{ exercise.secondaryMuscles.join(", ") }}
                  </div>
                  <div><strong>Category:</strong> {{ exercise.category }}</div>
                  <v-btn v-if="exercise.images.length == 2" text variant="outlined" class="my-2" @click="toggleImageRotation">
                    <v-icon>
                        mdi-dumbbell
                    </v-icon>
                  </v-btn>
                </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="exercise" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title
            class="font-weight-bold ma-4"
            style="font-size: xx-large"
            >Instructions</v-card-title
          >
          <v-card-text>
            <div class="instructions">
              <div
                v-for="(instruction, index) in exercise.instructions"
                :key="index"
                class="instruction"
              >
                {{ index + 1 }}. {{ instruction }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-else type="error">Acceso denegado</v-alert>
  </v-container>
</template>

<script>
import { useExercisesStore } from "../store/exercises";

export default {
  data() {
    return {
      currentImageIndex: 0,
      imageInterval: null,
      rotationPaused: true,
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
        return "";
      }
    },
    difficultyColor() {
      switch (this.exercise.level) {
        case "beginner":
          return "green darken-2";
        case "intermediate":
          return "orange darken-2";
        default:
          return "red darken-2";
      }
    },
  },
  methods: {
    changeImage() {
      if (
        this.exercise &&
        this.exercise.images &&
        this.exercise.images.length > 0
      ) {
        this.currentImageIndex =
          (this.currentImageIndex + 1) % this.exercise.images.length;
      }
    },
    toggleImageRotation() {
      if (this.rotationPaused) {
        this.imageInterval = setInterval(() => {
          this.changeImage();
        }, 1500);
      } else {
        clearInterval(this.imageInterval);
      }
      this.rotationPaused = !this.rotationPaused;
    },
  },
};
</script>

<style scoped>
.details {
  margin-top: 20px;
  text-align: left;
}

.difficulty {
  display: flex;
  align-items: center;
}

.instructions {
  margin-top: 10px;
}

.instruction {
  margin-bottom: 10px;
  text-align: left;
  font-size: medium;
}
</style>
