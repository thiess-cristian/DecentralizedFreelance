<template>
  <nav class="navbar has-shadow">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">
        <span class="icon">
          <i class="fas fa-home"></i>
        </span>
        <span>Home</span>
      </router-link>
    </div>
    <div class="navbar-end">
      <div class="buttons">
        <router-link
          class="navbar-item button is-success"
          to="/create_post"
          v-if="$store.state.isAuthenticated"
          @click="checkForUsername"
        >
          <span class="icon">
            <i class="fas fa-solid fa-plus"></i>
          </span>
          <span> Create Post </span>
        </router-link>
        <button
          class="navbar-item button is-info"
          v-if="!$store.state.isAuthenticated"
          @click="connect"
        >
          <span class="icon">
            <i class="fas fa-address-card"></i>
          </span>
          <span> Connect </span>
        </button>
        <button
          class="navbar-item button"
          v-if="$store.state.isAuthenticated"
          @click="disconnect"
        >
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
          <span> Disconnect </span>
        </button>
        <router-link
          class="navbar-item button"
          to="/account"
          v-if="$store.state.isAuthenticated"
        >
          <span class="icon">
            <i class="fas fa-user-circle"></i>
          </span>
          <span> Account </span>
        </router-link>
      </div>
    </div>
  </nav>
  <div id="notification" class="notification is-warning">
    <button class="delete" @click="removeNotification"></button>
    <div class="has-text-centered">Please install Metamask</div>
  </div>

  <div v-if="checkForUsername()" class="notification is-warning">
    <div class="has-text-centered">Account name is not set</div>
  </div>
</template>

<script>
import { getUsername } from "../utils/utils";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

export default {
  name: "Header",
  data() {
    return {
      hasUserAccount: false,
    };
  },
  async mounted() {
    if (typeof window.ethereum !== "undefined") {
      const notification = document.getElementById("notification");
      notification.classList.add("is-hidden");
    }

    const address = localStorage.getItem("address");

    if (address != "") {
      this.$store.commit("setAddress", address);
    }
    const username = await getUsername(address);
    this.hasUserAccount = username != "";

    if (this.hasUserAccount) {
      this.$store.commit("setUsername", username);
    }
  },
  methods: {
    async getWeb3Modal() {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
            },
          },
        },
      });
      return web3Modal;
    },

    async connect() {
      const token = "";
      this.$store.commit("setToken", token);

      const web3Modal = await this.getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();

      localStorage.setItem("address", accounts[0]);
      this.$store.commit("setAddress", accounts[0]);
      this.$store.commit("setUsername", getUsername(accounts[0]));
    },

    disconnect() {
      this.$store.commit("removeToken");
      this.$store.commit("removeAddress");
      localStorage.setItem("address", "");

      this.$router.push("/");
    },
    removeNotification() {
      const notification = document.getElementById("notification");
      notification.classList.add("is-hidden");
    },
    checkForUsername() {
      if (this.$store.state.user.name != "") {
        return false;
      }

      return true;
    },
  },
};
</script>


<style scoped>
</style>