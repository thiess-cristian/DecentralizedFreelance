<template>
  <div class="card">
    <div class="card-content">
      <div class="title is-size-4">{{ title }}</div>
      <div class="card-image">
        img: {{ imageUrl }}
        <img :src="imageUrl" />
      </div>
      <div class="block">
        <p>price: {{ price }}</p>
      </div>
      <div>Made by: {{ userName }}</div>
      <div class="block">
        <div>Tags:</div>
        <div class="tags">
          <div class="tag">tag</div>
          <div class="tag">tag</div>
          <div class="tag">tag</div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <router-link
          :to="{ name: 'Post', params: { id: postAddress } }"
          class="has-text-grey"
          >info</router-link
        >
      </div>
    </footer>
  </div>
</template>

<script>
import UserProfileManager from "../../artifacts/contracts/UserProfileManager.sol/UserProfileManager.json";
import { ethers } from "ethers";
import { userProfileManagerAddress } from "../../config";

export default {
  name: "Post",
  props: {
    id: String,
    postAddress: String,
    title: String,
    description: String,
    price: String,
    userAddress: String,
    imageUrl: String,
  },
  data() {
    return {
      userName: "",
    };
  },
  async mounted() {
    this.getSavedName();
  },
  methods: {
    async getSavedName() {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        userProfileManagerAddress,
        UserProfileManager.abi,
        provider
      );

      const userAddress = this.$props.userAddress;
      const user = await contract.fetchUser(userAddress);

      this.userName = user.name;
    },
  },
};
</script>

<style scoped>
</style>