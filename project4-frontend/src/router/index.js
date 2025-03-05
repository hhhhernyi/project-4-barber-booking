import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../Views/HomeView.vue";
import ServicesView from "../Views/ServicesView.vue";
import BookAppointmentLogin from "../Views/BookAppointmentLoginView.vue";
import LogInView from "../Views/LogInView.vue";
import SignUpView from "../Views/SignUpView.vue";
import AdminLogInView from "../Views/AdminLogInView.vue";

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
                path:'/services',
                name: 'services',
                component: ServicesView
            },
            {
                path:'/auth/login-booking',
                name: 'bookAppointmentLogin',
                component: BookAppointmentLogin
            },
            {
                path:'/auth/login',
                name: 'loginPage',
                component: LogInView
            },
            {
                path:'/auth/admin-login',
                name: 'adminLogInPage',
                component: AdminLogInView
            },
            {
                path:'/auth/signup',
                name: 'signupPage',
                component: SignUpView
            },
        ],
    },
);

export default router