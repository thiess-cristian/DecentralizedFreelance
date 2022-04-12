<template>
  <div class="container">
    <div class="box">
      <div class="title">{{ title }}</div>
      <div class="columns">
        <div class="column">
          <InfoSection :image="image" :images="images" />
        </div>
        <div class="column">
          <div class="block">
            <div class="title">Description:</div>
            <div class="description">{{ description }}</div>
          </div>
          <div class="block">
            <div class="title">Price:</div>
            <div class="price">{{ price }}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="block">
          <div class="title">Your request</div>
        </div>
        <div class="block">
          <textarea
            class="textarea"
            v-model="request"
            placeholder="e.g. Hello world"
          ></textarea>
        </div>
        <div class="block">
          <button class="button is-primary" @click="submitRequest">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoSection from "../components/InfoSection.vue";

import { postsManagerAddress, requestManagerAddress } from "../../config";
import RequestManager from "../../artifacts/contracts/RequestManager.sol/RequestManager.json";
import PostManager from "../../artifacts/contracts/PostsManager.sol/PostsManager.json";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";

const ipfsURI = "http://127.0.0.1:8081/ipfs";

export default {
  name: "PostSubmit",
  components: {
    InfoSection,
  },
  data() {
    return {
      title: "",
      image: "",
      images: [],
      price: "",
      description: "",
      request: "",
    };
  },
  async mounted() {
    const post = await this.getIpfsPost(this.$route.params.id);

    this.title = post["title"];
    const imageURL = `${ipfsURI}/${post["images"][0]}`;
    this.image = imageURL;
    this.price = post["price"];
    this.description = post["description"];

    for (let i in post["images"]) {
      this.images.push(`${ipfsURI}/${post["images"][i]}`);
    }
  },
  methods: {
    async getIpfsPost(id) {
      const ipfsUrl = `${ipfsURI}/${id}`;
      const response = await fetch(ipfsUrl);
      const data = await response.json();
      return data;
    },

    async saveRequestToIpfs() {
      const client = create("http://127.0.0.1:5001");

      try {
        const requestIpfs = await client.add(
          JSON.stringify({
            request: this.request,
            postHash: this.$route.params.id,
          })
        );
        return requestIpfs.path;
      } catch (error) {
        console.log(error);
      }
    },

    async getPostOwner(ipfsHash) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        postsManagerAddress,
        PostManager.abi,
        signer
      );

      try {
        const post = await contract.fetchPost(ipfsHash);
        const postOwner = post["owner"];

        return postOwner;
      } catch (error) {
        console.log(error);
      }
    },

    async saveRequestToBlockchain(ipfsHash) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        requestManagerAddress,
        RequestManager.abi,
        signer
      );

      try {
        const postHash = this.$route.params.id;
        const postOwner = await this.getPostOwner(postHash);

        await contract.createRequest(postHash, ipfsHash, postOwner);
      } catch (error) {
        console.log(error);
      }
    },

    async submitRequest() {
      const ipfsHash = await this.saveRequestToIpfs();
      await this.saveRequestToBlockchain(ipfsHash);
    },
  },
};
</script>

<style scoped>
</style>