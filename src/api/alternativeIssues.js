import request from '@/utils/request'
import url from './url'
export function getAuditIssues(params) {
    return request({
      url: url.getAuditIssuesInterface+'?page='+params.page+'&size='+params.size,
      method: 'get',
    })
}
/**
 * 删除议题deleteAuditIssuesInterface
 */
export function deleteAuditIssues(params) {
    return request({
      url: url.deleteAuditIssuesInterface,
      method: 'post',
      data:params
    })
}
/**
 * 添加到待审议题库addAuditIssuesInterface
 */
export function addAuditIssues(params) {
    return request({
      url: url.addAuditIssuesInterface,
      method: 'post',
      data:params
    })
}