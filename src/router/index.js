import Vue from 'vue'
import Router from 'vue-router'
import { auth } from "@/main.js";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'projects',
      component: () => import('../views/Projects.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/Project.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/Create.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/general',
      name: 'general',
      component: () => import('../views/General.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import('../views/Plans.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
  ],
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 3
  if (requiresAuth) {
    if (currentUser) {
      next()
    } else {
      next('about')
    }
  } else {
    next()
  }
})

export default router
