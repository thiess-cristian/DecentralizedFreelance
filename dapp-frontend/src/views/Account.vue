<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column">
          <p class="title">Name: {{ name }}</p>
          <input
            class="input"
            type="text"
            placeholder="Name"
            v-model="inputName"
          />
          <button class="button" @click="saveNewName">Save</button>
          <p class="title">Address: {{ $store.state.user.address }}</p>
        </div>
        <div class="column">
          <router-link class="button" to="/mining"> Mining </router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="tabs is-boxed">
        <ul>
          <li id="reqTofulfil" class="is-active" data-target="product-details">
            <a v-on:click="displayRequestFromUserFunction"
              >Requests to fulfil</a
            >
          </li>
          <li id="reqFulfiled" data-target="delivery-info">
            <a v-on:click="displayRequestToUserFunction">Requests fulfiled</a>
          </li>
        </ul>
      </div>

      <div id="tab-content">
        <div v-if="displayRequestFromUser" class="requests-to-fulfil">
          <div v-for="request in requestsFromUser" v-bind:key="request.id">
            <RequestFromUser
              :clientAddress="request.ownerAddress"
              :postIpfsAddress="request.postIpfsAddress"
              :requestIpfsAddress="request.requestIpfsAddress"
            />
          </div>
        </div>

        <div v-if="displayRequestToUser" class="requests-fulfiled">
          <div v-for="request in requestsToUser" v-bind:key="request.id">
            <RequestToUser
              :postOwnerAdddress="request.ownerAddress"
              :postIpfsAddress="request.postIpfsAddress"
              :requestIpfsAddress="request.requestIpfsAddress"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import RequestToUser from "../components/RequestToUser.vue";
import RequestFromUser from "../components/RequestFromUser.vue";

import UserProfileManager from "../../artifacts/contracts/UserProfileManager.sol/UserProfileManager.json";
import RequestManager from "../../artifacts/contracts/RequestManager.sol/RequestManager.json";
import { ethers } from "ethers";
import { userProfileManagerAddress, requestManagerAddress } from "../../config";

export default {
  name: "Account",
  components: {
    RequestToUser,
    RequestFromUser,
  },
  data() {
    return {
      displayRequestToUser: false,
      displayRequestFromUser: true,
      name: "",
      inputName: "",
      requestsFromUser: [],
      requestsToUser: [],
    };
  },
  async mounted() {
    this.getSavedName();

    this.requestsToUser = await this.getRequestsToUser();
    this.requestsFromUser = await this.getRequestsFromUser();
  },
  methods: {
    displayRequestFromUserFunction() {
      const tab1 = document.getElementById("reqTofulfil");
      tab1.classList.toggle("is-active");

      const tab2 = document.getElementById("reqFulfiled");
      tab2.classList.toggle("is-active");

      this.displayRequestToUser = false;
      this.displayRequestFromUser = true;
    },
    displayRequestToUserFunction() {
      const tab1 = document.getElementById("reqTofulfil");
      tab1.classList.toggle("is-active");

      const tab2 = document.getElementById("reqFulfiled");
      tab2.classList.toggle("is-active");

      this.displayRequestToUser = true;
      this.displayRequestFromUser = false;
    },

    async saveNewName() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        userProfileManagerAddress,
        UserProfileManager.abi,
        signer
      );

      try {
        const newUser = await contract.createUser(this.inputName);
        console.log(newUser);
      } catch (error) {
        console.log(error);
      }
    },

    async getSavedName() {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        userProfileManagerAddress,
        UserProfileManager.abi,
        provider
      );

      const userAddress = this.$store.state.user.address;
      const user = await contract.fetchUser(userAddress);

      this.name = user.name;
    },

    async getRequestsToUser() {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        requestManagerAddress,
        RequestManager.abi,
        provider
      );
      const userAddress = this.$store.state.user.address;
      const data = await contract.getRequestsMadeForUser(userAddress);
      let returnedData = [];
      for (let entry in data) {
        returnedData.push({
          ownerAddress: data[entry]["postOwnerAddress"],
          postIpfsAddress: data[entry]["post"],
          requestIpfsAddress: data[entry]["request"],
        });
      }

      return returnedData;
    },
    async getRequestsFromUser() {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        requestManagerAddress,
        RequestManager.abi,
        provider
      );
      const userAddress = this.$store.state.user.address;
      const data = await contract.getRequestsMadeByUser(userAddress);

      console.log(data);

      let returnedData = [];
      for (let entry in data) {
        returnedData.push({
          ownerAddress: data[entry]["clientAddress"],
          postIpfsAddress: data[entry]["post"],
          requestIpfsAddress: data[entry]["request"],
        });
      }

      return returnedData;
    },
  },
};
</script>

<style scoped>
</style>