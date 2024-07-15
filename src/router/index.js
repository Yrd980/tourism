import {createRouter, createWebHistory} from "vue-router";

export const constantRoutes = [
    {
        name: 'home',
        path: '/',
        component: () => import('@/views/home'),
        hidden: true,
    },
    {
        name: 'scenic',
        path: '/scenic',
        component: () => import('@/views/scenic'),
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
        component: () => import('@/views/route/route.vue'),
        hidden: true,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
});

export default router;

