import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../Views/HomeView.vue";
import ServicesView from "../Views/ServicesView.vue";
import BookAppointmentLogin from "../Views/BookAppointmentLoginView.vue";
import LogInView from "../Views/LogInView.vue";
import SignUpView from "../Views/SignUpView.vue";
import AdminLogInView from "../Views/AdminLogInView.vue";
import BookAppointmentView from "../Views/BookAppointmentView.vue";
import test from "../components/test/test.vue";
import AdminHomeView from "../Views/AdminHomeView.vue";
import MemberHomeView from "../Views/MemberHomeView.vue";

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
            {
                path:'/book-appointment',
                name: 'bookApptPage',
                component: BookAppointmentView
            },
            {
                path:'/test',
                name: 'test',
                component: test
            },
            {
                path:'/admin/home',
                name: 'adminDashboard',
                component: AdminHomeView,
                meta: { requiresAuth: true },
            },
            {
                path:'/member/home',
                name: 'memberDashboard',
                component: MemberHomeView,
            },
        ],
    },
);

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      const token = localStorage.getItem('token');
      //const admin = JSON.parse(atob(token.split('.')[1]));
      //console.log(admin.payload.admin) // i can check for admin status here
      // i need to check the token if the payload contains admin: true
      if (token) {
        // User is authenticated as admin, proceed to the route
        next();
      } else {
        // User is not authenticated, redirect to login
        next('/auth/login');
      }
    } else {
      // Non-protected route, allow access
      next();
    }
  });

export default router