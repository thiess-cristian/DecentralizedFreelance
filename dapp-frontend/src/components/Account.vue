<template>
  <div class="account-header">
    <div class="account-data">
      <div class="public-name">name</div>
      <div class="address">address</div>
    </div>
    <div class="mining-button">
      <button v-on:click="accessMining">mining</button>
    </div>
  </div>

  <div class="requests-container">
    <div class="requests-buttons">
      <div class="requests-to-fulfil">
        <button v-on:click="displayRequestsToFulfilFunction">
          requests to fulfil
        </button>
      </div>

      <div class="requests-fulfiled">
        <button v-on:click="displayRequestsFulfiledFunction">
          requests fulfiled
        </button>
      </div>
    </div>

    <div v-if="displayRequestsToFulfil" class="requests-to-fulfil">
      <RequestToFulfil class="request" />
      <RequestToFulfil class="request" />
      <RequestToFulfil class="request" />
    </div>

    <div v-if="displayRequestsFulfiled" class="requests-fulfiled">
      <RequestFulfiled class="request" />
      <RequestFulfiled class="request" />
      <RequestFulfiled class="request" />
      <RequestFulfiled class="request" />
    </div>
  </div>
</template>

<script>
import RequestToFulfil from "./RequestToFulfil.vue";
import RequestFulfiled from "./RequestFulfiled.vue";
export default {
  name: "Account",
  components: {
    RequestToFulfil,
    RequestFulfiled,
  },
  data() {
    return {
      displayRequestsToFulfil: true,
      displayRequestsFulfiled: false,
    };
  },
  methods: {
    displayRequestsToFulfilFunction: function () {
      this.displayRequestsToFulfil = true;
      this.displayRequestsFulfiled = false;
    },
    displayRequestsFulfiledFunction: function () {
      this.displayRequestsToFulfil = false;
      this.displayRequestsFulfiled = true;
    },
    accessMining: function () {
      this.$router.push("/mining");
    },
  },
};
</script>

<style scoped>
.account-header {
  display: flex;
  justify-content: space-evenly;
}

.requests-container {
  display: flex;
  flex-direction: column;
}

.requests-buttons {
  display: flex;
  align-self: center;
}

.request {
  align-self: center;
  width: 1000px;
}
</style>