<template>
  <div class="columns">
    <div class="column is-size-6">
      <Request
        :userAddress="clientAddress"
        :postIpfsAddress="postIpfsAddress"
        :requestIpfsAddress="requestIpfsAddress"
        requestType="FromUser"
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

      <button class="button is-success" @click="submitFile">
        <span class="icon">
          <i class="fas fa-check-circle"></i>
        </span>
        <span> Submit </span>
      </button>
    </div>
  </div>
</template>

<script>
import Request from "./Request.vue";

import { fileManagerAddress } from "../../config";
import FileManager from "../../artifacts/contracts/FileManager.sol/FileManager.json";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";

import { getPublicKey } from "../utils/utils";

//const metamaskUtil = require("@metamask/eth-sig-util");
const ascii85 = require("ascii85");
//var fs = require("fs");

import axios from "axios";

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
    async submitFileToIpfs(encryptedFile) {
      const client = create("http://127.0.0.1:5001");
      try {
        const file = await client.add(JSON.stringify(encryptedFile));
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
        await contract.createFile("user", this.requestIpfsAddress, hash);
      } catch (error) {
        console.log(error);
      }

      return hash;
    },

    fileChange(e) {
      this.file = e.target.files[0];
    },

    async normalDecrypt(address, encrypted) {
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

      return ascii85.decode(decrypt);
    },

    async encryptFile() {
      const publicKey = await getPublicKey(this.clientAddress);
      console.log("key", publicKey);
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("publicKey", publicKey);
      const response = await axios
        .post("/file/encrypt2", formData)
        .then((response) => {
          return response;
        });

      return response.data.encrypted;
    },

    async submitFile() {
      const encryptedFile = await this.encryptFile();
      const ipfsHash = await this.submitFileToIpfs(encryptedFile);
      console.log(ipfsHash);

      await this.submitIpfsHashToBlockchain(ipfsHash);

      // const decrypted = await this.normalDecrypt(this.clientAddress, data);

      // const bytes = new Uint8Array(decrypted);
      // const blob = new Blob([bytes]);
      // const link = document.createElement("a");
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "test.png";

      // document.body.appendChild(link);

      // link.click();

      // document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
</style>