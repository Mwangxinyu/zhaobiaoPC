import request from '@/utils/request'
import url from './url'

export function getList(params) {
  return request({
    url: url.billlists,
    method: 'post',
    params
  })
}
