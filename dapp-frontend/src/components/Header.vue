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
          Account
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
export default {
  name: "Header",
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      const notification = document.getElementById("notification");
      notification.classList.add("is-hidden");
    }
  },
  methods: {
    async connect() {
      const token = "";
      this.$store.commit("setToken", token);

      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        console.log(account);
        this.$store.commit("setAddress", account);
      }
    },

    disconnect() {
      this.$store.commit("removeToken");
      this.$store.coomit("removeAddress");
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