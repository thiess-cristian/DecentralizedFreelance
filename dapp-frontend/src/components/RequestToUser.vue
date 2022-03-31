<template>
  <div class="columns">
    <div class="column">
      <Request :owner="owner" :post="post" :request="request" />
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
  name: "RequestToUser.vue",
  components: {
    Request,
  },
  props: {
    owner: String,
    post: String,
    request: String,
  },
};
</script>

<style scoped>
</style>