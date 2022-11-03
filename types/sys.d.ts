import { RouteLocationNormalizedLoaded } from 'vue-router'

export interface Role {
  id: string
  title: string
}

export interface Permission {
  menus?: string[]
  points?: string[]
}

export interface UserInfo {
  id: string
  _id: string
  username: string
  title: string
  avatar?: string
  role: Role[]
  permission: Permission
}

/**
 * 搜索结果
 */
export interface SearchPoolItem {
  path: string
  title: string[]
}

export type TagView = RouteLocationNormalizedLoaded & { title: string }
