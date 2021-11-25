<template>
  <div class="header">
    <div class="logo"><router-link to="/">LOGO</router-link></div>

    <div class="button-container">
      <div class="add-button">
        <button v-on:click="createPost">ADD</button>
      </div>
      <div class="connect-button">
        <button>CONNECT</button>
      </div>

      <div class="account-button">
        <button v-on:click="accessAccount">ACCOUNT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    createPost: function () {
      this.$router.push("/create_post");
    },
    accessAccount: function () {
      this.$router.push("/account");
    },
  },
};
</script>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.button-container {
  display: flex;
  justify-content: flex-end;
}

.add-button {
  align-self: flex-end;
}

.connect-button {
  align-self: flex-end;
}
</style>