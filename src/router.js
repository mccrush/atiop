import Vue from 'vue'
import Router from 'vue-router'
import { auth } from "@/main.js";
import About from './views/About.vue'
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
      name: 'about',
      component: About
    },
    {
      path: '/app',
      name: 'app',
      component: App,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: function () {
    //     return import(/* webpackChunkName: "about" */ './views/About.vue')
    //   }
    // },
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
      next('/')
    }
  } else {
    next()
  }
})

export default router