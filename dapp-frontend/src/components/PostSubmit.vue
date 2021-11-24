<template>
  <div class="post-container">
    <div class="title">title</div>
    <InfoSection />
    <div class="description">description</div>
  </div>

  <div class="submit-container">
    <div class="submit-title">Submit Request</div>
    <div class="submit-form">
      <form action="">
        <label for="description">Request description:</label><br />
        <input type="text" id="description" name="description" /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
    <div class="price">price</div>
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

<style>
</style>