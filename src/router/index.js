import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '../views/ShopView.vue';
import ProductDetail from '../views/ProductDetail.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ShopView,
    meta: { requiresAuth: false, isFullApp: false } // 홈 페이지는 인증이 필요하지 않음
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false, isFullApp: false } // 로그인 페이지는 인증이 필요하지 않음
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false, isFullApp: false } // 회원가입 페이지는 인증이 필요하지 않음
  },
  {
    path: '/business',
    name: 'BusinessUser',
    component: () => import('../views/BusinessUser.vue'), // Lazy load the business user view
    meta: { requiresAuth: true, isFullApp: false } // 비즈니스 사용자 페이지는 인증이 필요함
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopView,
    meta: { requiresAuth: false, isFullApp: false } // 쇼핑 페이지는 인증이 필요하지 않음
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: false, isFullApp: false } // 상품 상세 페이지는 인증이 필요하지 않음
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;