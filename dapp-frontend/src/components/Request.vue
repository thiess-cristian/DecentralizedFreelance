<template>
  <div class="box">
    <div class="block">
      <div class="title">{{ title }}</div>
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
const ipfsURI = "https://ipfs.io/ipfs";

export default {
  name: "Request",
  data() {
    return {
      displayDescription: false,
      title: "",
      price: "",
      requestDescription: "",
    };
  },
  props: {
    owner: String,
    post: String,
    request: String,
  },
  async mounted() {
    const dataFromPost = await this.getRequestFromIpfs(this.$props.post);
    const dataFromRequest = await this.getRequestFromIpfs(this.$props.request);

    this.title = dataFromPost["title"];
    this.price = dataFromPost["price"];
    this.requestDescription = dataFromRequest["request"];
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