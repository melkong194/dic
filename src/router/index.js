import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { RouteRecordRaw } from 'vue-router';


const routes = [
  {
    path: '/',
    redirect: '/letters'
  },
  {
    path: '/letters',
    name: 'Home',
    component: () => import('../views/pages/Home.vue')
  },
  {
    path: '/translate',
    component: () => import('../views/pages/Translation.vue')
  },
  {
    path: '/words',
    component: () => import('../views/pages/Words.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
