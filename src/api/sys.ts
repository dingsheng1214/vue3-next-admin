import request from '@/assets/js/utils/request'
import { sysLogin, sysProfile } from '../../mock/user'

type Data = Record<string, unknown>
/**
 * 登录
 */
export const login = (data: Data) => {
  request({
    url: '/sys/login',
    method: 'POST',
    data,
  })
  return Promise.resolve(sysLogin.data)
}

export const getUserInfo = (data: Data) => {
  request({
    url: '/sys/profile',
    method: 'GET',
    data,
  })
  return Promise.resolve(sysProfile.data)
}
