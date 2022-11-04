// 处理路由守卫
import router from '@/router'
import { getItem } from '@/assets/js/utils/storage'
import { TOKEN, ROUTE_WHITE_LIST } from '@/assets/js/utils/constant'
import { usePermissionStore, useUserStore } from './store'

/**
 * 路由前置守卫
 * to: 要到哪里去
 * from: 从哪里来
 * next: 是否要去?
 */
router.beforeEach(async (to, from, next) => {
  const token = getItem(TOKEN)
  const { path: toPath } = to
  if (token) {
    // 1 已登录 -> 不允许进入 Login页面
    if (toPath === '/login') next('/')
    else {
      const userStore = useUserStore()
      const permissionStore = usePermissionStore()
      if (!userStore.userInfo.id) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await userStore.getUserInfo()
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await permissionStore.filterRoutes(permission.menus)
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          // 动态添加路由
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        next(to.path)
        return
      }
      next()
    }
  }
  // 2 未登录 -> 只能进入白名单页面
  else if (ROUTE_WHITE_LIST.indexOf(toPath) > -1) {
    next()
  } else {
    next('/login')
  }
})
