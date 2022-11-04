import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { publicRoutes, privateRoutes } from '@/router'

interface PermissionState {
  routes: RouteRecordRaw[]
}
const initPermissionState: PermissionState = {
  routes: [],
}

const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => initPermissionState,
  getters: {},
  actions: {
    /**
     * 增加路由
     */
    setRoutes(newRoutes: RouteRecordRaw[]) {
      // 永远在静态路由的基础上增加新路由
      this.routes = [...publicRoutes, ...newRoutes]
    },
    /**
     * 根据权限筛选路由
     */
    filterRoutes(menus: string[]) {
      const routes: RouteRecordRaw[] = []
      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404',
      })
      this.setRoutes(routes)
      return routes
    },
  },
})

export { usePermissionStore }
