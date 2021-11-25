<template>
  <div class="info-container">
    <div class="arrow-button-container">
      <button>LEFT ARROW</button>
    </div>
    <div class="info-section"></div>
    <div class="arrow-button-container">
      <button>RIGHT ARROW</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoSection",
};
</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: center;
}

.info-section {
  width: 50%;
  height: 500px;
  background-color: chartreuse;
}

.arrow-button-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>