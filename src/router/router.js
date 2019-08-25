import Vue from 'vue'
import VueRouter from 'vue-router'

// eslint-disable-next-line import/no-duplicates
import login from '@/view/login.vue'
// eslint-disable-next-line import/no-duplicates
import home from '@/view/home.vue'
import welcome from '@/view/welcome.vue'
import userlist from '@/view/user/users.vue'
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
      component: home,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        },
        {
          name: 'userlist',
          path: 'userlist',
          component: userlist
        }
      ]
    }
  ]
})
