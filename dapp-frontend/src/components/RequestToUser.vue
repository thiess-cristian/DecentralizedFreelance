<template>
  <div class="columns">
    <div class="column">
      <Request
        :userAddress="postOwnerAdddress"
        :postIpfsAddress="postIpfsAddress"
        :requestIpfsAddress="requestIpfsAddress"
        requestType="ToUser"
      />
    </div>
    <div class="column">
      <div>{{ downloadMessage }}</div>
      <button
        id="downloadButton"
        class="button is-success"
        :disabled="disableButton"
        @click="downloadFile"
      >
        <span class="icon">
          <i class="fas fa-download"></i>
        </span>
        <span> Download </span>
      </button>
    </div>
  </div>
</template>

<script>
import Request from "./Request.vue";

import { fileManagerAddress, paymentServiceAddress } from "../../config";
import FileManager from "../../artifacts/contracts/FileManager.sol/FileManager.json";
import PaymentService from "../../artifacts/contracts/PaymentService.sol/PaymentService.json";
import { ethers } from "ethers";

const ascii85 = require("ascii85");

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
  data() {
    return {
      downloadMessage: "cant",
    };
  },
  async mounted() {
    this.downloadMessage = (await this.canBeDownloaded())
      ? "File can be downloaded"
      : "File can't be downloaded";
  },
  computed: {
    disableButton() {
      return this.downloadMessage == "File can't be downloaded";
    },
  },
  methods: {
    async canBeDownloaded() {
      return (await this.getFileHash()) != null;
    },

    async decryptFile(address, encrypted) {
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

    async downloadFile() {
      await this.doPayment(this.postOwnerAdddress);
      const dataHash = await this.getFileHash();

      const data = await this.getDataFromIpfs(dataHash);
      const decrypted = await this.decryptFile(
        this.$store.state.user.address,
        data
      );
      console.log(decrypted);
      const bytes = new Uint8Array(decrypted);
      const blob = new Blob([bytes]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "test.png";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    },

    getIpfsURL(hash) {
      const ipfsURI = "http://127.0.0.1:8081/ipfs";
      const ipfsUrl = `${ipfsURI}/${hash}`;

      return ipfsUrl;
    },

    async getDataFromIpfs(hash) {
      const ipfsUrl = this.getIpfsURL(hash);
      const response = await fetch(ipfsUrl);
      const data = await response.json();
      console.log(data);
      return data;
    },

    async downloadFromIpfs(hash) {
      const ipfsUrl = this.getIpfsURL(hash);

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
      try {
        const data = await contract.getFile(this.requestIpfsAddress);
        console.log(data);
        return data.file;
      } catch (error) {
        return null;
      }
    },

    async getPaymentAmmount(requestIpfsHash) {
      const ipfsUrl = this.getIpfsURL(requestIpfsHash);

      const response = await fetch(ipfsUrl);
      const data = await response.json();
      console.log(data);
      return data["price"];
    },

    async doPayment(address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        paymentServiceAddress,
        PaymentService.abi,
        signer
      );

      const price = await this.getPaymentAmmount(this.postIpfsAddress);

      const options = { value: ethers.utils.parseEther(String(price)) };
      await contract.sendBal(address, options);
    },
  },
};
</script>

<style scoped>
</style>