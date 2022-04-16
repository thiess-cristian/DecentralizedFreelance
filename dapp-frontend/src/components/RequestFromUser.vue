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

import { encrypt } from "@metamask/eth-sig-util";
const ascii85 = require("ascii85");
var fs = require("fs");

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

    async encryptFile(publicKey, data) {
      const enc = encrypt({
        publicKey: publicKey.toString("base64"),
        data: ascii85.encode(data).toString(),
        version: "x25519-xsalsa20-poly1305",
      });

      // const buf = Buffer.concat([
      //   Buffer.from(enc.ephemPublicKey, "base64"),
      //   Buffer.from(enc.nonce, "base64"),
      //   Buffer.from(enc.ciphertext, "base64"),
      // ]);

      return enc;
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
    async submitFile() {
      const publicKey = await getPublicKey(this.clientAddress);

      const publicKeyBuffer = Buffer.from(publicKey, "base64");

      const buffer = fs.readFileSync(this.file, "utf8");

      // const buffer = await fetch(this.file)
      //   .then((response) => response.getAsBinary())
      //   .then((buf) => {
      //     return buf;
      //   });
      //const buffer = this.file.getAsBinary();
      console.log(buffer);
      const crypted = await this.encryptFile(publicKeyBuffer, buffer);

      const decrypted = await this.decryptFile(this.clientAddress, crypted);
      console.log(decrypted.toString());
      //const ipfsFile = await this.submitFileToIpfs();
      //this.submitIpfsHashToBlockchain(ipfsFile);
    },
  },
};
</script>

<style scoped>
</style>