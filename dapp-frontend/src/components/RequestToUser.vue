<template>
  <div class="columns">
    <div class="column">
      <Request
        :userAddress="postOwnerAdddress"
        :postIpfsAddress="postIpfsAddress"
        :requestIpfsAddress="requestIpfsAddress"
      />
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

export default {
  name: "RequestToUser.vue",
  components: {
    Request,
  },
  props: {
    postOwnerAdddress: String,
    postIpfsAddress: String,
    requestIpfsAddress: String,
  },
  methods: {
    async downloadFile() {
      const data = await this.getFileHash();
      console.log(data[0]);

      await this.downloadFromIpfs(data[0]["file"]);
    },

    async downloadFromIpfs(hash) {
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