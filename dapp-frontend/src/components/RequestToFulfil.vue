<template>
  <div class="container">
    <Request />
    <div class="upload-file">
      <form class="upload-file-form">
        <input type="file" id="file" ref="file" />
        <input type="submit" value="submit" />
      </form>
      <div class="accepted-symbol">symbol</div>
    </div>
  </div>
</template>

<script>
import Request from "./Request.vue";

export default {
  name: "RequestToFulfil",
  components: {
    Request,
  },
};
</script>

<style scoped>
.container {
  border-style: solid;
  border-color: crimson;
  display: flex;
}

.upload-file {
  display: flex;
}

.upload-file-form {
  display: flex;
}
</style>