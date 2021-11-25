<template>
  <div class="create-post-container">
    <div class="create-post-title">Create a post</div>
    <form action="" method="post">
      title
      <input type="text" />
      description
      <textarea class="post-description"></textarea>
      token price
      <input type="number" />
      upload image
      <input type="file" id="file" ref="file" />
      <input type="submit" value="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
};
</script>

<style scoped>
.create-post-container {
  display: flex;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: center;
  align-self: center;
}

.post-description {
  height: 100px;
}
</style>