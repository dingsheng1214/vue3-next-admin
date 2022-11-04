import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import userRoutes from './modules/user'
import articleRoutes from './modules/article'
/**
 * 私有路由表
 */
const privateRoutes: RouteRecordRaw[] = [userRoutes, articleRoutes]
/**
 * 共有路由表
 */
const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    redirect: '/profile',
    component: Layout,
    children: [
      {
        // 个人中心
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel',
        },
      },
      {
        // 401
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue'),
      },
      {
        // 404
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes],
})
export default router
export { privateRoutes, publicRoutes }
