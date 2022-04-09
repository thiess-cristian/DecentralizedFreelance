<template>
  <nav class="navbar has-shadow">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/"> Home </router-link>
    </div>
    <div class="navbar-end">
      <div class="buttons">
        <router-link
          class="navbar-item button"
          to="/create_post"
          v-if="$store.state.isAuthenticated"
        >
          Create Post
        </router-link>
        <button
          class="navbar-item button"
          v-if="!$store.state.isAuthenticated"
          @click="connect"
        >
          Connect
        </button>
        <button
          class="navbar-item button"
          v-if="$store.state.isAuthenticated"
          @click="disconnect"
        >
          Disconnect
        </button>
        <router-link
          class="navbar-item button"
          to="/account"
          v-if="$store.state.isAuthenticated"
        >
          {{ $store.state.user.address }}
        </router-link>
      </div>
    </div>
  </nav>
  <div id="notification" class="notification is-warning">
    <button class="delete" @click="removeNotification"></button>
    <div class="has-text-centered">Please install Metamask</div>
  </div>
</template>

<script>
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

export default {
  name: "Header",
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      const notification = document.getElementById("notification");
      notification.classList.add("is-hidden");
    }

    const address = localStorage.getItem("address");

    if (address != "") {
      this.$store.commit("setAddress", address);
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

      console.log(accounts);

      this.$store.commit("setAddress", accounts[0]);
    },

    disconnect() {
      this.$store.commit("removeToken");
      this.$store.commit("removeAddress");
      localStorage.setItem("address", "");
    },
    removeNotification() {
      const notification = document.getElementById("notification");
      notification.classList.add("is-hidden");
    },
  },
};
</script>


<style scoped>
</style>