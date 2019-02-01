import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
const constantRouterMap = router.options.routes
router.beforeEach((to, from, next) => {
  //NProgress.start()
  if (localStorage.getItem('roleType') !== '1') {
    constantRouterMap.forEach(item => {
      if(item.name === '权限'||item.name === '线下会议管理'){
        item.hidden = true
      }
    })
    store.dispatch('RoutingPermissions',constantRouterMap)
    next()
   // NProgress.start()
  }else{
    constantRouterMap.forEach(item => {
    if(item.name === '权限'||item.name === '线下会议管理'){
        item.hidden = false
    }
    })
    store.dispatch('RoutingPermissions',constantRouterMap)
    next()
   // NProgress.start()
  }
})

router.afterEach(() => {
  //NProgress.done() // 结束Progress
})
