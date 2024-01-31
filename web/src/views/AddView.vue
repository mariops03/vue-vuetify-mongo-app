<template>
  <v-container class="narrow-form">
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="exercise.name"
        label="Nombre del ejercicio"
        required
      ></v-text-field>

      <v-select
        v-model="exercise.force"
        :items="['pull', 'push']"
        label="Tipo de fuerza"
        required
      ></v-select>

      <v-select
        v-model="exercise.level"
        :items="['beginner', 'intermediate', 'advanced']"
        label="Nivel"
        required
      ></v-select>

      <v-select
        v-model="exercise.mechanic"
        :items="['compound', 'isolation']"
        label="Mecánica"
      ></v-select>

      <v-select
        v-model="exercise.equipment"
        :items="[
          'dumbbell',
          'barbell',
          'cable',
          'machine',
          'body only',
          'other',
        ]"
        label="Equipamiento"
        required
      ></v-select>

      <v-select
        v-model="exercise.primaryMuscles"
        :items="MusclesOptions"
        label="Músculos principales"
        multiple
        required
        filterable
      ></v-select>

      <v-select
        v-model="exercise.secondaryMuscles"
        :items="MusclesOptions"
        label="Músculos secundarios (Opcional)"
        multiple
        filterable
      ></v-select>

      <v-row v-for="(instruction, index) in exercise.instructions" :key="index">
        <v-col cols="10">
          <v-textarea
            v-model="exercise.instructions[index]"
            :label="'Instrucción ' + (index + 1)"
            required
          ></v-textarea>
        </v-col>
        <v-col cols="2">
          <v-btn text @click="removeInstruction(index)">
          <v-icon color="red darken-2">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-btn class="mb-5" @click="addInstruction">Añadir Instrucción</v-btn>

      <v-select
        v-model="exercise.category"
        :items="[
          'strength',
          'powerlifting',
          'stretching',
          'plyometrics',
          'olympic weightlifting',
          'strongman',
        ]"
        label="Categoría"
        required
      ></v-select>

      <v-text-field v-model="exercise.images" label="Imágenes"></v-text-field>
      <v-btn type="submit" color="primary">Guardar</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      exercise: {
        name: "",
        force: "",
        level: "",
        mechanic: "",
        equipment: "",
        primaryMuscles: [],
        secondaryMuscles: [],
        instructions: [],
        category: "",
        images: "",
      },
      MusclesOptions: [
        "Biceps",
        "Triceps",
        "Deltoids",
        "Pectorals",
        "Abs",
        "Obliques",
        "Quads",
        "Hamstrings",
        "Calves",
        "Glutes",
        "Lats",
        "Traps",
        "Forearms",
        "Hip Flexors",
        "Adductors",
        "Abductors",
      ],
    };
  },
  methods: {
    async submitForm() {
      try {
        const {
          name,
          force,
          level,
          mechanic,
          equipment,
          primaryMuscles,
          secondaryMuscles,
          category,
          images,
        } = this.exercise;

        const id = name.replace(/ /g, "_");
        const response = await axios.post(
          "http://localhost:3001/api/v1/createExcersise",
          {
            name,
            force,
            level,
            mechanic,
            equipment,
            primaryMuscles,
            secondaryMuscles,
            instructions: this.exercise.instructions,
            category,
            images,
            id,
          }
        );
        if (response.status === 200) {
          this.resetForm();
          alert("¡Ejercicio guardado correctamente!");
        } else {
          console.error(
            "Error al guardar el ejercicio:",
            response.data.message
          );
          alert(
            "Se produjo un error al guardar el ejercicio. Por favor, inténtalo de nuevo."
          );
        }
      } catch (error) {
        console.error("Error al guardar el ejercicio:", error);
        alert(
          "Se produjo un error al guardar el ejercicio. Por favor, inténtalo de nuevo."
        );
      }
    },

    resetForm() {
      this.exercise = {
        name: "",
        force: "",
        level: "",
        mechanic: "",
        equipment: "",
        primaryMuscles: [],
        secondaryMuscles: [],
        instructions: [],
        category: "",
        images: "",
      };
    },
    addInstruction() {
      this.exercise.instructions.push("");
    },
    removeInstruction(index) {
    this.exercise.instructions.splice(index, 1);
  },
  },
};
</script>

<style scoped>
.narrow-form {
  max-width: 700px;
}
</style>
