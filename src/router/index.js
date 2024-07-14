import {createRouter, createWebHistory} from "vue-router";

export const constantRoutes = [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home'),
        hidden: true,
    },
    {
        name: 'order',
        path: '/order',
        component: () => import('@/views/order'),
        hidden: true,
    },
    {
        name: 'recommend',
        path: '/recommend',
        component: () => import('@/views/recommend'),
        hidden: true,
    },
    {
        name: 'route',
        path: '/route',
        component: () => import('@/views/route/case/routeOri.vue'),
        hidden: true,
    },
    {
        name: 'routeSearch',
        path: '/search',
        component: () => import('@/views/route/case/routeSearch.vue'),
        hidden: true,
    },
    {
        name: 'route',
        path: '/',
        component: () => import('@/views/route/route.vue'),
        hidden: true,
    },
    {
        name: 'mark',
        path: '/mark',
        component: () => import('@/views/route/case/marker'),
        hidden: true,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
});

export default router;

