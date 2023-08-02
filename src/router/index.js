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
import DashboardView from "../views/AdminUser/DashboardView.vue";
import BulletinsDePaieView from "../views/AllUsers/BulletinsDePaieView.vue";
import DossiersMutuellesView from "../views/AllUsers/DossiersMutuellesView.vue";
import DemandesView from "../views/AllUsers/DemandeView.vue";
import DemandesDetailsView from "../views/AllUsers/DemandesDetailsView";

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
        path: "/Dashboard",
        name: "dashboard-page",
        component: DashboardView,
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
    {
        path: "/BulletinsDePaie",

        name: "bulletin-de-paie-page",

        component: BulletinsDePaieView,
    },
    {
        path: "/DossiersMutuelles",

        name: "dossiers-mutuelles-page",

        component: DossiersMutuellesView,
    },
    {
        path: "/Demandes",

        name: "demandes-page",

        component: DemandesView,
    },
    {
        path: "/Demandes/:type",

        name: "demande-details",

        component: DemandesDetailsView,
    },
];

const router = new VueRouter({
    mode: "history",

    base: process.env.BASE_URL,

    routes,
});

export default router;
