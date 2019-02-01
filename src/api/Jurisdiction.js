import request from '@/utils/request'
import url from './url'
// 点击搜索 查询所有角色
export function getAllRole(params) {
  return request({
    url: url.getAllRoleInterface,
    method: 'get',
    params
  })
}
// 根据name 查 角色
export function getRoleByContion(params) {
  return request({
    url: url.getRoleByContionInterface + '?name=' + params,
    method: 'get'
  })
}
// 添加角色信息
export function addRole(params) {
  return request({
    url: url.addRoleInterface,
    method: 'post',
    data: params
  })
}
// 修改角色信息
export function modifyRole(params) {
  return request({
    url: url.modifyInterface,
    method: 'post',
    data: params
  })
}
// 删除角色信息
export function deleteRole(params) {
  return request({
    url: url.deleteRoleInterface + '?id=' + params,
    method: 'get'
  })
}
// 查看所有权限
export function getAllAuth(params) {
  return request({
    url: url.getAllAuthInterface,
    method: 'get',
    params
  })
}
// 角色权限关联
export function reloReleAuth(params) {
  return request({
    url: url.reloReleAuthInterface,
    method: 'post',
    data: params
  })
}
// 根据角色id查看所拥有权限
export function getMenuByRoleId(params) {
  return request({
    url: url.getMenuByRoleIdInterface + '?roleId=' + params,
    method: 'get'
  })
}
// 根据角色id查员工
export function getUserByRoleId(params) {
  return request({
    url: url.getUserByRoleIdInterface + '?roleId=' + params,
    method: 'get'
  })
}
// 修改员工角色关联
export function updateRoleByUserId(params) {
  return request({
    url: url.updateRoleByUserIdInterface,
    method: 'post',
    data: params
  })
}
