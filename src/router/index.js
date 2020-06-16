import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/Projects.vue')
    },
    {
      path: '/create',
      component: () => import('../views/Create.vue')
    },
    {
      path: '/general',
      component: () => import('../views/General.vue')
    },
    {
      path: '/plans',
      component: () => import('../views/Plans.vue')
    },
    {
      path: '/about',
      component: () => import('../views/About.vue')
    }
  ]
})
