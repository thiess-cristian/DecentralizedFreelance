<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="Find a post" />
        </div>
        <div class="control">
          <a class="button is-info"> Search </a>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="columns is-variable is-multiline">
        <div
          class="column is-4-tablet is-3-desktop"
          v-for="post in posts"
          v-bind:key="post.id"
        >
          <Post :title="post.title" :description="post.description" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Post from "./Post.vue";
import axios from "axios";

export default {
  name: "Posts",
  components: { Post },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      axios
        .get("/freelance/posts")
        .then((response) => {
          for (let i = 0; i < response.data.results.length; i++) {
            this.posts.push(response.data.results[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>