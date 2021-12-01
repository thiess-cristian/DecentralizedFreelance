<template>
  <div class="container">
    <div class="columns">
      <div class="column is-size-6">
        <Request />
      </div>

      <div class="column is-size-6">
        <div class="file has-name is-right">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label"> Choose a file… </span>
            </span>
            <span class="file-name">
              Screen Shot 2017-07-29 at 15.54.25.png
            </span>
          </label>
        </div>
        <div class="accepted-symbol">symbol</div>
      </div>
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
</style>