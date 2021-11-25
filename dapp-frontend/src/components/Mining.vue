<template>
  <div>mining</div>
  <div class="container">
    <div class="mining-stations">
      <MiningStation />
      <MiningStation />
      <MiningStation />
      <MiningStation />
    </div>
    <div class="add-stations"></div>
  </div>
</template>

<script>
import MiningStation from "./MiningStation.vue";

export default {
  name: "Mining",
  components: { MiningStation },
};
</script>

<style>
</style>