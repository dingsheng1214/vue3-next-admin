import { defineStore } from 'pinia'
import { TOKEN } from '@/assets/js/utils/constant'
import { getItem, setItem } from '@/assets/js/utils/storage'
// import { login } from '@/api/sys'

export interface UserInfo {
  userId: string | number
  username: string
  realName?: string
  avatar?: string
  desc?: string
  homePath?: string
}

export interface UserState {
  userInfo: UserInfo
  token?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: {
      userId: '',
      username: '',
      realName: '',
      avatar: '',
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
      // const { username, password } = loginData
      // const res = await login({ username, password })
      const res = {
        status: 200,
        token: '************',
        data: { ...loginData },
      }
      if (res.status === 200) {
        this.setToken(res.token)
        return Promise.resolve(res.data)
      }
      return Promise.reject(new Error(''))
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
