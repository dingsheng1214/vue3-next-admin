import { defineStore } from 'pinia'
import { TOKEN } from '@/assets/js/utils/constant'
import { getItem, setItem, clearStorage } from '@/assets/js/utils/storage'
import { login, getUserInfo } from '@/api/sys'
import { UserInfo } from '#/sys'

export interface UserState {
  userInfo: UserInfo
  token?: string
}
const initUserInfo: UserInfo = {
  _id: '',
  id: '',
  title: '',
  username: '',
  avatar: '',
  role: [],
  permission: {},
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: { ...initUserInfo },
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
    async logout() {
      this.setToken('')
      this.setUserInfo({ ...initUserInfo })
      clearStorage()
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const res = await getUserInfo({ token: this.token })
      this.setUserInfo(res)
      return res
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
