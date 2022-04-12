<template>
  <div class="columns">
    <div class="column is-size-6">
      <Request
        :userAddress="clientAddress"
        :postIpfsAddress="postIpfsAddress"
        :requestIpfsAddress="requestIpfsAddress"
      />
    </div>
    <div class="column is-size-6">
      <div class="file has-name">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="resume"
            @change="fileChange"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Choose a file… </span>
          </span>
          <span class="file-name"> ... </span>
        </label>
      </div>
      <div class="accepted-symbol">symbol</div>
      <button class="button" @click="submitFile">Submit</button>
    </div>
  </div>
</template>

<script>
import Request from "./Request.vue";

import { fileManagerAddress } from "../../config";
import FileManager from "../../artifacts/contracts/FileManager.sol/FileManager.json";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";

export default {
  name: "RequestFromUser",
  components: {
    Request,
  },
  props: {
    clientAddress: String,
    postIpfsAddress: String,
    requestIpfsAddress: String,
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    async submitFileToIpfs() {
      const client = create("http://127.0.0.1:5001");
      try {
        const file = await client.add(this.file);
        return file.path;
      } catch (error) {
        console.log(error);
      }
    },
    async submitIpfsHashToBlockchain(hash) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        fileManagerAddress,
        FileManager.abi,
        signer
      );

      try {
        await contract.createFile("user", "request", hash);
      } catch (error) {
        console.log(error);
      }

      return hash;
    },

    fileChange(e) {
      this.file = e.target.files[0];
    },
    async submitFile() {
      const ipfsFile = await this.submitFileToIpfs();
      this.submitIpfsHashToBlockchain(ipfsFile);
    },
  },
};
</script>

<style scoped>
</style>