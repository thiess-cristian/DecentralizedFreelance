<template>
  <div class="columns">
    <div class="column">
      <Request :owner="owner" :post="post" :request="request" />
    </div>
    <div class="column">
      <button class="button" @click="downloadFile">download</button>
      <div class="accepted-symbol">symbol</div>
    </div>
  </div>
</template>

<script>
import Request from "./Request.vue";

import { fileManagerAddress } from "../../config";
import FileManager from "../../artifacts/contracts/FileManager.sol/FileManager.json";
import { ethers } from "ethers";

//import { create } from "ipfs-http-client";

export default {
  name: "RequestToUser.vue",
  components: {
    Request,
  },
  props: {
    owner: String,
    post: String,
    request: String,
  },
  methods: {
    async downloadFile() {
      //console.log(this.owner);
      //console.log(this.post);
      //console.log(this.request);

      const data = await this.getFileHash();
      console.log(data[0]);

      await this.downloadFromIpfs(data[0]["file"]);
    },

    async downloadFromIpfs(hash) {
      //const client = create("https://ipfs.infura.io:5001/api/v0");
      console.log("hash", hash);
      const ipfsURI = "https://ipfs.io/ipfs";
      const ipfsUrl = `${ipfsURI}/${hash}`;
      fetch(ipfsUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "test";
          link.click();
        });
    },

    async getFileHash() {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        fileManagerAddress,
        FileManager.abi,
        provider
      );

      const data = await contract.getAllFiles();
      return data;
    },
  },
};
</script>

<style scoped>
</style>