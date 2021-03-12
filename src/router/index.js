import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart')
  },
  {
    path: '/admin/',
    name: 'AdminHome',
    meta: { layout: 'dashboard' },
    component: () => import('../views/admin/Index')
  },
  {
    path: '/admin/furnitures',
    name: 'AdminFurnitures',
    meta: { layout: 'dashboard' },
    component: () => import('../views/admin/Furnitures')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
