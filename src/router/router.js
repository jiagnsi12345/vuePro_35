import Vue from 'vue'
import VueRouter from 'vue-router'

// eslint-disable-next-line import/no-duplicates
import login from '@/view/login.vue'
// eslint-disable-next-line import/no-duplicates
import home from '@/view/home.vue'
import welcome from '@/view/welcome.vue'
import user from '@/view/user/users.vue'
import rightList from '@/view/rights/rightList'
import roleList from '@/view/rights/roleList.vue'
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
          name: 'user',
          path: 'user',
          component: user
        },
        {
          name: 'rights',
          path: 'rights',
          component: rightList
        },
        {
          name: 'roles',
          path: 'roles',
          component: roleList
        }
      ]
    }
  ]
})
