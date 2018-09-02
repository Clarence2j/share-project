// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { post } from './fetch/api'

Vue.config.productionTip = false
Vue.prototype.$post = post;
//引入sass
require('./common/scss/index.scss')
//引入mock
require('./mock.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
