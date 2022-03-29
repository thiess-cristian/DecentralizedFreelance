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
            <a v-on:click="displayRequestsToFulfilFunction"
              >Requests to fulfil</a
            >
          </li>
          <li id="reqFulfiled" data-target="delivery-info">
            <a v-on:click="displayRequestsFulfiledFunction"
              >Requests fulfiled</a
            >
          </li>
        </ul>
      </div>

      <div id="tab-content">
        <div v-if="displayRequestsToFulfil" class="requests-to-fulfil">
          <RequestToFulfil />
          <RequestToFulfil />
          <RequestToFulfil />
        </div>

        <div v-if="displayRequestsFulfiled" class="requests-fulfiled">
          <RequestFulfiled />
          <RequestFulfiled />
          <RequestFulfiled />
          <RequestFulfiled />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import RequestToFulfil from "../components/RequestToFulfil.vue";
import RequestFulfiled from "../components/RequestFulfiled.vue";

import UserProfileManager from "../../artifacts/contracts/UserProfileManager.sol/UserProfileManager.json";
import { ethers } from "ethers";
import { userProfileManagerAddress } from "../../config";

export default {
  name: "Account",
  components: {
    RequestToFulfil,
    RequestFulfiled,
  },
  data() {
    return {
      displayRequestsToFulfil: true,
      displayRequestsFulfiled: false,
      name: "",
    };
  },
  mounted() {
    this.getSavedName();
  },
  methods: {
    displayRequestsToFulfilFunction: function () {
      const tab1 = document.getElementById("reqTofulfil");
      tab1.classList.toggle("is-active");

      const tab2 = document.getElementById("reqFulfiled");
      tab2.classList.toggle("is-active");

      this.displayRequestsToFulfil = true;
      this.displayRequestsFulfiled = false;
    },
    displayRequestsFulfiledFunction: function () {
      const tab1 = document.getElementById("reqTofulfil");
      tab1.classList.toggle("is-active");

      const tab2 = document.getElementById("reqFulfiled");
      tab2.classList.toggle("is-active");

      this.displayRequestsToFulfil = false;
      this.displayRequestsFulfiled = true;
    },

    saveNewName: async function () {
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

    getSavedName: async function () {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        userProfileManagerAddress,
        UserProfileManager.abi,
        provider
      );

      console.log(contract);
      console.log(this.$store.state.user.address);
      const userAddress = this.$store.state.user.address;
      const user = await contract.fetchUser(userAddress);

      this.name = user.name;
    },
  },
};
</script>

<style scoped>
</style>