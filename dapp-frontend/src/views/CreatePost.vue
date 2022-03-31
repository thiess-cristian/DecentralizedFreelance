<template>
  <div class="container">
    <div class="box">
      <div class="title">Create a post</div>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input type="text" class="input" v-model="title" />
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input type="text" class="input" v-model="description" />
        </div>
      </div>
      <div class="field">
        <label class="label">Price</label>
        <div class="control">
          <input type="number" class="input" v-model="price" />
        </div>
      </div>
      <div class="field">
        <div class="file has-name">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="resume"
              @change="uploadImage"
            />
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
        <button class="button" @click="createPost">submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { postsManagerAddress } from "../../config";
import PostsManager from "../../artifacts/contracts/PostsManager.sol/PostsManager.json";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";

export default {
  name: "CreatePost",
  data() {
    return {
      postData: "",
      title: "",
      price: "",
      description: "",
      image: "",
      client: "",
    };
  },
  mounted() {
    this.client = create("https://ipfs.infura.io:5001/api/v0");
  },
  methods: {
    async createPost() {
      const ipfsHash = await this.savePostToIpfs();
      await this.savePostToBlockchain(ipfsHash);
    },
    async savePostToIpfs() {
      try {
        const image = await this.client.add(this.image);
        const file = await this.client.add(
          JSON.stringify({
            title: this.title,
            description: this.description,
            price: this.price,
            image: image.path,
          })
        );
        return file.path;
      } catch (error) {
        console.log(error);
      }
    },
    async savePostToBlockchain(ipfsHash) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        postsManagerAddress,
        PostsManager.abi,
        signer
      );

      try {
        await contract.createPost(this.title, ipfsHash);
      } catch (error) {
        console.log(error);
      }
    },

    uploadImage(e) {
      const image = e.target.files[0];
      this.image = image;
    },
  },
};
</script>

<style scoped>
</style>