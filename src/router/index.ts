import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/compositionApi',
    name: 'compositionApi',
    component: () => import('@/views/CompositionApi.vue')
  },
  {
    path: '/axiosUse',
    name: 'axiosUse',
    component: () => import('@/views/AxiosUse.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
