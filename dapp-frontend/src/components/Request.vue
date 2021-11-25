<template>
  <div class="request-container">
    <div class="request-header">
      <div class="title">TITLE</div>
      <div class="price">price</div>
      <div class="arrow">
        <button v-on:click="displayDescriptionFunction">arrow</button>
      </div>
    </div>
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
.request-container {
  display: flex;
  border-style: solid;
  border-color: blue;
  flex-direction: column;
}

.request-header {
  display: flex;
  border-style: solid;
  border-color: darkgreen;
  justify-content: space-between;
  width: 700px;
}
</style>