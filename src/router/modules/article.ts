import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/**
 * 私有路由表
 */
const articleRoutes: RouteRecordRaw = {
  path: '/article',
  component: Layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: {
    title: 'article',
    icon: 'article',
  },
  children: [
    {
      path: '/article/ranking',
      name: 'articleRanking',
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
      name: 'articleCreate',
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
}

export default articleRoutes
