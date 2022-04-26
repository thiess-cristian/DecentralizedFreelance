<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="field has-addons">
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Find a post"
            v-model="searchText"
          />
        </div>
        <div class="control">
          <button class="button is-info" @click="search(searchText)">
            Search
          </button>
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

const ipfsURI = "http://127.0.0.1:8081/ipfs";

export default {
  name: "Posts",
  components: { Post },
  data() {
    return {
      posts: [],
      searchText: "",
    };
  },
  async mounted() {
    this.posts = await this.addPosts();
  },

  methods: {
    async addPosts() {
      const posts = await this.getPosts();

      const postsforUi = [];
      for (let i in posts) {
        const post = posts[i];
        const owner = post["owner"];
        const contentHash = post["content"];
        const id = post["id"];

        const ipfsData = await this.getIpfsPost(contentHash);
        const imageUrl = `${ipfsURI}/${ipfsData["images"][0]}`;

        postsforUi.push({
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

      return postsforUi;
    },

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

    async search(searchText) {
      console.log(searchText);
      const postsCopy = await this.addPosts();

      let newPosts = [];
      if (!searchText.empty) {
        for (const i in postsCopy) {
          if (
            postsCopy[i].title.includes(searchText) ||
            postsCopy[i].tags.includes(searchText)
          ) {
            newPosts.push(postsCopy[i]);
          }
        }
      }
      console.log(newPosts);
      this.posts = newPosts;
    },
  },
};
</script>

<style scoped>
</style>