<template>
  <v-card class="pa-2 ma-auto" max-width="280" min-height hover>
    <v-img :src="exercise.image" aspect-ratio="2.75"></v-img>
    <v-card-title>{{ exercise.name }}</v-card-title>
    <v-card-subtitle>{{ exercise.description }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: ["exercise"],
};
</script>
