<template>
  <div class="container">
    <div class="box">
      <div class="title">title</div>
      <div class="columns">
        <div class="column">
          <InfoSection />
        </div>
        <div class="column">
          <div class="description">description</div>
          <div class="price">price</div>
          <div class="title">submit request</div>
        </div>
      </div>
      <form action="">
        <textarea class="textarea" placeholder="e.g. Hello world"></textarea>
        <button class="button is-primary">submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import InfoSection from "../components/InfoSection.vue";

export default {
  name: "PostSubmit",
  components: {
    InfoSection,
  },
};
</script>

<style scoped>
</style>