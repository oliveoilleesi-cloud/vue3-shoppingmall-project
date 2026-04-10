import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '../views/ShopView.vue';
import ProductDetail from '../components/ProductDetail.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ShopView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
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
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;