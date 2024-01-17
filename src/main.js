// 套件
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// 樣式

// 引入主程式
import App from './App.vue';
import router from './router';


// 創建一個 vue 應用程式(主要配置在 app.vue裡)
const app = createApp(App);

app.use(createPinia());
app.use(router);

// 渲染在 index.html 裡面的 div#app
app.mount('#app');
