import {createRouter, createWebHistory} from "vue-router";

export const constantRoutes = [
    {
        name: 'home',
        path: '/',
        component: () => import('@/views/home'),
        hidden: true,
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true,
    },
    {
        path: '/register',
        component: () => import('@/views/register'),
        hidden: true
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
    {
        name: 'starHotel',
        path: '/guest/starhotels',
        component: () => import('@/views/hotel/starhotels/index'),
        hidden: true
    },
    {
        name: 'nonStarHotel',
        path: '/guest/nonstarhotels',
        component: () => import('@/views/hotel/nonstarhotels/index'),
        hidden: true
    },
    {
        path: '/guest/starhotels/details/:hotelId',
        component: () => import('@/views/hotel/starhotels/details'),
        hidden: true
    },
    {
        path: '/guest/nonstarhotels/details/:hotelId',
        component: () => import('@/views/hotel/nonstarhotels/details'),
        hidden: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
});

export default router;

