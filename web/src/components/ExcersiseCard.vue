<template>
  <div>
    <div>
      <v-expand-transition>
        <v-card class="pa-2" style="width: 100%; height: 100%; border-radius: 15px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); transition: transform .2s;">
          <div 
            @mouseover="changeImage(1)" 
            @mouseleave="changeImage(0)"
            style="width: 100%; height: 60%;"
          >
            <v-img 
              :src="currentImage" 
              aspect-ratio="2.75"
              style="width: 100%; height: 100%;"
            ></v-img>
          </div>
          <v-divider></v-divider>
          <v-card-title class="font-weight-bold" style="font-size: 18px;">{{ exercise.name }}</v-card-title>
        </v-card>
      </v-expand-transition>
    </div>
  </div>
</template>

<script>
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
