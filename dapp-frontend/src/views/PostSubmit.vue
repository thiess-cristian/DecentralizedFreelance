<template>
  <div class="container">
    <div class="box">
      <div class="title">{{ title }}</div>
      <div class="columns">
        <div class="column">
          <InfoSection :image="image" />
        </div>
        <div class="column">
          <div class="description">{{ description }}</div>
          <div class="price">{{ price }}</div>
          <div class="title">submit request</div>
        </div>
      </div>
      <div>
        <textarea
          class="textarea"
          v-model="request"
          placeholder="e.g. Hello world"
        ></textarea>
        <button class="button is-primary" @click="submitRequest">submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import InfoSection from "../components/InfoSection.vue";

import { requestManagerAddress } from "../../config";
import RequestManager from "../../artifacts/contracts/RequestManager.sol/RequestManager.json";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";

const ipfsURI = "https://ipfs.io/ipfs";

export default {
  name: "PostSubmit",
  components: {
    InfoSection,
  },
  data() {
    return {
      title: "",
      image: "",
      price: "",
      description: "",
      request: "",
    };
  },
  mounted() {
    const post = this.getIpfsPost(this.$route.params.id);
    Promise.resolve(post).then((post) => {
      this.title = post["title"];
      const imageURL = `${ipfsURI}/${post["image"]}`;
      this.image = imageURL;
      this.price = post["price"];
      this.description = post["description"];
      console.log(post);
    });
  },
  methods: {
    async getIpfsPost(id) {
      const ipfsUrl = `${ipfsURI}/${id}`;
      const response = await fetch(ipfsUrl);
      const data = await response.json();
      console.log(data);
      return data;
    },

    async saveRequestToIpfs() {
      const client = create("https://ipfs.infura.io:5001/api/v0");

      try {
        const requestIpfs = await client.add(
          JSON.stringify({
            request: this.request,
            postHash: this.$route.params.id,
          })
        );
        console.log(requestIpfs.path);
        return requestIpfs.path;
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
        await contract.createRequest(this.$route.params.id, ipfsHash);
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