<template>
  <section class="section">
    <div class="field has-addons">
      <div class="control">
        <input class="input" type="text" placeholder="Find a repository" />
      </div>
      <div class="control">
        <a class="button is-info"> Search </a>
      </div>
    </div>

    <div class="container">
      <div class="columns is-variable is-multiline">
        <div class="column is-4-tablet is-3-desktop">
          <Post />
        </div>
        <div class="column is-4-tablet is-3-desktop">
          <Post />
        </div>
        <div class="column is-4-tablet is-3-desktop">
          <Post />
        </div>
        <div class="column is-4-tablet is-3-desktop">
          <Post />
        </div>
        <div class="column is-4-tablet is-3-desktop">
          <Post />
        </div>
        <div class="column is-4-tablet is-3-desktop">
          <Post />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "Posts",
  components: { Post },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getPosts() {},
  },
};
</script>

<style scoped>
</style>