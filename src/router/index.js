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
    },
    {
      path: '/shopOrderSucess',
      name: 'shopOrderSucess',
      component: () => import('../views/shop/ShopOrderSucess.vue'),
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
      // meta: { requiresAuth: true },
    },
    {
      path: '/membercampsiteorders',
      name: 'membercampsiteorders',
      component: () => import('../views/member/MemberCampsiteOrdersView.vue'),
    },
    {
      path: '/memberorderhistory',
      name: 'memberorderhistoryr',
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

router.beforeEach(async (to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }else if ( !isAuthenticated(to.meta.role) && to.name !== 'login') {
    // 檢查用户是否已登陸 && 避免進入登入頁面造成無限重定向
    // 將用户重定向到登陸頁面
    return { name: 'login' }
  }
});

export default router;
