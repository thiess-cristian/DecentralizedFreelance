<template>
  <div class="container">
    <Request />
    <div class="download-file">
      <div class="download-button">
        <button>download</button>
      </div>
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

<style>
.container {
  border-style: solid;
  border-color: crimson;
  display: flex;
}
.download-file {
  display: flex;
}
</style>