import Vue from 'vue'
import App from './App'

import * as util from "@/utils/index.js"
import store from '@/store/index.js'
const $api = require("@/api/index.js")

// 混入小程序更新
const updateVersion = require('@/mixins/updateVersion.js')
const mixins = require('@/mixins/index.js')

// 路由拦截
util.routeIntercept()
uni.$router.beforeEnter = function(to, from, next,options,type){
  next({ options, type })
}
uni.$router.afterEach = function(to, from,complete){
  // console.log(to, from,complete)
}

const loadings = util.loading()

Vue.mixin(updateVersion)
Vue.mixin(mixins)

Vue.prototype.$u = util;
Vue.prototype.$api = $api;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
