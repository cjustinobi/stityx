// States
const state = {
  toggleSidebar: false
}

// mutations
const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.toggleSidebar = !state.toggleSidebar
  }
}

// actions
const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

// Getters
const getters = {
  toggleSidebar: state => state.toggleSidebar,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}