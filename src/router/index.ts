import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/**
 * 私有路由表
 */
const privateRoutes: RouteRecordRaw[] = [
  // 用户相关
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel',
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index.vue'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage',
        },
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index.vue'),
        meta: {
          title: 'roleList',
          icon: 'role',
        },
      },
      {
        path: '/user/permission',
        component: () => import('@/views/permission-list/index.vue'),
        meta: {
          title: 'permissionList',
          icon: 'permission',
        },
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index.vue'),
        meta: {
          title: 'userInfo',
        },
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index.vue'),
        meta: {
          title: 'excelImport',
        },
      },
    ],
  },

  // 文章相关
  {
    path: '/article',
    component: Layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article',
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index.vue'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking',
        },
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article-detail/index.vue'),
        meta: {
          title: 'articleDetail',
        },
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create',
        },
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: 'articleEditor',
        },
      },
    ],
  },
]
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
  routes: [...publicRoutes, ...privateRoutes],
})
export default router
