import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/**
 * 私有路由表
 */
const userRoutes: RouteRecordRaw = {
  // 用户相关
  path: '/user',
  name: 'userManage',
  component: Layout,
  redirect: '/user/manage',
  meta: {
    title: 'user',
    icon: 'personnel',
  },
  children: [
    {
      path: '/user/manage',
      name: 'userManage',
      component: () => import('@/views/user-manage/index.vue'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage',
      },
    },
    {
      path: '/user/role',
      name: 'userRole',
      component: () => import('@/views/role-list/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role',
      },
    },
    {
      path: '/user/permission',
      name: 'userPermission',
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
      component: () => import('@/views/user-import/index.vue'),
      meta: {
        title: 'excelImport',
      },
    },
  ],
}

export default userRoutes
