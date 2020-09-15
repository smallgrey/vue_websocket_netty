import Vue from 'vue'
import App from './App'
import store from "./store"
import config from './config/index.js'
import "./utils/vant.js"


Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$config = config

App.mpType = 'app'

import BottomTabBar from "./components/template/nav/tabBar.vue"
// 公用组件
Vue.component("bottom-tab-bar",BottomTabBar)

const app = new Vue({
  store,
  ...App
})
app.$mount()
