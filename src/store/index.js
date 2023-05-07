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
    }
  },
  modules: {
  }
})
