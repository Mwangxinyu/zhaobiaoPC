import request from '@/utils/request'
import url from './url'

export function getspecialist(params) {
  return request({
    url: url.getspecialist,
    method: 'post',
    params
  })
}
// //专家库编辑页面点击提交
// export function submitform(params) {
   
//     return request({
//       url: url.saveExpertInterface,
//       method: 'post',
//       data:params
      
//     })
//   }
// export function gethistorspecia(params) {
//   return request({
//     url: url.gethistorspecia,
//     method: 'post',
//     params
//   })
// }

// export function getspeciabyversion(params) {
//   return request({
//     url: url.getspeciabyversion,
//     method: 'post',
//     params
//   })
// }

// export function searchSpecia(params) {
//   return request({
//     url: url.searchSpecia,
//     method: 'post',
//     params
//   })
// }
