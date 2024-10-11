import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/bikes-list',
      name: 'bikes-list',
      component: () => import('../views/BikesListView.vue')
    },
    {
      path: '/bike-rental/:id',
      name: 'bike-rental/:id',
      component: () => import('../views/BikeRentalView.vue')
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: () => import('../views/ThanksView.vue')
    }
  ]
})

export default router
