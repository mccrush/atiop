import Vue from 'vue'
import Router from 'vue-router'
import { auth } from "@/main.js";
import About from './views/About.vue'
import Signin from './views/Signin.vue'
import Login from './views/Login.vue'
import App from './views/App.vue'


Vue.use(Router)

//export default 
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/about'
    },
    {
      path: '/',
      redirect: '/about'
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/app',
      name: 'app',
      component: App,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 3
  if (requiresAuth) {
    if (currentUser) {
      next()
    } else {
      next('/about')
    }
  } else {
    next()
  }
})

export default router