// productStore.js
import axios from 'axios';
import { defineStore } from 'pinia';
import apiInstance from '@/plugins/auth';


export const useProductStore = defineStore('productStore', {
  // 上用用命名的辦法輸出 "useProductStore"
  state: () => {
    return {
      responseData: [],
      displayData: [],
      filteredData: [],
    };
  },
  actions: {
    axiosGetData() {
      apiInstance
        .get("./getProduct.php")
        .then(res => {
          if (res && res.data) {
            this.responseData = res.data;
            this.displayData = res.data;
            this.filteredData = res.data;
          }
        });
    },
    axiosGetDataId(pageId) {
      apiInstance
        .get(`./getSingleProduct.php/?id=${pageId}`)
        .then(res => {
          if (res && res.data) {
            this.responseData = res.data;
          }
        });
    },

    sortByPriceHighToLow() {
      this.displayData.sort((a, b) => b.price - a.price);
    },
    sortByPriceLowToHigh() {
      this.displayData.sort((a, b) => a.price - b.price);
    },
    filterByCategory(category) {
      if (category === '選擇類別') {
        this.displayData = this.responseData;
      } else {
        this.displayData = this.responseData.filter(product => product.category === category);
      }
    },
    filterProducts(searchTerm) {
      if (!searchTerm.trim()) {
        this.filteredData = this.responseData;
        return;
      }

      this.filteredData = this.responseData.filter(item => {
        return item.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
      });

      // 在這裡更新 displayData
      this.displayData = this.filteredData;
    },
  },
});

