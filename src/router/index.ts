import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Vending from '../views/Vending.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Vending',
    component: Vending
  },
]

const router = new VueRouter({
  routes
})

export default router
