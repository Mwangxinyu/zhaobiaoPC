import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // permission control
import 'babel-polyfill'
import promise from 'es6-promise';
promise.polyfill();
import enclosure from '@/components/enclosure/enclosure'
Vue.component('enclosure',enclosure)
Vue.use(ElementUI,{ locale })
Vue.config.productionTip = false
Vue.prototype.getNowDate = function() {
  var date = new Date()
  var sign1 = '-'
  var sign2 = ':'
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1 // 月
  var day = date.getDate() // 日
  var hour = date.getHours() // 时
  var minutes = date.getMinutes() // 分
  var seconds = date.getSeconds() // 秒
  // var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  // var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  return year + sign1 + month + sign1 + day + ' ' + hour + sign2 + minutes + sign2 + seconds + ' '
}
/**
 * TODO 需要抽出一个公共方法
 * 数组对象根据某一个属性去重
 * @param arr
 * @param name
 * @returns {*}
 */
Vue.prototype.fnArrayUnique = function(arr,name) {
  const hash = {}
  return arr.reduce(function(item,next) {
    hash[next[name]] ? '' : hash[next[name]] = item.push(next)
    return item
  },[])
}
new Vue({
  el: '#app',
  router,
  store,
  render: h=>h(App)
})
