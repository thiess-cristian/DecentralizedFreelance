<template>
  <div class="container">
    <div class="box">
      <div class="title">{{ title }}</div>
      <div class="columns">
        <div class="column">
          <InfoSection :image="image" />
        </div>
        <div class="column">
          <div class="description">{{ description }}</div>
          <div class="price">{{ price }}</div>
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
const ipfsURI = "https://ipfs.io/ipfs";

export default {
  name: "PostSubmit",
  components: {
    InfoSection,
  },
  data() {
    return {
      title: "",
      image: "",
      price: "",
      description: "",
    };
  },
  mounted() {
    const post = this.getIpfsPost(this.$route.params.id);
    Promise.resolve(post).then((post) => {
      this.title = post["title"];
      const imageURL = `${ipfsURI}/${post["image"]}`;
      this.image = imageURL;
      this.price = post["price"];
      this.description = post["description"];
      console.log(post);
    });
  },
  methods: {
    async getIpfsPost(id) {
      const ipfsUrl = `${ipfsURI}/${id}`;
      const response = await fetch(ipfsUrl);
      const data = await response.json();
      console.log(data);
      return data;
    },
  },
};
</script>

<style scoped>
</style>