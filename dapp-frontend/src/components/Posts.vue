<template>
  <div class="search-bar-container">
    <div class="search-input">
      <input />
    </div>
    <div class="search-button">
      <button>SEARCH</button>
    </div>
  </div>
  <div class="posts-container">
    <div class="posts">
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
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "Posts",
  components: { Post },
};
</script>

<style>
.search-bar-container {
  display: flex;
  justify-content: center;
}

.posts-container {
  display: flex;
  justify-content: center;
}

.posts {
  display: grid;
  grid-template-columns: repeat(3, 200px);
}
</style>