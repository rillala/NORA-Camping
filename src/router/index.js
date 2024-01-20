import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
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
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue'),
      meta: {
        title: '會員專區 Member',
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
      component: () => import('../views/ShopView.vue'),
      meta: {
        title: '野良選物 NORA Shop',
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
      component: () => import('../views/ShopCarView.vue'),
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
    // 404頁面：沒有被配置的路由都會去NotFound
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 始终滚动到顶部
    return { top: 0 };
  },
});

router.beforeEach(async (to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;
