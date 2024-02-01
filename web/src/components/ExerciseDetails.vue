<template>
  <v-main>
    <v-row v-if="exercise" justify="center">
      <v-col cols="12" sm="10" md="8" >
        <v-card class="mt-5">
          <v-card-title
            class="font-weight-bold ma-4"
            style="font-size: xx-large"
            >{{ exercise.name }}</v-card-title
          >
          <v-row class="ma-4" justify="center">
            <v-col cols="12" md="7">
              <v-img
                :src="currentImage"
                aspect-ratio="1.5"
                align-center
              ></v-img>
            </v-col>

            <v-col cols="12" md="5">
              <div class="details">
                <div class="difficulty">
                  <strong class="mr-1">Level:</strong>
                  <template v-if="exercise.level === 'beginner'">
                    <v-icon :color="difficultyColor"> mdi-star </v-icon>
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
                <v-btn
                  v-if="exercise.images.length == 2"
                  text
                  variant="outlined"
                  class="my-2"
                  @click="toggleImageRotation"
                >
                  <v-icon> mdi-dumbbell </v-icon>
                </v-btn>
                <v-btn
                  v-if="user && user.role === 'admin'"
                  text
                  variant="outlined"
                  class="ma-5"
                  color="red darken-5"
                  @click="confirmDelete"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-dialog
                  :fullscreen="mobile"
                  v-model="dialogDelete"
                  :max-width="mobile ? 'none' : '400'"
                >
                  <v-card>
                    <v-card-title class="headline">Confirmación</v-card-title>
                    <v-card-text>
                      ¿Estás seguro de que deseas eliminar este ejercicio?
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="primary darken-1"
                        @click="dialogDelete = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        @click="deleteExerciseConfirmed"
                      >
                        Eliminar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="exercise" justify="center">
      <v-col cols="12" sm="10" md="8">
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
  </v-main>
</template>

<script>
import { useExercisesStore } from "../store/exercises";
import axios from "axios";

export default {
  data() {
    return {
      user: null,
      currentImageIndex: 0,
      imageInterval: null,
      rotationPaused: true,
      dialogDelete: false,
      mobile: null,
    };
  },
  mounted() {
    this.getUser();
    this.mobile = this.$vuetify.display.mobile;
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    },
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
    confirmDelete() {
      this.dialogDelete = true;
    },
    async deleteExerciseConfirmed() {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/v1/deleteExcersise/${this.exercise.id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          this.$router.push({ name: "Home" });
        } else {
          console.error("Error al eliminar el ejercicio:", error);
        }
      } catch (error) {
        console.error("Error al eliminar el ejercicio:", error);
      }
      this.dialogDelete = false;
    },
  },
  computed: {
    exercise() {
      const exerciseStore = useExercisesStore();
      return exerciseStore.getCurrentExercise;
    },
    currentImage() {
      if (this.exercise && this.exercise.images.length > 0) {
        return `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${
          this.exercise.images[this.currentImageIndex]
        }`;
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
