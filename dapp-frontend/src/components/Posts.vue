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
            :postAddress="post.postAddress"
            :title="post.title"
            :description="post.description"
            :price="post.price"
            :imageUrl="post.imageUrl"
            :userAddress="post.userAddress"
            :tags="post.tags"
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
    for (let i in posts) {
      const post = posts[i];
      const owner = post["owner"];
      const contentHash = post["content"];
      const id = post["id"];

      const ipfsData = await this.getIpfsPost(contentHash);
      const imageUrl = `${ipfsURI}/${ipfsData["images"][0]}`;

      this.posts.push({
        id: id.toString(),
        postAddress: contentHash,
        description: ipfsData["description"],
        title: ipfsData["title"],
        price: ipfsData["price"].toString(),
        imageUrl: imageUrl,
        userAddress: owner,
        tags: ipfsData["tags"],
      });
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

      return data;
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