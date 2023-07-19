import Vue from "vue";

import VueRouter from "vue-router";

// import HomeView from "../views/HomeView.vue";

import LoginView from "../views/Accounts/LoginView.vue";
import SignUpView from "../views/Accounts/SignUpView.vue";
import PasswordRecoveryView from "../views/Accounts/PasswordRecoveryView.vue";
import MyProfileView from "../views/AllUsers/MyProfileView.vue";

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
        props: true,
    },
];

const router = new VueRouter({
    mode: "history",

    base: process.env.BASE_URL,

    routes,
});

export default router;
