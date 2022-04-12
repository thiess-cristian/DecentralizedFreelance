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

import { fileManagerAddress, paymentServiceAddress } from "../../config";
import FileManager from "../../artifacts/contracts/FileManager.sol/FileManager.json";
import PaymentService from "../../artifacts/contracts/PaymentService.sol/PaymentService.json";
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
      await this.doPayment(this.postOwnerAdddress);
      //const data = await this.getFileHash();
      //await this.downloadFromIpfs(data[0]["file"]);
    },

    getIpfsURL(hash) {
      const ipfsURI = "http://127.0.0.1:8081/ipfs";
      const ipfsUrl = `${ipfsURI}/${hash}`;

      return ipfsUrl;
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

      const data = await contract.getAllFiles();
      return data;
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