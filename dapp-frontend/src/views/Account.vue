<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column">
          <p class="title">Name</p>
          <p class="title">Address</p>
        </div>
        <div class="column">
          <router-link class="button" to="/mining"> Mining </router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="tabs is-boxed">
        <ul>
          <li id="reqTofulfil" class="is-active" data-target="product-details">
            <a v-on:click="displayRequestsToFulfilFunction"
              >Requests to fulfil</a
            >
          </li>
          <li id="reqFulfiled" data-target="delivery-info">
            <a v-on:click="displayRequestsFulfiledFunction"
              >Requests fulfiled</a
            >
          </li>
        </ul>
      </div>

      <div id="tab-content">
        <div v-if="displayRequestsToFulfil" class="requests-to-fulfil">
          <RequestToFulfil />
          <RequestToFulfil />
          <RequestToFulfil />
        </div>

        <div v-if="displayRequestsFulfiled" class="requests-fulfiled">
          <RequestFulfiled />
          <RequestFulfiled />
          <RequestFulfiled />
          <RequestFulfiled />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import RequestToFulfil from "../components/RequestToFulfil.vue";
import RequestFulfiled from "../components/RequestFulfiled.vue";
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
      const tab1 = document.getElementById("reqTofulfil");
      tab1.classList.toggle("is-active");

      const tab2 = document.getElementById("reqFulfiled");
      tab2.classList.toggle("is-active");

      this.displayRequestsToFulfil = true;
      this.displayRequestsFulfiled = false;
    },
    displayRequestsFulfiledFunction: function () {
      const tab1 = document.getElementById("reqTofulfil");
      tab1.classList.toggle("is-active");

      const tab2 = document.getElementById("reqFulfiled");
      tab2.classList.toggle("is-active");

      this.displayRequestsToFulfil = false;
      this.displayRequestsFulfiled = true;
    },
  },
};
</script>

<style scoped>
</style>