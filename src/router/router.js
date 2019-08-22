import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/view/login.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: login
    }
  ]
})
