// 套件
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { 
    Button, Table, Drawer,
    Carousel, CarouselItem 
} from 'view-ui-plus'

// 樣式
import 'view-ui-plus/dist/styles/viewuiplus.css'

// 引入主程式
import App from './App.vue';
import router from './router';


// 創建一個 vue 應用程式(主要配置在 app.vue裡)
const vueApp = createApp(App);

vueApp.use(createPinia());
vueApp.use(router);


vueApp.component('Button',Button);
// vueApp.component('ButtonGroup',ButtonGroup);


// 渲染在 index.html 裡面的 div#app
vueApp.mount('#app');
