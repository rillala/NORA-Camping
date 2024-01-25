// productStore.js
import axios from "axios";
import { defineStore } from "pinia";

export default defineStore('productStore', {
  state: () => {
    return {
      responseData: [],
      displayData: []
    }
  },
  actions: {
    axiosGetData() {
      axios.get('https://api.escuelajs.co/api/v1/products')
        .then(res => {
          if (res && res.data) {
            this.responseData = res.data
            this.displayData = res.data
          }
        })
    },
  }
})
