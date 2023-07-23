import Vue from "vue";

import VueRouter from "vue-router";

// import HomeView from "../views/HomeView.vue";

import LoginView from "../views/Accounts/LoginView.vue";
import SignUpView from "../views/Accounts/SignUpView.vue";
import PasswordRecoveryView from "../views/Accounts/PasswordRecoveryView.vue";
import MyProfileView from "../views/AllUsers/MyProfileView.vue";
import MyPasswordChangeView from "../views/AllUsers/MyPasswordChangeView.vue";
import AttendanceView from "../views/AllUsers/AttendanceView.vue";
import AttendanceDetailsView from "../views/AllUsers/AttendanceDetailsView.vue";
import HorsSiteView from "../views/AllUsers/HorsSiteView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",

        name: "login-page",

        component: LoginView,
    },
    {
        path: "/SignUp",

        name: "signup-page",

        component: SignUpView,
    },
    {
        path: "/PasswordRecovery",

        name: "password-recovery-page",

        component: PasswordRecoveryView,
    },
    {
        path: "/MyProfile",
        name: "myprofile-page",

        component: MyProfileView,
        props: true, // i can store the user if i want using params.. easy
    },
    {
        path: "/MyPasswordChange",

        name: "mypassword-page",

        component: MyPasswordChangeView,
    },
    {
        path: "/Attendance",

        name: "attendance-page",

        component: AttendanceView,
    },
    {
        path: "/Attendance/:id",

        component: AttendanceDetailsView,
        name: "attendance-details",
    },
    {
        path: "/HorsSite",

        name: "hors-site-page",

        component: HorsSiteView,
    },
];

const router = new VueRouter({
    mode: "history",

    base: process.env.BASE_URL,

    routes,
});

export default router;
