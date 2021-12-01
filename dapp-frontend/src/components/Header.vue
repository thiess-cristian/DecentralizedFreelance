<template>
  <nav class="navbar has-shadow">
    <div class="navbar-brand py-2 px-2">
      <a class="navbar-item" v-on:click="accessHome">LOGO</a>
    </div>
    <div class="navbar-end">
      <div class="container py-2 px-2">
        <button class="navbar-item button" v-on:click="createPost">Add</button>
        <button class="navbar-item button">Connect</button>
        <button class="navbar-item button" v-on:click="accessAccount">
          Account
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    createPost: function () {
      this.$router.push("/create_post");
    },
    accessAccount: function () {
      this.$router.push("/account");
    },
    accessHome: function () {
      this.$router.push("/");
    },
  },
};
</script>


<style scoped>
</style>