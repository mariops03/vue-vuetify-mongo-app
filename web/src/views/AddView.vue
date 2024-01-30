<template>
  <v-container class="narrow-form">
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="exercise.name"
        label="Nombre del ejercicio"
        required
      ></v-text-field>
      <v-text-field
        v-model="exercise.force"
        label="Tipo de fuerza"
        required
      ></v-text-field>
      <v-text-field
        v-model="exercise.level"
        label="Nivel"
        required
      ></v-text-field>
      <v-text-field v-model="exercise.mechanic" label="Mecánica"></v-text-field>
      <v-text-field
        v-model="exercise.equipment"
        label="Equipamiento"
        required
      ></v-text-field>
      <v-text-field
        v-model="exercise.primaryMuscles"
        label="Músculos principales"
        required
      ></v-text-field>
      <v-text-field
        v-model="exercise.secondaryMuscles"
        label="Músculos secundarios (Opcional)"
      ></v-text-field>
      <v-textarea
        v-model="exercise.instructions"
        label="Instrucciones"
        required
      ></v-textarea>
      <v-text-field
        v-model="exercise.category"
        label="Categoría"
        required
      ></v-text-field>
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
        primaryMuscles: "",
        secondaryMuscles: "",
        instructions: "",
        category: "",
        images: "",
      },
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
          instructions,
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
            instructions,
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
        primaryMuscles: "",
        secondaryMuscles: "",
        instructions: "",
        category: "",
        images: "",
      };
    },
  },
};
</script>

<style scoped>
.narrow-form {
  max-width: 700px;
}
</style>
