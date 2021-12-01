<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <p class="title">name</p>
        <p class="title">address</p>
      </div>
      <div class="column">
        <button class="button" v-on:click="accessMining">mining</button>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="contai">
      <div class="tabs is-boxed">
        <ul>
          <li class="is-active" data-target="product-details">
            <a v-on:click="displayRequestsToFulfilFunction"
              >requests to fulfil</a
            >
          </li>
          <li data-target="delivery-info">
            <a v-on:click="displayRequestsFulfiledFunction"
              >requests fulfiled</a
            >
          </li>
        </ul>
      </div>

      <div class="px-2" id="tab-content">
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
    </div>
  </section>
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
</style>