<template>
  <div class="card">
    <div class="card-content">
      <div class="title is-size-4">{{ title }}</div>
      <div class="card-image">
        <img :src="imageUrl" />
      </div>
      <div class="block">
        <p>price: {{ price }}</p>
      </div>
      <div>Made by: {{ userName }}</div>
      <div class="block">
        <div>Tags:</div>
        <div class="tags">
          <div class="tag" v-for="tag in tags" v-bind:key="tag">{{ tag }}</div>
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
import { getUsername } from "../utils/utils";

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
    tags: Array,
  },
  data() {
    return {
      userName: "",
    };
  },
  async mounted() {
    this.userName = await getUsername(this.$props.userAddress);
  },
};
</script>

<style scoped>
</style>