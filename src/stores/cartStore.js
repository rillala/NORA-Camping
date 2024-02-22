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
    addToCart(productId, qty = 1, selectedColor, selectedSize) {
      // 查找購物車中是否已存在相同商品ID且顏色和尺寸都匹配的商品
      const currentCart = this.cart.find(item => item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize);
      if(qty <= 0){
        alert('最少數量為1');
        return;
      }
      // 如果找到了，則增加該商品的數量
      if (currentCart) {
        currentCart.qty += qty;
      } else {
        // 如果沒找到，則新增商品項目到購物車
        this.cart.push({
          id: new Date().getTime(), // 使用當前時間戳作為唯一ID，也可以選擇其他生成ID的方法
          productId,
          qty,
          selectedColor,
          selectedSize,
        });
      }
      alert('商品已加入購物車');
      // 保存更新後的購物車到本地存儲
      this.saveCartListToLocalStorage();
    },
    
    setCartQty(productId, event) {
      const qty = parseInt(event.target.value);
      const index = this.cart.findIndex(item => item.productId === productId);
    
      if (index !== -1 && qty >= 0) {
        this.cart[index].qty = qty;
        this.saveCartListToLocalStorage();
      } else {
        console.error('商品未找到或数量无效');
      }
    },
    removeCartItem(id) {
      const index = this.cart.findIndex(item => item.product_id === id);
      this.cart.splice(index, 1);
      this.saveCartListToLocalStorage();
    },
    saveCartListToLocalStorage() {
      const productStore = useProductStore();
      const products = productStore.displayData;

      const cartList = this.cart.map(item => {
        const product = products.find(product => product.product_id === item.productId);
        return {
          ...item,
          product,
          // 计算小计金额
          subtotal: product.price * item.qty,
        };
      });

      // console.log(cartList);

      // 存储完整的 cartList 到 localStorage
      localStorage.setItem('cartList', JSON.stringify(cartList));
    },
    updateCartItem(productId, value, type) {
      const item = this.cart.find(item => item.productId === productId);
      if (item) {
        if (type === 'color') {
          item.selectedColor = value;
        } else if (type === 'size') {
          item.selectedSize = value;
        }
        this.saveCartListToLocalStorage(); // 保存变更
      }
    },
  },
  updateProductOption(productId, value, optionType) {
    const productIndex = this.cart.findIndex(item => item.productId === productId);
    if (productIndex !== -1) {
      if (optionType === 'color') {
        this.cart[productIndex].selectedColor = value;
      } else if (optionType === 'size') {
        this.cart[productIndex].selectedSize = value;
      }
      this.saveCartListToLocalStorage();
    }
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
            product => product.product_id === item.productId,
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
      const totalQty = carts.reduce((a, b) => a + b.qty, 0);
      // console.log(product);
      // console.log(carts);
      return {
        carts, //列表
        total,
        totalQty
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
