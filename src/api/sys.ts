import request from '@/assets/js/utils/request'

type Data = Record<string, unknown>
/**
 * 登录
 */
export const login = (data: Data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}

export const logout = (data: Data) => {
  return request({
    url: '/sys/logout',
    method: 'POST',
    data,
  })
}
