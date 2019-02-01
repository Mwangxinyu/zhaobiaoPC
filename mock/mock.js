/**
 * 模拟后台服务器
 */
const koa = require('koa')
const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')
const serve = require('koa-static')
const app = koa()
const path = require('path')

app.use(compress())
app.use(serve(path.join(__dirname, 'www')))
app.use(bodyParser())
// x-response-time
app.use(function * (next) {
  const start = new Date()
  this.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, POST, PUT,DELETE',
    'Access-Control-Allow-Headers': ' Origin, X-Requested-With,Authorization,Content-Type, Accept'
  })
  try {
    yield next
    const ms = new Date() - start
    this.set({
      'X-Response-Time': ms + 'ms'
    })
    console.log(`${this.url} ${this.method} ${ms}ms`)
  } catch (err) {
    console.log('捕获了程序的异常', new Date(), err)
  }
})
app.use(function * (next) {
  // 模拟权限认证失败
  // if (this.request.headers['authorization'] === '' && this.method !== 'OPTIONS' && this.url !== '/api/login') {
  //   this.body = {
  //     code: 201,
  //     msg: '登录失效'
  //   }
  // }
  yield next
  if (this.body) {
    this.body = this.body
  }
})
// 配置路由
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(19000, () => {
  console.log('start mock server')
})
