<template>
  <div class="basket">
    <div class="items" v-if="productsInBag.length > 0">

      <div class="item"
        v-for="(productInBag, index) in productsInBag"
        :key="index"
      >
        <div 
          class="remove"
          @click="removeFromBag(productInBag.id)">Remove item</div>
        <div class="photo"><img :src="productInBag.image" alt=""></div>
        <div class="description">{{ productInBag.title }}</div>
        <div class="price">
          <span class="quantity-area">
            <button 
              :disabled="productInBag.quantity <= 1" 
              @click="productInBag.quantity--">-</button>
            <span class="quantity">{{ productInBag.quantity }}</span>
            <button @click="productInBag.quantity++">+</button>
          </span>
          <span class="amount">US$ {{ (productInBag.price * productInBag.quantity).toFixed(2) }}</span>
        </div>
      </div>
      <div class="grand-total"> Grand Total: US$ 22.30</div>

    </div>
    <h4 v-else>No items in bag yet.</h4>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ShoppingBasket',

  methods: {
    removeFromBag(productId) {
    this.$store.dispatch('removeFromBag', productId)
  }
  },
  computed: mapState([
    'productsInBag',
  ]),
}
</script>

<style lang="scss">

.basket {
  padding: 60px 0;  
  .items {
    max-width: 800px;
    margin: auto;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
      border-bottom: 1px solid lightgrey;
      position: relative;

      .remove {
        position: absolute;
        top: 8px;
        right: 0;
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }

      .quantity-area {
        margin: 8px auto;
        height: 14px;

        button {
          width: 16px;
          height: 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .quantity {

            margin: 0 4px;
        }
      }

      .photo {
        img {
          max-width: 80px;
        }
      }

      .description {
        padding-left: 30px;
        box-sizing: border-box;
        max-width: 50%;

      }

      .price {
        .amount {
          font-size: 16px;
          margin-left: 8px;
          vertical-align: middle;

        }
      }
    }
      .grand-total {
          font-size: 24px;
          font-weight: bold;
          text-align: right;
          margin-top: 8px;
      }

  }

}

</style>
