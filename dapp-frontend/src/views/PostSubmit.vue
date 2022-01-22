<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6">
        <div class="title">title</div>
        <InfoSection class="pr-6" />
        <div class="description">description</div>
        <div class="price">price</div>
      </div>
      <div class="column is-6">
        <div class="title">submit request</div>
        <form action="">
          <textarea class="textarea" placeholder="e.g. Hello world"></textarea>
          <button class="button is-primary">submit</button>
        </form>
      </div>
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