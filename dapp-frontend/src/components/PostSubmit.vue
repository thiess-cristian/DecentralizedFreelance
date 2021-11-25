<template>
  <div class="main-container">
    <div class="post-container">
      <div class="title">title</div>
      <InfoSection />
      <div class="description">description</div>
    </div>
    <div class="submit-container">
      <div class="submit-title">Submit Request</div>
      <div class="submit-form">
        <form action="">
          <textarea rows="10" cols="50"></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
      <div class="price">price</div>
    </div>
  </div>
</template>

<script>
import InfoSection from "./InfoSection.vue";

export default {
  name: "PostSubmit",
  components: {
    InfoSection,
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
}

.post-container {
  width: 50%;
}

.submit-container {
  width: 50%;
}
</style>