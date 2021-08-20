// 引入依赖  
import Vue from 'vue'
import Vuex from 'vuex'  
import createPersistedState from 'vuex-persistedstate'

import initState from "./state.js"
import actions from "./actions.js"
import mutations from "./mutations.js"

Vue.use(Vuex)

let cloneDeep =(data)=>{//深度copy一份数据
  return JSON.parse(JSON.stringify(data))
}

export default new Vuex.Store({
  state:cloneDeep(initState),
  mutations,
  actions,
  plugins: [
    // 可以有多个持久化实例  
    createPersistedState({
      key: 'wbyc_config_data',  // 状态保存到本地的 key   
      paths: ["apiServer","tk","loginName"],  // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c   
      storage: {  // 存储方式定义  
        getItem: (key) => uni.getStorageSync(key), // 获取  
        setItem: (key, value) => uni.setStorageSync(key, value), // 存储  
        removeItem: (key) => uni.removeStorageSync(key) // 删除  
      }
    })
  ]  
})