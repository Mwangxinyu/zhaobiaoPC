import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '首页',
    hidden: true,
    children: [{
      name: '首页',
      path: '/index',
      component: ()=>import('@/views/homePage/index')
    }]
  },
  {
    name: '首页',
    path: '/',
    redirect: '/index',
    component: Layout,
    children: [
      {
        name: '首页',
        path: '/index',
        component: ()=>import('@/views/homePage/index'),
        meta: { title: '首页',icon: 'example' }
      },
      {
        name: '投票',
        path: '/vote/:id',
        hidden: true,
        component: () =>
            import ('@/views/homePage/vote'),
        meta: { title: '投票页面', icon: 'link' }
    },
    {
        name: '查看详情',
        path: '/detail/:id',
        hidden: true,
        component: () =>
            import ('@/views/homePage/detail'),
        meta: { title: '查看详情', icon: 'link' }
    },
    ]
  },
  {
    path: '/expertLibrary',
    component: Layout,
    name: '专家库',
    children: [
      {
        name: '专家库预览页面',
        path: '/expertDetail/',
        component: ()=>import('@/views/expertLibrary/expertDetail'),
        meta: { title: '专家库',icon: 'user' }
      },
      {
        name: '专家库新增页面',
        path: '/newEdit/:version',
        hidden: true,
        component: ()=>import('@/views/expertLibrary/newEdit'),
        meta: { title: '专家库',icon: 'link' }
      },
      {
        name: '记录',
        path: '/record',
        hidden: true,
        component: ()=>import('@/views/expertLibrary/record'),
        meta: { title: '专家库',icon: 'link' }
      }
    ]
  },
  {
    name: '委员库',
    path: '/memberLibrary',
    component: Layout,
    children: [
      {
        name: '委员库预览页面',
        path: '/memberDetail',
        component: ()=>import('@/views/memberLibrary/index'),
        meta: { title: '委员库',icon: 'nested' }
      },
      {
        name: '委员库记录页',
        hidden: true,
        path: '/committeeRecord',
        component: ()=>import('@/views/memberLibrary/committeeRecord'),
        meta: { title: '委员库记录页',icon: 'link' }
      },
      {
        name: '委员库编辑页',
        hidden: true,
        path: '/memberEdit/:version',
        component: ()=>import('@/views/memberLibrary/memberEdit'),
        meta: { title: '委员库编辑页',icon: 'link' }
      },
      {
        name: '新增编辑页面',
        hidden: true,
        path: '/nullEdit',
        component: ()=>import('@/views/memberLibrary/nullEdit'),
        meta: { title: '编辑页',icon: 'link' }
      }
    ]
  },
  {
    path: '/issueLibrary',
    component: Layout,
    name: '议题库',
    children: [
      {
        name: '议题库',
        path: '/issueLibrary',
        component: ()=>import('@/views/issueLibrary/issueList'),
        meta: { title: '议题库',icon: 'link' }
      },
      {
        name: '议题库查看详情',
        path: '/IssueTranslation',
        hidden: true,
        component: ()=>import('@/views/issueLibrary/IssueTranslation'),
        meta: { title: '议题库',icon: 'link' }
      },
      {
        name: '新增议题库页面',
        path: '/newIssues',
        hidden: true,
        component: ()=>import('@/views/issueLibrary/newIssues'),
        meta: { title: '议题新增库',icon: 'link' }
      },
      {
        name: '编辑议题库页面',
        path: '/issueEditor',
        hidden: true,
        component: ()=>import('@/views/issueLibrary/issueEditor'),
        meta: { title: '编辑',icon: 'link' }
      },
    
      {
        name: '议题库',
        path: '/demo',
        hidden: true,
        component: ()=>import('@/views/issueLibrary/demo'),
        meta: { title: '测试',icon: 'link' }
      },
      {
        name: '议题库上会次数页面',
        path: '/meetingCount',
        hidden: true,
        component: ()=>import('@/views/issueLibrary/meetingCount'),
        meta: { title: '测试',icon: 'link' }
      }, 
      {
        name: '待选议题库',
        path: '/alternativeIssues',
        hidden: true,
        component: ()=>import('@/views/issueLibrary/alternativeIssues'),
        meta: { title: '待选议题库',icon: 'link' }
      },
      {
        name: '待选议题库详情',
        path: '/alternativeIssuesDetail',
        hidden: true,
        component: ()=>import('@/views/issueLibrary/alternativeIssuesDetail'),
        meta: { title: '待选议题库详情',icon: 'link' }
      }
    ]
  },
  {
    name: '线上会议管理',
    path: '/online',
    component: Layout,
    children: [
      {
        name: '线上会议管理',
        path: '/onlineList/',
        component: ()=>import('@/views/online/onlineList'),
        meta: { title: '线上会议管理',icon: 'form' }
      },
      {
        name: '线上会议详情页面',
        path: '/meetingDetail/:id',
        hidden: true,
        component: ()=>import('@/views/online/meetingDetail'),
        meta: { title: '详情页',icon: 'link' }
      },
      {
        name: '上传会议纪要',
        path: '/uploadNotes/:id',
        hidden: true,
        component: ()=>import('@/views/online/uploadNotes'),
        meta: { title: '上传会议纪要页',icon: 'link' }
      },
      {
        name: '线上会议管理',
        path: '/adminSee',
        hidden: true,
        component: ()=>import('@/views/online/adminSee'),
        meta: { title: '管+理员查看投票情况',icon: 'link' }
      },
      {
        name: '线上会议管理',
        path: '/membersVoting',
        hidden: true,
        component: ()=>import('@/views/online/membersVoting'),
        meta: { title: '委员投票',icon: 'link' }
      },
      {
        name: '发起线上会议',
        path: '/launch',
        hidden: true,
        component: ()=>import('@/views/online/launch'),
        meta: { title: '发起线上会议页面',icon: 'link' }
      },
      {
        name: '整体和查看',
        path: '/wholeCast',
        hidden: true,
        component: ()=>import('@/views/online/wholeCast'),
        meta: { title: '管理员查看整体和查看页面',icon: 'link' }
      },
     {
        name: '已投票人员详情',
        path: '/voteDetail',
        component: () => import('@/views/online/voteDetail'),
        meta: { title: '已投票人员详情', icon: 'link' },
        hidden: true
      },
      {
        name: '普通用户',
        path: '/person',
        component: () => import('@/views/online/person'),
        meta: { title: '普通用户', icon: 'link' },
        hidden: true
      }
    ]
  },
  {
    name: '线下会议管理',
    path: '/offline',
    component: Layout,
    children: [
      {
        name: '线下会议管理',
        path: '/offline',
        component: ()=>import('@/views/offline/index'),
        meta: { title: '线下会议管理',icon: 'table' }
      },
      {
        name: '线下会议新增',
        path: '/add',
        hidden: true,
        component: ()=>import('@/views/offline/add'),
        meta: { title: '线下会议新增',icon: 'offline' }
      },
      {
        name: '线下会议管理',
        path: '/addNext',
        hidden: true,
        component: ()=>import('@/views/offline/addNext'),
        meta: { title: '线下会议管理',icon: 'offline' }
      },
      {
        name: '线下会议详情',
        path: '/offlineDetail/:id',
        hidden: true,
        component: ()=>import('@/views/offline/offlineDetail'),
        meta: { title: '线下会议详情',icon: 'offline' }
      },
      {
        name: '线下编辑',
        path: '/offlineEditor',
        hidden: true,
        component: ()=>import('@/views/offline/offlineEditor'),
        meta: { title: '线下编辑',icon: 'offline' }
      }
    ]
  },
  {
    name: '权限',
    path: '/Jurisdiction',
    component: Layout,
    children: [
      {
        name: '角色管理',
        path: '/role',
        component: ()=>import('@/views/Jurisdiction/role'),
        meta: { title: '角色管理',icon: 'password' }
      },
      {
        name: '角色详情',
        path: '/editDetail',
        hidden: true,
        component: ()=>import('@/views/Jurisdiction/editDetail'),
        meta: { title: '角色详情',icon: 'roleManagement' }
      }
    ]
  }, {
    path: '/mainSystemLogin/:pageType',
    name: 'mainSystemLogin',
    hidden: true,
    component: () => import('@/views/login/mainSystemLogin')
  }, 
  { path: '/login',component: ()=>import('@/views/login/index'),hidden: true },
  { path: '/404',component: ()=>import('@/views/404'),hidden: true }
]
export default new Router({
   mode: 'history', //后端支持可开
  scrollBehavior: ()=>({ y: 0 }),
  routes: constantRouterMap
})
