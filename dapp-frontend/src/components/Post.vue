<template>
  <div class="post-container">
    <div class="post-title">
      <router-link to="/post">title</router-link>
    </div>
    <div class="image">
      <img src="../assets/logo.png" />
    </div>
    <div class="price">starting from 10</div>
  </div>
</template>

<script>
export default {
  name: "Post",
};
</script>

<style>
img {
  width: 100px;
  height: auto;
}

.post-container {
  width: 170px;
  height: auto;
  background-color: chocolate;
  margin-top: 80px;
  margin-bottom: 80px;
  border-width: 1px;
  border-style: solid;
  border-color: cornflowerblue;
}
</style>