import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import SearchPage from '/@/pages/SearchPage.vue';

export const RoutePaths = {
  search: '/',
};

const history = createWebHistory();
const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.search,
    component: SearchPage,
  },
];

export const router = createRouter({ history, routes });
