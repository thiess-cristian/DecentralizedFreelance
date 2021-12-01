<template>
  <div class="column is-4-tablet is-3-desktop">
    <div class="card">
      <div class="card-content">
        <div class="title is-size-4">title</div>
        <div class="card-image">
          <img src="../assets/logo.png" />
        </div>
        <p>12.43</p>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <router-link to="/post" class="has-text-grey">info</router-link>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
};
</script>

<style scoped>
</style>