import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      name: "",
      address: "",
    },
    isAuthenticated: false,
    token: "",
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
    setAddress(state, address) {
      state.user.address = address;
      state.isAuthenticated = true;
    },
    removeAddress(state) {
      state.user.address = "";
      state.isAuthenticated = false;
    },
    setUsername(state, username) {
      state.user.name = username;
    },
    removeUsername(state) {
      state.user.name = "";
    },
  },
  actions: {},
  modules: {},
});
