import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: HelloWorld
    },
    {
      path : '/swipper',
      name : 'Swipper',
      component : Index
    },
    {
      path : '/btn',
      name : 'Btn',
      component : Index
    }
  ]
})
