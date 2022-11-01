import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
})

service.interceptors.response.use(
  // 请求成功
  (response) => {
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
    // TODO: 将来处理token失效问题
    ElMessage.error(error.message)
    return Promise.reject(new Error(error.message))
  },
)
export default service
