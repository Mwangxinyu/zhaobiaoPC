import request from '@/utils/request'
import url from './url'

export function getjury(params) {
  return request({
    url: url.getjury,
    method: 'post',
    params
  })
}

export function gethistorjury(params) {
  return request({
    url: url.gethistorjury,
    method: 'post',
    params
  })
}
export function getjurybyversion(params) {
  return request({
    url: url.getjurybyversion,
    method: 'post',
    params
  })
}
