// productStore.js
import axios from 'axios';
import { defineStore } from 'pinia';
import { useProductStore } from '@/stores/productStore';

export const useCartStore = defineStore('cartStore', {
  // 上用命名的辦法輸出 "useProductStore"
  state: () => {
    return {
      cart: [],
    };
  },
  actions: {
    addToCart(productId, qty = 1){
      console.log(productId, qty);
      this.cart.push({
        id: new Date().getTime(),
        productId,
        qty
      })
      // console.log(this.cart);
    }
  },
  getters: {
    cartList: ({cart})=> {
      //1. 取得商品詳細資訊，購物車目前只有取得商品id
      const productStore = useProductStore()
      const products = productStore.displayData
      console.log(products);
      console.log(cart);
      const carts = cart.map((item)=>{
        //取出單一商品
        const product = products.find((product)=> product.id === item.productId);
        return{
          ...item,
          product,
          // 計算小記金額
          subtatal: product.price * item.qty
        }
      });
      const total = carts.reduce((a,b) => a + b.subtatal, 0);
      console.log(total);
      console.log(carts);
      return{
        carts,//列表
        total,
      }
    }
  }
},
);
