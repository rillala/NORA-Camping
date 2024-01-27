// 套件
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setupCalendar } from 'v-calendar';

// 引入主程式
import App from './App.vue';
import router from './router';

// 創建一個 vue 應用程式(主要配置在 app.vue裡)
const vueApp = createApp(App);

vueApp.use(createPinia());
vueApp.use(router);

// 渲染在 index.html 裡面的 div#app
vueApp.mount('#app');

// Use calendar defaults (optional)
vueApp.use(setupCalendar, {});
