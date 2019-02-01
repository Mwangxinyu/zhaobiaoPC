import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 500000, // 请求超时时间
  withCredentials: true
})
// request拦截器
service.interceptors.request.use(
  config=>{
    // if (store.getters.token) {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error=>{
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response=>{
    return response.data
  },
  err=>{
    // 响应状态码 非200 都直接跳转对应路由 业务code 不为200 由对应业务自己处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求参数错误'
          break
        case 401:
          if (router.history.current.name === 'mainSystemLogin') {
            window.location.href = 'http://192.168.2.1cas49//oauth2.0/authorize?client_id=5b6cfbb2015b0000&redirect_uri=' + window.location.origin +
            '/mainSystemLogin/' + JSON.stringify({
              path: router.history.current.path.split('/')[2],
              id: router.history.current.query.id ? router.history.current.query.id : '',
              getToken: true
            })
          } else {
            // 清空Storage
            window.localStorage.clear()
            window.sessionStorage.clear()
            // 跳转登陆
            router.push({
              path: '/login'
            })
          }
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
        case 405:
          // 跳转首页
          router.push({
            path: '/'
          })
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          break
        case 502:
          err.message = '网关错误'
          break
        case 308:
          break
        case 309:
          break
        case 302:
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }

    Message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)

export default service
