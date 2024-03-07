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
      meta: {
        title: '關於野良 About NORA',
      },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      meta: {
        title: '常見問題 FAQ',
      },
      component: () => import('../views/FaqView.vue'),
    },
    {
      path: '/reserve',
      name: 'reserve',
      meta: {
        title: '預約營位 Camping Reservation',
      },
      component: () => import('../views/ReserveView.vue'),
    },
    {
      path: '/shelter',
      name: 'shelter',
      meta: {
        title: '野良之家 NORA Shelter',
      },
      component: () => import('../views/ShelterView.vue'),
    },
    {
      path: '/shop',
      name: 'shop',
      meta: {
        title: '野良選物 NORA Shop',
      },
      component: () => import('../views/shop/ShopView.vue'),
    },
    {
      path: '/shopItem/:id',
      name: 'shopItem',
      meta: {
        title: '野良選物 NORA Shop',
      },
      component: () => import('../views/shop/ShopItemView.vue'),
    },
    {
      path: '/shopPayment',
      name: 'shopPayment',
      meta: {
        title: '建立訂單 Place your Order',
        requiresAuth: true,
      },
      component: () => import('../views/shop/ShopPayment.vue'),
    },
    {
      path: '/shopOrderSucess',
      name: 'shopOrderSucess',
      meta: {
        title: '訂單完成 Order Sucess',
        requiresAuth: true,
      },
      component: () => import('../views/shop/shopOrderSucess.vue'),
    },
    {
      path: '/camp',
      name: 'camp',
      meta: {
        title: '營區導覽 Camp Introduction',
      },
      component: () => import('../views/CampView.vue'),
    },
    {
      path: '/shopCar',
      name: 'shopCar',
      meta: {
        title: '購物車 Shopping Cart',
      },
      component: () => import('../views/shop/ShopCarView.vue'),
    },
    {
      path: '/equipment',
      name: 'equipment',
      meta: {
        title: '預約營位-設備租借 Equipment Rental',
      },
      component: () => import('../views/reserve/EquipmentView.vue'),
    },
    {
      path: '/reserveconfirm',
      name: 'reserveconfirm',
      component: () => import('../views/reserve/ReserveConfirmView.vue'),
    },
    {
      path: '/reservepayment',
      name: 'reservepayment',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/reserve/ReservePaymentView.vue'),
    },
    {
      path: '/reservesuccess',
      name: 'reservesuccess',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/reserve/ReserveSuccessView.vue'),
    },
    {
      path: '/reservefail',
      name: 'reservefail',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/reserve/ReserveFailView.vue'),
    },

    {
      path: '/membercenter',
      name: 'membercenter',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/member/MemberCenterView.vue'),
    },
    {
      path: '/membercampsiteorders',
      name: 'membercampsiteorders',
      meta: { requiresAuth: true },
      component: () => import('../views/member/MemberCampsiteOrdersView.vue'),
    },
    {
      path: '/memberorderhistory',
      name: 'memberorderhistoryr',
      meta: { requiresAuth: true },
      component: () => import('../views/member/MemberOrderHistoryView.vue'),
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

const isAuthenticated = roles => {
  const userToken = localStorage.getItem('userToken');
  const userData = localStorage.getItem('userData');
  if (userToken) {
    const userStorageData = JSON.parse(userData);
    // 依據後端規則來撰寫
    // localstorage有東西，已驗證＋帳號啟用＋符合頁面權限
    // if(userStorageData &&userStorageData.validation == 1 && roles.includes(userStorageData.role)){
    if (userStorageData && userStorageData.validation == 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

//全局前置守衛來處理基於 Token 的身份驗證檢查，可以讓您避免在每個需要進行權限檢查的頁面組件中重複寫相同的檢查邏輯。
router.beforeEach((to, from, next) => {
  // 檢查該路由是否需要授權訪問
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 檢查 localStorage 中是否存在 Token
    if (localStorage.getItem('token')) {
      // Token 存在，表示用戶已登錄，允許訪問
      next();
    } else {
      // Token 不存在，彈出提示並跳轉到首頁
      alert('請先登錄！');
      next({ name: 'home' });
    }
  } else {
    // 如果不需要授權，直接放行
    next();
  }
});


export default router;

