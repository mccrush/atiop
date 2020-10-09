//import Vue from 'vue'
//import Router from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'
import { auth } from "@/firebase.js";

//Vue.use(Router)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'all',
      component: () => import('../views/AllTasks.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('../views/Plan.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('../views/Review.vue'),
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
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/Calendar.vue'),
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
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: () => import('../views/NotFound.vue')
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
