import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '@/views/Import.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/import',
  },
  {
    path: '/import',
    name: 'Import',
    component: HomeView,
  },
  {
    path: '/export',
    name: 'Export',
    component: () => import('@/views/Export.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
