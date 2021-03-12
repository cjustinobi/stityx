
import { persistData } from '../../utils/common'

// States
const state = {
  items: JSON.parse(localStorage.getItem('cart') || '[]')
}

// mutations
const mutations = {
  ADD_ITEM(state, item) {

    // Check if this particular item has been added.
    if (state.items.length) {
      const itm = state.items.find(itm => itm.id == item.id)
      if (itm) {
        // Item exist already, so increase the quantity.
        itm.qty++
        itm.subTotal = itm.price * itm.qty
        const itemIndex = state.items.findIndex(product => product.id == item.id)
        state.items[itemIndex] = itm

        // Persist the item
        return persistData(state.items)
      }
    }
    // This item has not been added yet.
    item.qty = 1
    item.subTotal = item.price
    state.items.push(item)

    // Persist the item
    persistData(state.items)
  },

  REMOVE_ITEM (state, itemId) {
    state.items = state.items.filter(item => item.id != itemId)
    persistData(state.items)
  },

  PLUS_MINUS_ITEM(state, { itemId, action }) {
    const itemIndex = state.items.findIndex(item => item.id == itemId)
    if (action == 'plus') {
      state.items[itemIndex].qty++
      persistData(state.items)
    } else {
      if (state.items[itemIndex].qty > 1) {
        state.items[itemIndex].qty--
        persistData(state.items)
      }
    }
  },

  EMPTY_CART(state) {
    state.items = []
  }
}

// actions
const actions = {
  addItem({ commit }, item) {
    commit('ADD_ITEM', item)
  },

  removeItem({ commit }, itemId) {
    commit('REMOVE_ITEM', itemId)
  },

  plusMinusItem({ commit }, data) {
    commit('PLUS_MINUS_ITEM', data)
  }
}

// Getters
const getters = {
  items: state => state.items,
  totalPrice: state => {
    let sum = 0
    state.items.forEach(item => {
      sum += item.price * item.qty
    })
    return sum
  },
  totalQty: state => {
    return state.items.reduce((prev, cur) => {
      return prev + cur.qty;
    }, 0);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}