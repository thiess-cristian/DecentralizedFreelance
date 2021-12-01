<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6">
        <Request />
      </div>

      <div class="column is-6">
        <button class="button">download</button>
        <div class="accepted-symbol">symbol</div>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "./Request.vue";

export default {
  name: "RequestFulfiled.vue",
  components: {
    Request,
  },
};
</script>

<style scoped>
</style>