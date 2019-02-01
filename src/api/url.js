// 配置所有接口路径
// const webUrl = '/api' // 服务器上的
//  const webUrl="http://10.3.53.12:10003" //路桥
const webUrl = 'http://121.42.233.49:10003'  ///天润佳能服务器
// const webUrl = 'http://10.3.93.148:10003' // 乔华本地服务
// const webUrl="http://192.168.43.171:10003" //oppor9
// const webUrl = 'http://192.168.3.143:10003'
    // const webUrl = 'http://localhost:10003'
    // const webUrl = 'http://121.42.233.49:10003'

export default {
    login: webUrl + '/auth/login',
    logout: webUrl + '/auth/logout',
    // info: webUrl + '/login/gettoken',
    //   -------------------专家库委员库弹窗的接口组织机构--------------------------//  /user/test2
    getAllDepartmentInterface: webUrl + '/user/treeList', // 组织结构  部门
    getusersbydeptidInterface: webUrl + '/user/getusersbydeptid', // 获取部门下的所有员工
    getSpecificNameInterface: webUrl + '/user/list', // 按姓名模糊查询 为空则查询所有
    getPersonTotal: webUrl + '/user/index', // 返回首页人员总数及人员信息前10个

    getPage: webUrl + '/user/getpage', // 分页加载状态为1（在职）的人员信息
    getTree: webUrl + '/dept/gettree', // 获取部门的tree列表 （一级节点部门）
    getList: webUrl + '/dept/getlist', // 获取所有部门列表

    // ----------专家库---------------------
    saveExpertInterface: webUrl + '/specialist/savespecialist', // 专家库编辑页面点击提交的接口
    getspecialistInterface: webUrl + '/specialist/getspecialist', // 查看最新版本专家库
    gethistorspeciaInterface: webUrl + '/specialist/gethistorspecia', // 点击查看历史版本按钮跳转到列表
    searchSpeciaInterface: webUrl + '/specialist/getspeciabyversion', // 根据版本号查专家库信息
    searchSpecia: webUrl + '/specialist/searchSpecia', // 条件搜索 专家库
    // ----------委员库---------------------
    submitMemberInterface: webUrl + '/jury/savejury', // 委员库点击发布的接口
    getjuryInterface: webUrl + '/jury/getjury', // 查询最新版委员库
    gethistorjuryInterface: webUrl + '/jury/gethistorjury', // 查询历史版本委员库
    getjurybyversion: webUrl + '/jury/getjurybyversion', // 根据版本号查看委员库信息
    searchByNameOrGroupInterface: webUrl + '/jury/searchjury', // 根据姓名或者组名查委员库
    // ----------议题库---------------------
    //   ---------------------------------代办----------------------------------------------
    getConferenceIssuesInterface: webUrl + '/conference/getIssuesByid', // 根据会议id查相关信息给委员答题
    voteIssuesInterface: webUrl + '/voteResult/vote', // 提交答题
    readInfoMationInterface: webUrl + '/juryInfoMation/readInfoMation', // 通知未读                                                                   //提交答题
    updateIssuesonLineInterface: webUrl + '/issues/updateIssuesonLine', // 切换议题的状态                                                                   //提交答题
    getJuryInfoReadInterface: webUrl + '/juryInfoMation/getJuryInfoRead', // 通知的接口                                                                   //提交答题
    deleteInterface: webUrl + '/juryInfoMation/delete', // 删除                                                                 //提交答题
    // ======================================================================================
    getIssuesByidInterface: webUrl + '/issues/getIssuesByid', // 议题库默认页点击查看的接口 and 议题详情的接口
    getAllIssuesInterface: webUrl + '/issues/getAllIssues', // 获取所有议题信息  议题库初始化调的接口
    exportById: webUrl + '/issues/exportById', // 导出议题信息
    getIssuesByCondition: webUrl + '/issues/getIssuesByCondition', // 议题页点击搜索或者筛选
    getjurydeleteIssuesInterface: webUrl + '/issues/deleteIssues', // 删除议题
    download: webUrl + '/issues/download', // 附件下载
    updateIssuesonLines: webUrl + '/issues/updateIssuesonLines', // 修改议题上会形式
    createIssuesInterface: webUrl + '/issues/saveissues', // 新建议题 点击提交待着附件的接口                                                           //议题库编辑页点击提交的接口
    uploadInterface: webUrl + '/upload/uploadToPdf', // 上传附件接口  /issues/uploadfile                //议题库编辑页点击提交的接口
    countDetailInterface: webUrl + '/conference/getConferenceInfoById', // 上会次数4   
    addAuditIssuesInterface: webUrl + '/issues/addAuditIssues', // 添加到待审议题库           
    //议题库编辑页点击提交的接口

    // ----------线上会议---------------------
    launchOnlineConferenceInterface: webUrl + '/conference/ConferenceStart', // 发起线上会议 保存
    launchOnlinIndexConferenceInterface: webUrl + '/conference/online', // 线上会议首页                                                              //线上会议列表首页
    SearchOnlineIndexConferenceInterface: webUrl + '/conference/seachConferenceByNameOnLine', // 线上会议  搜索                                                             //线上会议列表首页
    seeDetailButtonOnlineInterface: webUrl + '/conference/getConferenceDetailById', // 线上会议  查看详情                                                             //线上会议列表首页
    leaveChairInterface: webUrl + '/conference/finishConference', // 线上会议  操作列的结束会议按钮                                                             //线上会议列表首页
    submitSumaryInterface: webUrl + '/conference/uploadConferenceMeeting', // 线上会议  提交                                                             //线上会议列表首页
    uploadSummaryButtonInterface: webUrl + '/conference/getVoteNumber', // 线上会议 上传会议纪要按钮 (获取投票结果 上传会议纪要)                                                          //线上会议列表首页
    downloadTestInterface: webUrl + '/issues/download', // 线上会议  会议纪要 点击附件 下载附件                                                         //线上会议列表首页
    exportDetail: webUrl + '/conference/exportDetail', // 导出议题投票详情
    getVoteDetailByIdInterface: webUrl + '/conference/getVoteDetailById', // 根据委员编号及会议id 查看投票人员详情
    // ----------线下会议---------------------
    launchOffineIndexConferenceInterface: webUrl + '/conference/offline', // 线下会议首页                                                              //线上会议列表首页
    SearchOfflineIndexConferenceInterface: webUrl + '/conference/seachConferenceByNameOffLine', // 线下会议的搜索
    seeDetailButtonOfflineInterface: webUrl + '/conference/offlineDetailById', // 线下会议的操作列 查看按钮
    sumbitAddInterface: webUrl + '/conference/addOffline', // 新增线下会议的提交
    getIssuesByIds: webUrl + '/issues/getIssuesByIds', // 根据议题id数组 获取议题信息
    //
    getJuryInfo: webUrl + '/juryInfoMation/getJuryInfo', //代办
    // ============================================== 权限 ==============================================================/
    getAllRoleInterface: webUrl + '/permission/getAllRole', // 查询所有角色
    getRoleByContionInterface: webUrl + '/permission/getRoleByContion', // 根据条件查角色
    addRoleInterface: webUrl + '/permission/addRole', // 添加角色信息
    modifyInterface: webUrl + '/permission/updateRole', // 修改角色信息
    deleteRoleInterface: webUrl + '/permission/deleteRole', // 修改角色信息
    getAllAuthInterface: webUrl + '/permission/getAllAuth', // 查看所有权限
    reloReleAuthInterface: webUrl + '/permission/roleReleAuth', // 角色权限关联
    getMenuByRoleIdInterface: webUrl + '/permission/getMenuByRoleId', // 根据角色id查看所拥有权限
    getUserByRoleIdInterface: webUrl + '/permission/getUserByRoleId', // 根据角色id查员工
    updateRoleByUserIdInterface: webUrl + '/permission/updateRoleByUserId', // 修改员工角色关联
    uploadToPdfInterface: webUrl + '/upload/uploadToPdf', // 所有上传文件的接口  (上传文件地址[.vue])
    downloadInterface: webUrl + '/upload/download', // 所有预览  (上传文件地址[.vue])
    getToken: webUrl + '/sso/getToken', // 主系统登陆验证
    // ================================================待选议题库=============================================================================
    getAuditIssuesInterface: webUrl + '/issues/getAuditIssues', // 获取待选议题库
    deleteAuditIssuesInterface: webUrl + '/issues/deleteAuditIssues', //删除待选议题
}