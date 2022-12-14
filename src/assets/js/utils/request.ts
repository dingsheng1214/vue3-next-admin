import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../store/modules/user'
import { TOKEN } from './constant'
import { getItem } from '@/assets/js/utils/storage'

type CommonResponse = {
  success: boolean
  code: number
  message: string
  data: any
}
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    const token = getItem(TOKEN)
    if (token) {
      config.headers!.Authorization = token
    }
    return config
  },
  (error) => {
    console.log(error)
  },
)
/**
 * 响应拦截器
 */
service.interceptors.response.use(
  // 请求成功
  (response: AxiosResponse<CommonResponse>) => {
    const { data, success, message } = response.data
    if (success) {
      // 业务成功 -> 返回解析后的数据
      return data
    }
    // 业务失败 -> 消息提示
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  },
  // 请求失败
  (error) => {
    if (error?.response?.data?.code === 401) {
      ElMessage.warning('token失效,请重新登陆')
      const userStore = useUserStore()
      const router = useRouter()
      userStore.logout()
      router.push('/login')
    }
    ElMessage.error(error.message)
    return Promise.reject(new Error(error.message))
  },
)
export default service
