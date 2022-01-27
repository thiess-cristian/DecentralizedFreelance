<template>
  <section class="section">
    <div class="title">Mining</div>
    <div class="columns">
      <div class="column">
        <div class="subtitle">Mining stations</div>
        <MiningStation />
        <MiningStation />
        <MiningStation />
        <MiningStation />
      </div>
      <div class="column">
        <div class="box">
          <div class="subtitle">Add a new mining station</div>
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
            <button class="button" @click="addMiningStation">Add</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MiningStation from "../components/MiningStation.vue";

export default {
  name: "Mining",
  components: { MiningStation },
  data() {
    return {
      miningStationData: "",
    };
  },
  methods: {
    addMiningStation() {},
  },
};
</script>

<style>
</style>