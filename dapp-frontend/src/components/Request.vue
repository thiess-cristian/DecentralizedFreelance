<template>
  <div class="box">
    <div class="block">
      <div class="title">{{ title }}</div>
    </div>
    <div class="block">
      <p>From: {{ userAddress }}</p>
      <p>Name: {{ userName }}</p>
    </div>
    <div class="block">
      <p>Price: {{ price }}</p>
    </div>
    <button class="button" v-on:click="displayDescriptionFunction">
      arrow
    </button>
    <div v-if="displayDescription">{{ requestDescription }}</div>
  </div>
</template>

<script>
import { getUsername } from "../utils/utils";

const ipfsURI = "http://127.0.0.1:8081/ipfs";

export default {
  name: "Request",
  data() {
    return {
      displayDescription: false,
      title: "",
      price: "",
      requestDescription: "",
      userName: "",
    };
  },
  props: {
    userAddress: String,
    postIpfsAddress: String,
    requestIpfsAddress: String,
  },
  async mounted() {
    const dataFromPost = await this.getRequestFromIpfs(
      this.$props.postIpfsAddress
    );
    const dataFromRequest = await this.getRequestFromIpfs(
      this.$props.requestIpfsAddress
    );

    this.title = dataFromPost["title"];
    this.price = dataFromPost["price"];
    this.requestDescription = dataFromRequest["request"];

    this.userName = await getUsername(this.$props.userAddress);
  },
  methods: {
    displayDescriptionFunction() {
      this.displayDescription = !this.displayDescription;
    },

    async getRequestFromIpfs(id) {
      const ipfsUrl = `${ipfsURI}/${id}`;
      const response = await fetch(ipfsUrl);
      const data = await response.json();

      return data;
    },
  },
};
</script>

<style>
</style>