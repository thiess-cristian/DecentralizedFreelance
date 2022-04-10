<template>
  <div class="container">
    <div class="has-text-centered">
      <figure class="image is-inline-block">
        <img :src="images[currentImageIndex]" />
      </figure>
    </div>
    <div class="columns is-centered">
      <div class="column has-text-right">
        <button class="button" @click="prevImage">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
        </button>
      </div>
      <div class="column has-text-left">
        <button class="button" @click="nextImage">
          <span class="icon">
            <i class="fas fa-arrow-right"></i>
          </span>
        </button>
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
img {
  width: 256px; /* you can use % */
  height: 256px;
}
</style>