<template>
    <v-main>
        <h1>{{ query.toUpperCase() }}</h1>
    
        <div class="exercise-container">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" lg="4" v-for="exercise in exercises" :key="exercise.id">
                        <ExcersiseCard :exercise="exercise" />
                    </v-col>
                </v-row>
                <div v-if="exercises.length === 0 && !isLoading">
                    No hay ejercicios disponibles.
                </div>
            </v-container>
        </div>
    </v-main>
</template>

<script>
import { useExercisesStore } from "../store/exercises";
import ExcersiseCard from "../components/ExcersiseCard.vue";

export default {
    name: "SearchView",
    props: {
        query: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            exercises: [],
            isLoading: false,
        };
    },
    created() {
        const exerciseStore = useExercisesStore();
        this.exercises = exerciseStore.getSearchedExercises;
        console.log(this.query);
    },
    watch: {
        query() {
            const exerciseStore = useExercisesStore();
            this.exercises = exerciseStore.getSearchedExercises;
        },
    },
    components: {
        ExcersiseCard,
    },
};
</script>

<style scoped>
.exercise-container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
