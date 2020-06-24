import Vue from 'vue'
import Router from 'vue-router'
import { auth } from "@/main.js";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/Projects.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create',
      component: () => import('../views/Create.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/general',
      component: () => import('../views/General.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/plans',
      component: () => import('../views/Plans.vue'),
      // ВКЛЮЧИТЬ на продакшине
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      component: () => import('../views/About.vue'),
      // ВКЛЮЧИТЬ на продакшине
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   if (to.hash) {
  //     return {
  //       selector: to.hash,
  //       //offset: { y: 250 }
  //     }
  //   }
  // }
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 3
  if (requiresAuth) {
    if (currentUser) {
      next()
    } else {
      next('login')
    }
  } else {
    next()
  }
})

export default router
