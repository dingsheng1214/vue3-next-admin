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
