import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FaqView.vue'),
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/memberCenter/MemberView.vue'),
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('../views/ReserveView.vue'),
    },
    {
      path: '/shelter',
      name: 'shelter',
      component: () => import('../views/ShelterView.vue'),
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
    },
    {
      path: '/camp',
      name: 'camp',
      component: () => import('../views/CampView.vue'),
    },
    {
      path: '/shopCar',
      name: 'shopCar',
      component: () => import('../views/ShopCarView.vue'),
    },
    {
      path: '/equipment',
      name: 'equipment',
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
  ],
});

export default router;
