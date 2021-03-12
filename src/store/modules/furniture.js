

const state = {
  furnitures: [],
  filteredItem: [],
  itemToEdit: ''
}

// mutations
const mutations = {
  SET_FURNITURES(state, furnitures) {
    state.furnitures = furnitures;
  },
  ADD_FURNITURE(state, furniture) {
    state.furnitures.unshift(furniture);
  },
  DELETE_FURNITURE(state, furnitureId) {
    state.furnitures = state.furnitures.filter(furniture => furniture.id != furnitureId)
  },
  UPDATE_FURNITURE(state, furniture) {
    const itemIndex = state.furnitures.findIndex(item => item.id == furniture.id)
    state.furnitures[itemIndex] = furniture
  },
  ITEM_TO_EDIT(state, furniture) {
    state.itemToEdit = furniture
  },
  FILTERED_ITEM(state, furnitures) {
    state.filteredItem = furnitures
  }
}

const actions = {
  async getFurnitures ({ commit }) {
    const res = await this._vm.$http.get('furnitures');
    if (res.status === 200) {
      return commit('SET_FURNITURES', res.data)
    }
    this._vm.$message.error('Error occurred')
  },

  async saveFurniture({ commit }, data) {
    try {
      await this._vm.$http.post('furnitures', data)
      commit('ADD_FURNITURE', data)
      return {success: true}
    } catch (e) {
      return {success: false}
    }
  },

  async disableEnableFurniture({ commit }, furniture) {
    furniture.enabled = !furniture.enabled
    const res = await this._vm.$http.put(`furnitures/${furniture.id}`, furniture)
    if (res.status === 200) {
      commit('UPDATE_FURNITURE', furniture)
      return this._vm.$message.success('Item successfully updated')
    }
    this._vm.$message.error('Furniture was not updated. Try again')
  },

  async multipleEnableDisable({ dispatch }, furnitures) {
    furnitures.forEach(async furniture => {
      await dispatch('disableEnableFurniture', furniture)
    })
  },

  async deleteFurniture({ commit }, furnitureId) {
    const res = await this._vm.$http.delete(`furnitures/${furnitureId}`)
    if (res.status === 200) {
      commit('DELETE_FURNITURE', furnitureId)
      return this._vm.$message.success('Item successfully deleted')
    }
    this._vm.$message.error('Furniture was not deleted. Try again')
  },

  itemToEdit({ commit }, item) {
    commit('ITEM_TO_EDIT', item)
  },

  async editFurniture({ commit }, item) {
    try {
      await this._vm.$http.put(`furnitures/${item.id}`, item)
      commit('UPDATE_FURNITURE', item)
      return {success: true}
    } catch (e) {
      return {success: false}
    }
  },

  filteredItem({ commit }, furnitures) {
    commit('FILTERED_ITEM', furnitures)
  }

}


// getters
const getters = {
  furnitures: state => state.furnitures,
  filteredItem: state => state.filteredItem,
  itemToEdit: state => state.itemToEdit
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}