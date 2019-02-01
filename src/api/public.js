import request from '@/utils/request'
import url from './url'
//登录接口
export function Login(params) {
    return request({
        url: url.login,
        method: 'post',
        data: params
    })
}
// 专家库记录页点击查看
// 专家库 预览页面 传version 跳编辑页面
export function recordversion(params) {
    return request({
        url: url.searchSpeciaInterface + '?version=' + params,
        method: 'get'
    })
}
// 点击查看历史版本按钮跳转到列表页面
export function gethistorspecia(val) {
    var pages = val ? ('?page=' + val) : ''
    return request({
        url: url.gethistorspeciaInterface + pages,
        method: 'get',
    })
}
// 议题库 点击议题库查看按钮还有查看议题详情的接口
export function issuesdetail(params) {
    return request({
        url: url.getIssuesByidInterface + '?id=' + params, // getSpecificNameInterface+"?condition="+params,
        method: 'get'
    })
}
// 议题库 删除
export function handledelete(params) {
    return request({
        url: url.getjurydeleteIssuesInterface + '?id=' + params, //
        method: 'get'
    })
}
// 委员库点击发布的接口
export function submitmemberform(params) {
    return request({
        url: url.submitMemberInterface,
        method: 'post',
        data: params

    })
}
// 查看历史委员库
export function gethistorjury(val) {
    var pages = val ? ('?page=' + val) : ''
    return request({
        url: url.gethistorjuryInterface + pages,
        method: 'get',
    })
}
export function getjurybyversion(params) {
    return request({
        url: url.getjurybyversion + '?version=' + params,
        method: 'get'
    })
}
// 根据姓名 或者 分组搜索 searchByNameOrGroupInterface
export function searchbyNameorgroup(params) {
    return request({
        // url: url.searchByNameOrGroupInterface + '?name=' + params.name + '&groupName=' + params.groupName,
        url: url.searchByNameOrGroupInterface,
        method: 'post',
        data: params
    })
}
// 专家库编辑页面点击提交
export function submitform(params) {
    return request({
        url: url.saveExpertInterface,
        method: 'post',
        data: params

    })
}
// 组织机构
export function popupGetAlldepartment() {
    return request({
        url: url.getAllDepartmentInterface,
        method: 'get'
    })
}
// 组织机构   点击添加人员往专家库里添加人(跟下面的那个调的一个接口)
export function getAllDepartment(params) {
    return request({
        url: url.getAllDepartmentInterface,
        method: 'get',
        params
    })
}
// 点击添加人员往委员库里添加人
export function showdirector(params) {
    return request({
        url: url.getAllDepartmentInterface,
        method: 'get',
        params
    })
}
// 查询最新 委员库 记录
export function showRecord(params) {
    return request({
        url: url.getjuryInterface,
        method: 'get',
        params
    })
}
// 点击部门 获取当前部门下，子及部门的人
export function searchpeople(params) {
    return request({
        url: url.getusersbydeptidInterface,
        method: 'get',
        params
    })
}
// 按姓名模糊查询 为空则查询所有
export function searchspecific(params) {
    return request({
        url: url.getSpecificNameInterface + '?condition=' + params,
        method: 'get'

    })
}
// 议题库初始化的接口
export function getallIssues(val) {
    var pages = val ? ('?page=' + val) : ''
    return request({
        url: url.getAllIssuesInterface + pages,
        method: 'get'
    })
}
export function getpersontotal(params) {
    return request({
        url: url.getPersonTotal,
        method: 'post',
        params
    })
}
// 查询最新专家库
export function fnNetGetNewExpert(params) {
    return request({
        url: url.getspecialistInterface,
        method: 'get',
        params
    })
}
// 条件搜索专家库
export function searchExpert(params) {
    return request({
        url: url.searchSpecia + '?name=' + params.name + '&groupName=' + params.groupName,
        method: 'get'
    })
}
export function getpage(params) {
    return request({
        url: url.getPage,
        method: 'post',
        params
    })
}
export function gettree(params) {
    return request({
        url: url.getTree,
        method: 'post',
        params
    })
}
export function getlist(params) {
    return request({
        url: url.getList,
        method: 'post',
        params
    })
}
// 新建议题点击提交的接口
export function createIssues(params) {
    return request({
        url: url.createIssuesInterface,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        data: params
    })
}
// 议题点击搜索
export function discussionSearch(params) {
    return request({
        url: url.getIssuesByCondition,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        data: params
    })
}
// 议题点击编辑传id进入修改页面
export function issuemodify(params) {
    return request({
        url: url.getIssuesByidInterface,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        data: params
    })
}
// 议题库 切换议题上会形式状态
export function updateIssuesonLine(params) {
    return request({
        url: url.updateIssuesonLineInterface,
        method: 'post',
        data: params
    })
}
// 上会次数 4
export function countdetail(params) {
    return request({
        url: url.countDetailInterface + '?id=' + params,
        method: 'get'
    })
}
// 发起线上会议点击保存按钮
export function launchOnlineConference(params) {
    return request({
        url: url.launchOnlineConferenceInterface,
        method: 'post',
        data: params
    })
}
// 线上会议管理 首页
export function launchOnlinIndexConference(params) {
    return request({
        url: url.launchOnlinIndexConferenceInterface,
        method: 'get',
        params
    })
}
// 线上会议管理 分页
export function onlinepage(params) {
    return request({
        url: url.launchOnlinIndexConferenceInterface + '?pages=' + params,
        method: 'get'
    })
}
// 线下会议管理 初始化
export function launchonlinindexconference(val) {
    var pages = val ? ('?page=' + val) : ''
    return request({
        url: url.launchOffineIndexConferenceInterface + pages,
        method: 'get'
    })
}
// 线上会议管理 搜索
export function SearchOnlineIndexConference(params) {
    if (params) {
        return request({
            url: url.SearchOnlineIndexConferenceInterface + '?name=' + params,
            method: 'get'
        })
    } else {
        return request({
            url: url.SearchOnlineIndexConferenceInterface,
            method: 'get'
        })
    }
}
// 线上会议管理 查看已投人员详情
export function getVoteDetailById(params) {
    return request({
        url: url.getVoteDetailByIdInterface,
        method: 'post',
        data: params
    })
}
// 线上会议管理 筛选
export function SearchOfflineIndexConference(params) {
    return request({
        url: url.SearchOfflineIndexConferenceInterface,
        method: 'post',
        data: params
    })
}
// 线上会议 操列 查看
export function seeDetailButtonOnline(params) {
    return request({
        url: url.seeDetailButtonOnlineInterface + '?id=' + params,
        method: 'get'
    })
}
// 线上会议 操列 结束会议按钮
export function leaveChair(params) {
    return request({
        url: url.leaveChairInterface + '?id=' + params,
        method: 'get'
    })
}
// 提交最终结果和文件
export function fnNetSubmitSumary(params) {
    return request({
        url: url.submitSumaryInterface,
        method: 'post',
        data: params
    })
}
// 线上会议 上传会议纪要 提交
export function sumbitAddInterface(params) {
    return request({
        url: url.sumbitAddInterface,
        method: 'post',
        data: params
    })
}
// 获取投票结果 上传会议纪要  uploadSummaryButtonInterface downloadTestInterface
export function uploadsummarybutton(params) {
    return request({
        url: url.uploadSummaryButtonInterface + '?id=' + params,
        method: 'get'
    })
}
// 线上会议  会议纪要 点击附件 下载附件
export function udownloadtest(params) {
    return request({
        url: url.downloadTestInterface + '?fileName=' + params,
        method: 'get'
    })
}
// 线下会议 操列 查看
export function seeDetailButtonOffline(params) {
    return request({
        url: url.seeDetailButtonOfflineInterface + '?id=' + params,
        method: 'get'

    })
}
// 线下会议 根据 ids 查询数组
export function getIssuesByIds(params) {
    return request({
        url: url.getIssuesByIds,
        method: 'post',
        data: params
    })
}
// 新增线下会议  提交
// export function addSubmit(params) {
//     return request({
//       url: url.seeDetailButtonOfflineInterface+"?id="+params,
//       method: 'get',
//     })
// }
// 新增线下会议  提交
export function addSubmit(params) {
    return request({
        url: url.sumbitAddInterface,
        method: 'post',
        data: params
    })
}
// 获取待办待阅列表
export function getJuryInfo(val) {
    var pages = val ? ('?page=' + val) : ''
    return request({
        url: url.getJuryInfo + pages,
        method: 'get',
    })
}
// 根据会议id查相关信息给委员答题
export function getIssuesByid(params) {
    return request({
        url: url.getConferenceIssuesInterface + '?id=' + params,
        method: 'get'
    })
}
// 提交答题
export function voteIssues(params) {
    return request({
        url: url.voteIssuesInterface,
        method: 'post',
        data: params
    })
}
// 删除代办或者通知
export function deleteDaiBanorTongZhi(params) {
    return request({
        url: url.deleteInterface + '?id=' + params,
        method: 'get',
    })
}
// 通知 未读
export function readInfoMation(params) {
    return request({
        url: url.readInfoMationInterface + '?id=' + params,
        method: 'get'
    })
}
// 获取通知
export function getJuryInfoRead(val) {
    var pages = val ? ('?page=' + val) : ''
    return request({
        url: url.getJuryInfoReadInterface + pages,
        method: 'get',
    })
}
export function getToken(data) {
    return request({
        url: url.getToken,
        method: 'post',
        data: data
    })
}
//添加待审议题
export function addaudit(data) {
    return request({
        url: url.addAuditIssuesInterface,
        method: 'post',
        data: data
    })
}