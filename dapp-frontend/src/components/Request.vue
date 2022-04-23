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
//const ascii85 = require("ascii85");
const ipfsURI = "http://127.0.0.1:8081/ipfs";

export default {
  name: "Request",
  data() {
    return {
      displayDescription: false,
      title: "",
      price: "",
      requestDescription: "",
      requestEncrypted: "",
      wasDecrypted: false,
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
    this.requestEncrypted = dataFromRequest["request"];

    this.userName = await getUsername(this.$props.userAddress);
  },
  methods: {
    async decryptRequest(address, encrypted) {
      const structuredData = {
        version: encrypted.version,
        ephemPublicKey: encrypted.ephemPublicKey,
        nonce: encrypted.nonce,
        ciphertext: encrypted.ciphertext,
      };

      const ct = `0x${Buffer.from(
        JSON.stringify(structuredData),
        "utf8"
      ).toString("hex")}`;

      const decrypt = await window.ethereum.request({
        method: "eth_decrypt",
        params: [ct, address],
      });

      this.wasDecrypted = true;
      return decrypt;
    },

    async displayDescriptionFunction() {
      this.displayDescription = !this.displayDescription;


      if (!this.wasDecrypted) {
        this.requestDescription = await this.decryptRequest(
          this.$store.state.user.address,
          this.requestEncrypted
        );
      }
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