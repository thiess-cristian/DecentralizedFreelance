<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
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
              <textarea type="text" class="textarea" v-model="description" />
            </div>
          </div>
          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input type="text" class="input" v-model="tagsInput" />
            </div>
          </div>
          <div class="field">
            <label class="label">Price</label>
            <div class="control">
              <input type="number" class="input" v-model="price" />
            </div>
          </div>
          <div class="field">
            <label class="label">Images</label>
            <ul class="block">
              <li v-for="image in images" :key="image.message">
                <div class="block">
                  <span class="tag is-success">
                    {{ image.name }}
                    <button
                      class="delete is-small"
                      @click="removeImage(image)"
                    ></button>
                  </span>
                </div>
              </li>
            </ul>
            <div class="file">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  name="resume"
                  @change="uploadImage"
                />
                <span class="file-cta">
                  <span class="file-label"> Choose a file… </span>
                </span>
              </label>
            </div>
          </div>
          <div class="mt-6 has-text-centered">
            <button class="button is-primary" @click="createPost">
              Submit
            </button>
          </div>
        </div>
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
      images: [],
      tagsInput: "",
      tags: [],
    };
  },
  mounted() {},
  methods: {
    async createPost() {
      const ipfsHash = await this.savePostToIpfs();
      await this.savePostToBlockchain(ipfsHash);
    },
    async savePostToIpfs() {
      try {
        const client = create("https://ipfs.infura.io:5001/api/v0");

        let ipfsImages = [];
        for (let i in this.images) {
          const ipfsImage = await client.add(this.images[i]);
          ipfsImages.push(ipfsImage.path);
        }

        this.createTags();
        const file = await client.add(
          JSON.stringify({
            title: this.title,
            description: this.description,
            tags: this.tags,
            price: this.price,
            images: ipfsImages,
          })
        );

        console.log(file);

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

    createTags() {
      this.tags = this.tagsInput.replaceAll(" ", "").split(",");
    },
    uploadImage(e) {
      const image = e.target.files[0];

      this.images.push(image);
      console.log(this.images);
      this.image = image;
    },

    removeImage(image) {
      this.images.splice(this.images.indexOf(image), 1);
    },
  },
};
</script>

<style scoped>
</style>