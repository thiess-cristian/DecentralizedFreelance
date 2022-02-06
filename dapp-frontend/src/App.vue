<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
  },
};
</script>

<style></style>
