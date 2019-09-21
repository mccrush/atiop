import Vue from 'vue'
import Router from 'vue-router'
import { auth } from "@/main.js";
import Home from './views/Home.vue'
//import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

//export default 
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/404', // Первая, для перекрытия остальных
      name: '404',
      component: NotFound
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/app',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    // {
    //   path: '/logout',
    //   name: 'logout',
    //   component: Logout
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    },
    {
      path: '*', // Для всех прочих кроме существующих
      redirect: '/404'
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