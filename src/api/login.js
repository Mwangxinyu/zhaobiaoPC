import request from '@/utils/request'
import url from './url'

export function login(params) {
  return request({
    url: url.login,
    method: 'post',
    data: params
  })
}

export function getInfo(token) {
  return request({
    url: url.getInfo,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: url.logout,
    method: 'post'
  })
}
