<template>
  <div class="container box has-shadow">
    <div class="title">title</div>
    <p>price</p>
    <button class="button" v-on:click="displayDescriptionFunction">
      arrow
    </button>
    <div v-if="displayDescription" class="description">description</div>
  </div>
</template>

<script>
export default {
  name: "Request",
  data() {
    return { displayDescription: false };
  },
  methods: {
    displayDescriptionFunction: function () {
      this.displayDescription = !this.displayDescription;
    },
  },
};
</script>

<style>
</style>