import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    token: {},
    work_count: 0,
  },
  mutations: {
    login(state, token) {
      state.authenticated = true;
      state.token = token;
    },
    logout(state) {
      state.authenticated = false;
      state.token = {};
    },
    working(state, working = true) {
      state.work_count += working ? 1 : -1;
    },
  },
  computed: {
    working () {
      return !!this.work_count
    }
  },
  actions: {
  },
  modules: {
  }
})
