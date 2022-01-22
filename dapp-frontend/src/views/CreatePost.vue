<template>
  <div class="container">
    <div class="box">
      <div class="title">Create a post</div>
      <form>
        <div class="field">
          <label class="label">title</label>
          <div class="control">
            <input type="text" class="input" />
          </div>
        </div>
        <div class="field">
          <label class="label">description</label>
          <div class="control">
            <input type="text" class="input" />
          </div>
        </div>
        <div class="field">
          <label class="label">price</label>
          <div class="control">
            <input type="number" class="input" />
          </div>
        </div>
        <div class="field">
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> Choose a file… </span>
              </span>
              <span class="file-name">File </span>
            </label>
          </div>
        </div>
        <div class="mt-6 has-text-centered">
          <button class="button">submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
};
</script>

<style scoped>
</style>