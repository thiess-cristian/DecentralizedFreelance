<template>
  <section class="section">
    <container class="container">
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="Find a repository" />
        </div>
        <div class="control">
          <a class="button is-info"> Search </a>
        </div>
      </div>
    </container>

    <div class="container">
      <div class="columns is-8 is-variable is-centered is-multiline">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  </section>
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "Posts",
  components: { Post },
};
</script>

<style scoped>
</style>