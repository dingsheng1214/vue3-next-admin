import path from 'path-browserify'
import { RouteRecordRaw } from 'vue-router'

/**
 * 返回所有子路由
 * @param routes
 * @returns
 */
const getChildrenRoute = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

const isNull = (data: unknown) => {
  if (!data) return true
  if (JSON.stringify(data) === '[]') return true
  if (JSON.stringify(data) === '{}') return true
  return false
}

/**
 * 剔除重复的子路由
 * @params routes: 原始路由信息
 */
export const filterRoutes = (routes: RouteRecordRaw[]) => {
  const childrenRoutes = getChildrenRoute(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

export const generateMenus = (routes: RouteRecordRaw[], basePath = '') => {
  const result: RouteRecordRaw[] = []
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children || []))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item1) => item1.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      }

      // icon 与 title 必须全部存在
      if (route?.meta?.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children!.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
