import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Vending from '../views/Vending.vue'
import Admin from '../views/Admin.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Vending',
    component: Vending
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Admin' && to.query.key != '256'){
    next({
      path: '/',
      replace: true
    })
  } else {
    next();
  }
});

export default router
