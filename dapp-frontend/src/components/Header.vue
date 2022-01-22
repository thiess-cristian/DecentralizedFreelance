<template>
  <nav class="navbar has-shadow">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/"> Home </router-link>
    </div>
    <div class="navbar-end">
      <div class="buttons">
        <router-link class="navbar-item button" to="/create_post">
          Create Post
        </router-link>
        <button class="navbar-item button">Connect</button>
        <router-link class="navbar-item button" to="/account">
          Account
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {},
};
</script>


<style scoped>
</style>