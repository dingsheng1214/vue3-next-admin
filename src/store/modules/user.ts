import { defineStore } from 'pinia'
import { TOKEN } from '@/assets/js/utils/constant'
import { getItem, setItem } from '@/assets/js/utils/storage'
import { login, getUserInfo } from '@/api/sys'
import { UserInfo } from '#/sys'

export interface UserState {
  userInfo: UserInfo
  token?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: {
      _id: '',
      id: '',
      title: '',
      username: '',
      avatar: '',
      role: [],
      permission: {},
    },
    token: getItem(TOKEN),
  }),
  getters: {},
  actions: {
    /**
     * 登录请求动作
     * @param loginData
     * @returns
     */
    async login(loginData: { username: string; password: string }) {
      const { username, password } = loginData
      const res = await login({ username, password })
      this.setToken(res.token)
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const res = await getUserInfo({ token: this.token })
      this.setUserInfo(res)
    },
    setToken(token: string) {
      this.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    },
  },
})
