import { createRouter, createWebHistory } from "vue-router";

const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path:'/',
                name: 'home',
                component: HomeView
            },
            {
                path:'/:catchAll(.*)',
                name: 'not-found',
                component: NotFound,
            },
            
            
        ],
    },
);

export default router