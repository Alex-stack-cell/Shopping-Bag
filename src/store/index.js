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
    loadBag(state, productsInBag) {
      state.productsInBag = productsInBag;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id);
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
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
    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")));
      }
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
