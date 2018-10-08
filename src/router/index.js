import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import { resolve } from 'uri-js';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: HelloWorld
    },
    {
      path : '/swipper1',
      name : 'Swipper1',
      component : Index
    },
    {
      path : '/swipper2',
      name : 'Swipper2',
      component : resolve => require(['@/components/swipper2'] , resolve)
    },
    {
      path : '/swipper3',
      name : 'Swipper3',
      component : resolve => require(['@/components/swipper3'] , resolve)
    },
    {
      path : '/swipper4',
      name : 'Swipper4',
      component : resolve => require(['@/components/swipper4'] , resolve)
    },
    {
      path : '/mockIndex',
      name : 'mockIndex',
      component : resolve => require(['@/components/mock-index'] , resolve)
    },
    {
      path : '/mock',
      name : 'mock',
      component : resolve => require(['@/components/mock-test'] , resolve)
    },
    {
      path : '/btn',
      name : 'Btn',
      component : Index
    }
  ]
})
