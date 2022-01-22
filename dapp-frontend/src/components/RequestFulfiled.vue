<template>
  <div class="columns">
    <div class="column">
      <Request />
    </div>
    <div class="column">
      <button class="button">download</button>
      <div class="accepted-symbol">symbol</div>
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