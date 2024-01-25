// productStore.js
import axios from 'axios';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  // 上用用命名的辦法輸出 "useProductStore"
  state: () => {
    return {
      responseData: [],
      displayData: [],
    };
  },
  actions: {
    axiosGetData() {
      axios.get('https://api.escuelajs.co/api/v1/products').then(res => {
        if (res && res.data) {
          this.responseData = res.data;
          this.displayData = res.data;
        }
      });
    },
    axiosGetDataId(pageId) {
      // 在 Pinia Store 中，this 不會自動獲取 Vue 組件的上下文，因此這種方式無法正常工作。您需要以不同的方式獲取路由參數。
      // 這裡將 pageId 作為輸入的參數, 回到 .vue 檔中再給值
      // const pageId = this.$route.params.id;
      // console.log(pageId);

      axios
        .get(`https://api.escuelajs.co/api/v1/products/${pageId}`)
        .then(res => {
          if (res && res.data) {
            this.responseData = res.data;
          }
        });
    },
  },
});