import { useUserStore } from './store/modules/user'
// 处理路由守卫
import router from '@/router'
import { getItem } from '@/assets/js/utils/storage'
import { TOKEN } from '@/assets/js/utils/constant'

const whiteList = ['/login']
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
      if (!userStore.userInfo.id) {
        await userStore.getUserInfo()
      }
      next()
    }
  }
  // 2 未登录 -> 只能进入白名单页面
  else if (whiteList.indexOf(toPath) > -1) {
    next()
  } else {
    next('/login')
  }
})
