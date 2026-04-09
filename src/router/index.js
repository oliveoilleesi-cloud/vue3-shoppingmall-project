import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '../views/ShopView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ShopView
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopView
  },
  {
    path: '/collections',
    name: 'Collections',
    component: ShopView
  },
  {
    path: '/about',
    name: 'About',
    component: ShopView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;