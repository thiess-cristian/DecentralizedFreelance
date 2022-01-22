<template>
  <div class="box">
    <div class="block">
      <div class="title">title</div>
    </div>
    <div class="block">
      <p>price</p>
    </div>
    <button class="button" v-on:click="displayDescriptionFunction">
      arrow
    </button>
    <div v-if="displayDescription">description</div>
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