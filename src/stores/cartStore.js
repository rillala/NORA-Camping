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
      //取得已經有加入購物車的商品，如果購物車已有則+1，沒有則新增項目
      const currentCart = this.cart.find((item) => item.productId === productId)
      if(currentCart){
        currentCart.qty += qty;
      }else{
        this.cart.push({
          id: new Date().getTime(),
          productId,
          qty
        })
      }
      // console.log(this.cart);
      // console.log(productId, qty);
    },
    setCartQty(id, event){
      const currentCart = this.cart.find((item) => item.id === id);
      currentCart.qty = parseInt(event.target.value) 
    },
    removeCartItem(id){
      const index = this.cart.findIndex((item) => item.id === id);
      this.cart.splice(index, 1)
    },
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
          subtotal: product.price * item.qty
        }
      });
      const total = carts.reduce((a,b) => a + b.subtotal, 0);
      console.log(total);
      console.log(carts);
      return{
        carts,//列表
        total,
      }
    }
  },
},
);
