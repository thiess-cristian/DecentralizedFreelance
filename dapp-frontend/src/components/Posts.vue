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
          <Post
            :title="post.title"
            :description="post.description"
            :price="post.price"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Post from "./Post.vue";
import axios from "axios";

import { postsManagerAddress } from "../../config";
import PostsManager from "../../artifacts/contracts/PostsManager.sol/PostsManager.json";
import { ethers } from "ethers";

const ipfsURI = "https://ipfs.io/ipfs/";

export default {
  name: "Posts",
  components: { Post },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    const posts = this.getPosts();
    Promise.all([posts]).then((posts) => {
      console.log(posts);
      const postsArray = posts[0];
      for (const value in postsArray) {
        console.log(postsArray[value]);
        const id = postsArray[value];
        if (id) {
          const data = this.getIpfsPost(id);

          Promise.all([data]).then((data) => {
            console.log(data);
            this.posts.push({
              title: data[0]["title"],
              description: data[0]["description"],
              price: data[0]["price"].toString(),
            });
          });
        }
      }
    });
  },
  methods: {
    async getPostsBackend() {
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
    async getPosts() {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        postsManagerAddress,
        PostsManager.abi,
        provider
      );
      const data = await contract.fetchPosts();
      const paths = data.map((d) => d[3]);
      return paths;
    },

    async getIpfsPost(id) {
      const ipfsUrl = `${ipfsURI}/${id}`;
      const response = await fetch(ipfsUrl);
      const data = await response.json();

      return data;
    },
  },
};
</script>

<style scoped>
</style>