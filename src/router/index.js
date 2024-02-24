import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// import { auth } from "@/firebase/config";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '野良露營 NORA Camping',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '關於野良 About NORA',
      },
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FaqView.vue'),
      meta: {
        title: '常見問題 FAQ',
      },
      
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('../views/ReserveView.vue'),
      meta: {
        title: '預約營位 Camping Reservation',
      },
    },
    {
      path: '/shelter',
      name: 'shelter',
      component: () => import('../views/ShelterView.vue'),
      meta: {
        title: '野良之家 NORA Shelter',
      },
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/shop/ShopView.vue'),
      meta: {
        title: '野良選物 NORA Shop',
      },
    },
    {
      path: '/shopItem/:id',
      name: 'shopItem',
      component: () => import('../views/shop/ShopItemView.vue'),
      meta: {
        title: '野良選物 NORA Shop',
      },
    },
    {
      path: '/shopPayment',
      name: 'shopPayment',
      component: () => import('../views/shop/ShopPayment.vue'),
      meta: {
        title: '建立訂單 Place your Order',
      },
      meta: { requiresAuth: true },
    },
    {
      path: '/shopOrderSucess',
      name: 'shopOrderSucess',
      component: () => import('../views/shop/shopOrderSucess.vue'),
      meta: {
        title: '訂單完成 Order Sucess',
      },
    },
    {
      path: '/camp',
      name: 'camp',
      component: () => import('../views/CampView.vue'),
      meta: {
        title: '營區導覽 Camp Introduction',
      },
    },
    {
      path: '/shopCar',
      name: 'shopCar',
      component: () => import('../views/shop/ShopCarView.vue'),
      meta: {
        title: '購物車 Shopping Cart',
      },
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: () => import('../views/reserve/EquipmentView.vue'),
      meta: {
        title: '預約營位-設備租借 Equipment Rental',
      },
    },
    {
      path: '/reserveconfirm',
      name: 'reserveconfirm',
      component: () => import('../views/reserve/ReserveConfirmView.vue'),
    },
    {
      path: '/reservepayment',
      name: 'reservepayment',
      component: () => import('../views/reserve/ReservePaymentView.vue'),
    },
    {
      path: '/reservesuccess',
      name: 'reservesuccess',
      component: () => import('../views/reserve/ReserveSuccessView.vue'),
    },
    {
      path: '/reservefail',
      name: 'reservefail',
      component: () => import('../views/reserve/ReserveFailView.vue'),
    },

    {
      path: '/membercenter',
      name: 'membercenter',
      component: () => import('../views/member/MemberCenterView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/membercampsiteorders',
      name: 'membercampsiteorders',
      component: () => import('../views/member/MemberCampsiteOrdersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/memberorderhistory',
      name: 'memberorderhistoryr',
      component: () => import('../views/member/MemberOrderHistoryView.vue'),
      meta: { requiresAuth: true },
    },
    // 404頁面：沒有被配置的路由都會去NotFound
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 檢查路由是否有 hash
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    // 返回頂部或保存的位置
    return savedPosition || { top: 0 };
  },
});

const isAuthenticated = (roles) => {
  const userToken = localStorage.getItem("userToken")
  const userData = localStorage.getItem("userData")
  if(userToken){
    const userStorageData = JSON.parse(userData)
    // 依據後端規則來撰寫
    // localstorage有東西，已驗證＋帳號啟用＋符合頁面權限
    // if(userStorageData &&userStorageData.validation == 1 && roles.includes(userStorageData.role)){
    if(userStorageData && userStorageData.validation == 1){
      return true
    }else{
      return false
    }
  }else{
    return false
  }
}

//全局前置守衛來處理基於 Token 的身份驗證檢查，可以讓您避免在每個需要進行權限檢查的頁面組件中重複寫相同的檢查邏輯。
router.beforeEach((to, from, next) => {
  // 檢查該路由是否需要授權訪問
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 檢查 localStorage 中是否存在 Token
    if (localStorage.getItem('token')) {
      // Token 存在，表示用戶已登錄，允許訪問
      next();
    } else {
      // Token 不存在，彈出提示並停留在當前頁面
      alert('請先登錄！');
      next(false); // 使用 next(false) 可以取消當前的導航。用戶將停留在當前頁面，而不是跳轉或重定向。
    }
  } else {
    // 如果不需要授權，直接放行
    next();
  }
});


export default router;
