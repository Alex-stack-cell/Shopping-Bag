import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  // It will the source of truth, where all the data 
  // of application will be centralized
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id);
      state.productsInBag = updatedBag;
    }
  },
  actions: {
    // Actions are asynchronous which is not the case
    // for mutations.
    loadProducts({ commit }) {
      const url = "https://fakestoreapi.com/products";
      
      axios
      .get(url)
      .then((response)=>commit('loadProducts', response.data))
      .catch((error)=>console.error(error));
    },
    addToBag({ commit }, product) {
      commit('addToBag', product);
    },
    removeFromBag({ commit }, productId) {
      if (confirm('Are you sure you want to remove the item from your bag ?')) {
        commit('removeFromBag', productId);
      }
    }
  },
  modules: {
  }
})
