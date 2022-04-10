<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <button class="button" @click="prevImage">left arrow</button>
      </div>
      <div class="column">
        <img :src="images[currentImageIndex]" />
      </div>
      <div class="column">
        <button class="button" @click="nextImage">right arrow</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoSection",
  props: {
    image: String,
    images: Array,
  },
  data() {
    return {
      currentImageIndex: 0,
    };
  },
  methods: {
    nextImage() {
      this.currentImageIndex++;
      this.currentImageIndex %= this.images.length;
    },
    prevImage() {
      this.currentImageIndex--;
      if (this.currentImageIndex < 0) {
        this.currentImageIndex = this.images.length - 1;
      }
    },
  },
};
</script>

<style scoped>
</style>