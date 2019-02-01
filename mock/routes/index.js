/**
 * 路由配置模块
 * @module routes
 */

const router = require('koa-router')()
const url = require('../../src/api/url')

const user = require('./user')
const payment = require('./payment')

router.get(url.payment,function() {
  this.body = payment.payment
})
// login
router.post(url.login,function() {
  this.body = user.login
})
// logout
router.get(url.logout,function() {
  this.body = user.logout
})
// gettoken
router.get(url.info,function() {
  this.body = user.getUserInfo
})
/* *************** demo **********************/
router.post(url.payment,function() {
  this.body = payment.payment
})

module.exports = router
