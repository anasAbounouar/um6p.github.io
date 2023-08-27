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
import RHEmployeesView from "../views/GestionRH/RHEmployeesView.vue";
import RHDetailsEmployeesView from "../views/GestionRH/RHDetailsEmployeesView.vue";
import RHEmployiissView from "../views/GestionRH/RHEmployiissView.vue";
import RHNewEmployeeView from "../views/GestionRH/RHNewEmployeeView.vue";
import PointageView from "../views/GestionRH/PointageView.vue";
import PointageSuppView from "../views/GestionRH/PointageSuppView.vue";
import PlanificationView from "../views/GestionRH/PlanificationView.vue";
import RHDemandesView from "../views/GestionRH/RHDemandesView.vue";
import AutorisationAbsenceView from "../views/GestionRH/AutorisationAbsenceView.vue";

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
    {
        path: "/RHEmployees",

        name: "RH-employees-page",

        component: RHEmployeesView,
    },
    {
        path: "/RHEmployees/:id",

        name: "RH-employees-details",

        component: RHDetailsEmployeesView,
    },
    {
        path: "/RHNewEmployee",

        name: "RH-employees-new",

        component: RHNewEmployeeView,
    },
    {
        path: "/Pointage",

        name: "pointage-page",

        component: PointageView,
    },
    {
        path: "/Pointage/:id/:mydate",

        name: "pointage-supp",

        component: PointageSuppView,
    },
    {
        path: "/Planification",

        name: "planification-page",

        component: PlanificationView,
    },
    {
        path: "/AutorisationAbsence",

        name: "RH-autorisation-absence",

        component: AutorisationAbsenceView,
    },
    {
        path: "/RHDemandes",

        name: "RH-demandes-page",

        component: RHDemandesView,
    },
    {
        path: "/RHEmployeeshelp",

        name: "RH-employiiss-page",

        component: RHEmployiissView,
    },
];

const router = new VueRouter({
    mode: "history",

    base: process.env.BASE_URL,

    routes,
});

export default router;
