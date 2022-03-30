<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <button class="button" @click="nextImage">left arrow</button>
      </div>
      <div class="column">
        <img :src="image" />
      </div>
      <div class="column">
        <button class="button" @click="prevImage">left arrow</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoSection",
  props: {
    image: String,
  },
  data() {
    return {
      images: [],
      currentImage: "",
    };
  },
  methods: {
    nextImage() {},
    prevImage() {},
  },
};
</script>

<style scoped>
</style>