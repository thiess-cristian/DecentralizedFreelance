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
            :id="post.id"
            :title="post.title"
            :description="post.description"
            :price="post.price"
            :image="post.image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Post from "./Post.vue";

import { postsManagerAddress } from "../../config";
import PostsManager from "../../artifacts/contracts/PostsManager.sol/PostsManager.json";
import { ethers } from "ethers";

const ipfsURI = "https://ipfs.io/ipfs";

export default {
  name: "Posts",
  components: { Post },
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    const posts = await this.getPosts();

    for (const value in posts) {
      const id = posts[value];
      if (id) {
        const data = await this.getIpfsPost(id);
        let imageURL = "";

        if (data["image"]) {
          imageURL = `${ipfsURI}/${data["image"]}`;
        }
        this.posts.push({
          id: id,
          title: data["title"],
          description: data["description"],
          price: data["price"].toString(),
          image: imageURL,
        });
      }
    }
  },

  methods: {
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