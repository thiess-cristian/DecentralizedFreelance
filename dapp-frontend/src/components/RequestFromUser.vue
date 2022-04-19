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

import { getPublicKey } from "../utils/utils";

const metamaskUtil = require("@metamask/eth-sig-util");
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

    async encryptData(publicKey, data) {
      // Returned object contains 4 properties: version, ephemPublicKey, nonce, ciphertext
      // Each contains data encoded using base64, version is always the same string
      const enc = metamaskUtil.encrypt({
        publicKey: publicKey.toString("base64"),
        data: ascii85.encode(data).toString(),
        version: "x25519-xsalsa20-poly1305",
      });

      // We want to store the data in smart contract, therefore we concatenate them
      // into single Buffer
      const buf = Buffer.concat([
        Buffer.from(enc.ephemPublicKey, "base64"),
        Buffer.from(enc.nonce, "base64"),
        Buffer.from(enc.ciphertext, "base64"),
      ]);

      // In smart contract we are using `bytes[112]` variable (fixed size byte array)
      // you might need to use `bytes` type for dynamic sized array
      // We are also using ethers.js which requires type `number[]` when passing data
      // for argument of type `bytes` to the smart contract function
      // Next line just converts the buffer to `number[]` required by contract function
      // THIS LINE IS USED IN OUR ORIGINAL CODE:
      // return buf.toJSON().data;

      // Return just the Buffer to make the function directly compatible with decryptData function
      return buf;
    },
    async decryptFile(address, data) {
      const structuredData = {
        version: "x25519-xsalsa20-poly1305",
        ephemPublicKey: data.slice(0, 32).toString("base64"),
        nonce: data.slice(32, 56).toString("base64"),
        ciphertext: data.slice(56).toString("base64"),
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

    async submitFile() {
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

      const decrypted = await this.normalDecrypt(
        this.clientAddress,
        response.data.encrypted
      );
      console.log(decrypted);

      const bytes = new Uint8Array(decrypted);
      //console.log("decrypted file", decrypted);
      const blob = new Blob([bytes]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "test.png";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    },
    async initialTry() {
      const publicKey = await getPublicKey(this.clientAddress);
      console.log("key", publicKey);
      //const publicKeyBuffer = Buffer.from(publicKey, "base64");
      // const buffer = fs.readFileSync(this.file, "utf8");
      // const buffer = await fetch(this.file)
      //   .then((response) => response.getAsBinary())
      //   .then((buf) => {
      //     return buf;
      //   });
      //const buffer = this.file.getAsBinary();
      // console.log(buffer);
      // const crypted = await this.encryptFile(publicKeyBuffer, buffer);
      // console.log(decrypted.toString());
      //const ipfsFile = await this.submitFileToIpfs();
      //this.submitIpfsHashToBlockchain(ipfsFile);
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("publicKey", publicKey);

      const file = await axios
        .post("/file/encrypt", formData)
        .then((response) => {
          return response;
          //const bytes = new Uint8Array(response.data);

          // console.log(bytes);
        });

      console.log("original file", file);
      const publicKeyBuffer = Buffer.from(publicKey, "base64");
      const cryptedFile = await this.encryptData(
        publicKeyBuffer,
        file.data.original.buffer.data
      );
      console.log("crypted", cryptedFile);
      console.log("server crypted", file.data.encrypted);
      const lenght = Object.keys(file.data.encrypted).length;
      let encryptedArray = new Uint8Array(lenght);
      console.log("length", lenght);
      for (let i = 0; i < lenght; i++) {
        encryptedArray[i] = file.data.encrypted[i];
      }
      console.log(encryptedArray);
      const decrypted = await this.decryptFile(
        this.clientAddress,
        encryptedArray
      );

      const bytes = new Uint8Array(decrypted);
      //console.log("decrypted file", decrypted);
      const blob = new Blob([bytes]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "test.png";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
</style>