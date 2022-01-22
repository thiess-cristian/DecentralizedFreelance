<template>
  <div>mining</div>
  <div class="columns">
    <div class="column">
      <div class="container">
        <div class="mining-stations">
          <MiningStation />
          <MiningStation />
          <MiningStation />
          <MiningStation />
        </div>
      </div>
    </div>
    <div class="column">
      <div class="add-stations">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Name" />
          </div>
        </div>
        <div class="field">
          <label class="label">URL</label>
          <div class="control">
            <input class="input" type="text" placeholder="URL" />
          </div>
        </div>
        <div class="field">
          <button class="button">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiningStation from "../components/MiningStation.vue";

export default {
  name: "Mining",
  components: { MiningStation },
};
</script>

<style>
</style>