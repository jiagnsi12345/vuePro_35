import Vue from 'vue'
import VueRouter from 'vue-router'

// eslint-disable-next-line import/no-duplicates
import login from '@/view/login.vue'
// eslint-disable-next-line import/no-duplicates
import home from '@/view/login.vue'
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
    },
    {
      name: 'home',
      path: '/home',
      component: home
    }
  ]
})
