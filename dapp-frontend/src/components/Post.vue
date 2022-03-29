<template>
  <div class="card">
    <div class="card-content">
      <div class="title is-size-4">{{ title }}</div>
      <div class="card-image">
        <img src="../assets/logo.png" />
      </div>
      <div class="block">
        <p>price: {{ price }}</p>
      </div>
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
        <router-link to="/post" class="has-text-grey">info</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    id: Number,
    title: String,
    description: String,
    price: String,
  },
};
</script>

<style scoped>
</style>