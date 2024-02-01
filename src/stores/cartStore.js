// productStore.js
import axios from 'axios';
import { defineStore } from 'pinia';
import { useProductStore } from '@/stores/productStore';

export const useCartStore = defineStore('cartStore', {
  // 上用命名的辦法輸出 "useProductStore"

  state: () => {
    return {
      cart: [],
      totalQty: '',
    };
  },
  actions: {
    getCart() {
      const storedCart = localStorage.getItem('cartList');

      if (this.cart && this.cart.length > 0) {
        console.log(this.cart);
        return this.cart;
      } else if (storedCart) {
        console.log('return storedCart');
        // console.log(storedCart);
        const formatCartList = JSON.parse(storedCart);
        console.log(formatCartList);

        return (this.cart = formatCartList);
      } else {
        return [];
      }
    },
    addToCart(productId, qty = 1) {
      //取得已經有加入購物車的商品，如果購物車已有則+1，沒有則新增項目
      const currentCart = this.cart.find(item => item.productId === productId);
      if (currentCart) {
        currentCart.qty += qty;
      } else {
        this.cart.push({
          id: new Date().getTime(),
          productId,
          qty,
        });
        this.totalQty += qty
      }
      console.log(this.cart);
      // console.log(productId, qty);
      this.saveCartListToLocalStorage();
    },
    setCartQty(id, event) {
      const currentCart = this.cart.find(item => item.id === id);
      currentCart.qty = parseInt(event.target.value);
      this.saveCartListToLocalStorage();
    },
    removeCartItem(id) {
      const index = this.cart.findIndex(item => item.id === id);
      this.cart.splice(index, 1);
      this.saveCartListToLocalStorage();
    },
    saveCartListToLocalStorage() {
      const productStore = useProductStore();
      const products = productStore.displayData;

      const cartList = this.cart.map(item => {
        const product = products.find(product => product.id === item.productId);
        return {
          ...item,
          product,
          // 计算小计金额
          subtotal: product.price * item.qty,
        };
      });

      console.log(cartList);

      // 存储完整的 cartList 到 localStorage
      localStorage.setItem('cartList', JSON.stringify(cartList));
    },
  },
  getters: {
    cartList: ({ cart }) => {
      //1. 取得商品詳細資訊，購物車目前只有取得商品id
      const productStore = useProductStore();
      const products = productStore.displayData;
      // console.log(products);
      // console.log(cart);

      // const carts = cart.map(item => {
      //   //取出productStore單一商品詳情
      //   const product = products.find(product => product.id === item.productId);
      //   // console.log('相同id品項', product);
      //   return {
      //     ...item,
      //     product,
      //     // 計算小記金額
      //     subtotal: product.price * item.qty,
      //   };
      // });

      const carts = cart
        .map(item => {
          const product = products.find(
            product => product.id === item.productId,
          );

          // 如果找不到產品，則跳過當前項目
          // 這邊確認一下為什麼會比對不到項目?
          if (!product) {
            console.log('no product found');
            return null;
          }

          return {
            ...item,
            product,
            subtotal: product.price * item.qty,
          };
        })
        .filter(item => item != null);

      const total = carts.reduce((a, b) => a + b.subtotal, 0);
      // console.log(product);
      // console.log(carts);
      return {
        carts, //列表
        total,
      };
    },
  },
  // setup() {
  //   const store = useCartStore();

  //   watch(() => store.cartList, (newCartList) => {
  //     localStorage.setItem("cart", JSON.stringify(newCartList));
  //   });
  // }
});
