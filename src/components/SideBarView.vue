<template>
    <div>
        <div id="sidebar" ref="sidebarContainer">
            <!-- dashboard  -->
            <div
                v-if="user.poste == 'admin'"
                class="user-space-header pb-3 mb-3"
                @click="goToPage('dashboard-page')"
            >
                <h5 class="m-0" :class="{ active: isDashboardActive }">
                    Dashboard
                </h5>
            </div>
            <div class="user-space-header" @click="goToPage('myprofile-page')">
                <!-- <div class="user-space-header" @click="toggleIcons"> -->
                <h5 class="m-0" :class="{ active: isMyProfileActive }">
                    Mon espace
                </h5>
                <!-- <i v-if="showIcons" class="fa fa-chevron-up"></i>
                <i v-else class="fa fa-chevron-down"></i> -->
            </div>
            <div v-if="showIcons" class="user-space-icons">
                <div
                    class="user-space-icon"
                    @click="goToPage('myprofile-page')"
                >
                    <span :class="{ active: isProfilePageActive }"
                        >Mon profil</span
                    >
                    <i
                        class="fa fa-user"
                        :class="{ active: isProfilePageActive }"
                    ></i>
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('mypassword-page')"
                >
                    <span :class="{ active: isPasswordPageActive }"
                        >Mot de passe</span
                    >
                    <i
                        class="fa fa-lock"
                        :class="{ active: isPasswordPageActive }"
                    ></i>
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('attendance-page')"
                >
                    <span :class="{ active: isAttendanceActive }"
                        >Attendance</span
                    >
                    <i
                        class="fa fa-clock"
                        :class="{ active: isAttendanceActive }"
                    ></i>
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('hors-site-page')"
                >
                    <span :class="{ active: isHorsSiteActive }">Hors site</span>
                    <i
                        class="fa fa-map-marker"
                        :class="{ active: isHorsSiteActive }"
                    ></i>
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('bulletin-de-paie-page')"
                >
                    <span :class="{ active: isBulletinDePaieActive }"
                        >Bulletins de paie</span
                    >
                    <i
                        class="fa fa-file-invoice-dollar"
                        :class="{ active: isBulletinDePaieActive }"
                    ></i>
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('dossiers-mutuelles-page')"
                >
                    <span :class="{ active: isDossiersMutuellesActive }"
                        >Dossiers mutuelles</span
                    >
                    <i
                        class="fa-solid fa-user-doctor"
                        :class="{ active: isDossiersMutuellesActive }"
                    ></i>
                </div>
                <div class="user-space-icon" @click="goToPage('demandes-page')">
                    <span>Demandes</span>
                    <i class="fa fa-plus"></i>
                </div>
            </div>
            <!-- Gestion RH -->
            <div v-if="user.poste == 'admin' || 'RH' || 'Technicien'">
                <div class="user-space-header">
                    <!-- <div class="user-space-header" @click="toggleRHIcons"> -->
                    <h5
                        v-if="user.poste !== 'Technicien'"
                        class="m-0"
                        :class="{ active: isGestionRH }"
                        @click="goToPage('RH-demandes-page')"
                    >
                        Gestion RH
                    </h5>
                    <h5 v-else>Gestion Technicien</h5>
                    <!-- <h5 class="m-0" @click="toggleRHIcons">Gestion RH</h5> -->
                    <!-- <i v-if="showRHIcons" class="fa fa-chevron-up"></i>
                    <i v-else class="fa fa-chevron-down"></i> -->
                </div>

                <!-- RH Icons -->
                <div v-if="showRHIcons" class="user-space-icons">
                    <!-- Employés
                    <div
                        class="user-space-icon"
                        @click="goToPage('RH-employiiss-page')"
                    >
                        <span>Employés aiide</span>
                        <i class="fa fa-users"></i>
                    </div> -->
                    <div
                        v-if="user.poste !== 'Technicien'"
                        class="user-space-icon"
                        @click="goToPage('RH-employees-page')"
                    >
                        <span :class="{ active: isRHEmployees }">
                            Employés</span
                        >
                        <i
                            class="fa fa-users"
                            :class="{ active: isRHEmployees }"
                        ></i>
                    </div>
                    <!-- Pointage -->
                    <div
                        v-if="user.poste !== 'Technicien'"
                        class="user-space-icon"
                        @click="goToPage('pointage-page')"
                    >
                        <span :class="{ active: isPointage }">Pointage</span>
                        <i
                            class="fa fa-clock"
                            :class="{ active: isPointage }"
                        ></i>
                    </div>
                    <!-- Attendance -->
                    <div
                        v-if="user.poste !== 'Technicien'"
                        class="user-space-icon"
                        @click="goToPage('RHAttendance')"
                    >
                        <span>Attendance</span>
                        <i class="fa fa-calendar"></i>
                    </div>
                    <div
                        v-if="user.poste !== 'Technicien'"
                        class="user-space-icon"
                        @click="goToPage('planification-page')"
                    >
                        <span :class="{ active: isPlanification }"
                            >Planification</span
                        >
                        <i
                            class="fa fa-clock"
                            :class="{ active: isPlanification }"
                        ></i>
                    </div>
                    <!-- RH Demandes -->
                    <div
                        class="user-space-icon"
                        @click="goToPage('RH-demandes-page')"
                    >
                        <span :class="{ active: isRHDemandes }">Demandes</span>
                        <i
                            class="fa fa-file"
                            :class="{ active: isRHDemandes }"
                        ></i>
                    </div>
                </div>
            </div>
            <div v-if="user.poste == 'admin'">
                <!-- Gestion des comptes -->
                <div class="user-space-header pb-3 mb-3">
                    <h5 class="m-0">Gestion Des comptes</h5>
                </div>
            </div>
            <!-- //sign out -->
            <div
                class="signout d-flex justify-content-around align-items-center pb-3"
                @click="signOut"
            >
                <span class="fs-20">Se deconnecter</span>
                <i class="fs-25 fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "SideBarView",
    data() {
        return {
            showIcons: true,
            showRHIcons: true,
            user: null,
            scrolling: "",
        };
    },
    //we want to use props but i prefered localstorage
    // props: {
    //     user: {
    //         type: Object, // Define the prop type
    //         required: true, // Make the prop required
    //     },
    // },
    methods: {
        toggleIcons() {
            this.showIcons = !this.showIcons;
        },
        toggleRHIcons() {
            this.showRHIcons = !this.showRHIcons;
        },
        goToPage(page) {
            // Prevent default link behavior
            event.preventDefault();
            const currentRouteName = this.$route.name;
            // const redundant = [
            //     "myprofile-page",
            //     "mypassword-page",
            //     "attendance-page",
            //     "hors-site-page",
            //     "dashboard-page",
            //     "bulletins-de-paie",
            //     "bulletin-de-paie-page",
            //     "dossiers-mutuelles-page",
            //     "demandes-page",
            //     "pointage-page",
            //     "planification-page",
            //     "RH-demandes-page",
            // ];
            // for (const i of redundant) {
            //     if (page === i && currentRouteName === i) {
            //         return;
            //     }
            // }
            if (page === currentRouteName) {
                return;
            }

            // if (page === "profile" && currentRouteName === "myprofile-page") {
            //     // Already on the profile page, no need to navigate again
            //     return;
            // } else if (
            //     page === "mypassword-page" &&
            //     currentRouteName === "mypassword-page"
            // ) {
            //     // Already on the password page, no need to navigate again
            //     return;
            // } else if (
            //     page === "attendance-page" &&
            //     currentRouteName === "attendance-page"
            // ) {
            //     // Already on the attendance page, no need to navigate again
            //     return;
            // } else if (
            //     page === "hors-site-page" &&
            //     currentRouteName === "hors-site-page"
            // ) {
            //     // Already on the attendance page, no need to navigate again
            //     return;
            // } else if (
            //     page === "dashboard-page" &&
            //     currentRouteName === "dashboard-page"
            // ) {
            //     return;
            // } else if (
            //     page === "bulletins-de-paie" &&
            //     currentRouteName === "bulletins-de-paie"
            // ) {
            //     return;
            // } else if (
            //     page === "bulletin-de-paie-page" &&
            //     currentRouteName === "bulletin-de-paie-page"
            // ) {
            //     return;
            // } else if (
            //     page === "dossiers-mutuelles-page" &&
            //     currentRouteName === "dossiers-mutuelles-page"
            // ) {
            //     return;
            // } else if (
            //     page === "demandes-page" &&
            //     currentRouteName === "demandes-page"
            // ) {
            //     return;
            // }
            // Add other checks for different pages if needed
            this.$router.push({ name: page });

            // switch (page) {
            //     case "dashboard-page":
            //         this.$router.push({ name: "dashboard-page" });
            //         break;
            //     case "myprofile-page":
            //         this.$router.push({ name: "myprofile-page" });
            //         break;
            //     case "mypassword-page":
            //         this.$router.push({ name: "mypassword-page" });
            //         break;
            //     case "attendance-page":
            //         this.$router.push({ name: "attendance-page" });
            //         break;
            //     // Add cases for other pages if needed
            //     case "hors-site-page":
            //         this.$router.push({ name: "hors-site-page" });
            //         break;
            //     case "bulletin-de-paie-page":
            //         this.$router.push({ name: "bulletin-de-paie-page" });
            //         break;
            //     case "dossiers-mutuelles-page":
            //         this.$router.push({ name: "dossiers-mutuelles-page" });
            //         break;
            //     case "demandes-page":
            //         this.$router.push({ name: "demandes-page" });
            //         break;
            //     case "RH-employees-page":
            //         this.$router.push({ name: "RH-employees-page" });
            //         break;
            //     case "pointage-page":
            //         this.$router.push({ name: "pointage-page" });
            //         break;
            //     case "RH-employiiss-page":
            //         this.$router.push({ name: "RH-employiiss-page" });
            //         break;
            //     case "planification-page":
            //         this.$router.push({ name: "planification-page" });
            //         break;
            //     case "RH-demandes-page":
            //         this.$router.push({ name: "RH-demandes-page" });
            //         break;
            //     default:
            //         console.warn(`Unknown page: ${page}`);
            // }
        },
        signOut() {
            //clear  local storage
            localStorage.removeItem("user");
            // Redirect to the sign-in page
            this.$router.push({ name: "login-page" });
        },
    },
    created() {
        // Retrieve user from local storage
        const user = localStorage.getItem("user");
        if (user) {
            this.user = JSON.parse(user);
        }
    },
    computed: {
        isProfilePageActive() {
            return this.$route.name === "myprofile-page";
        },
        isPasswordPageActive() {
            return this.$route.name === "mypassword-page";
        },
        isAttendanceActive() {
            return (
                this.$route.name === "attendance-page" ||
                this.$route.name === "attendance-details"
            );
        },
        isHorsSiteActive() {
            return this.$route.name === "hors-site-page";
        },
        isDashboardActive() {
            return this.$route.name === "dashboard-page";
        },
        isMyProfileActive() {
            return (
                this.$route.name === "myprofile-page" ||
                this.$route.name === "mypassword-page" ||
                this.$route.name === "attendance-page" ||
                this.$route.name === "hors-site-page"
            );
        },
        isBulletinDePaieActive() {
            return this.$route.name === "bulletin-de-paie-page";
        },
        isDossiersMutuellesActive() {
            return this.$route.name === "dossiers-mutuelles-page";
        },
        isRHEmployees() {
            return this.$route.name === "RH-employees-page";
        },
        isPointage() {
            return this.$route.name === "pointage-page";
        },
        isRHDemandes() {
            return this.$route.name === "RH-demandes-page";
        },
        isPlanification() {
            return this.$route.name === "planification-page";
        },
        isGestionRH() {
            return (
                this.isPlanification ||
                this.isRHDemandes ||
                this.isPointage ||
                this.isRHEmployees
            );
        },
    },
    // mounted() {
    //     // Select the sidebar element using its ID
    //     // const sidebar = document.getElementById("sidebar");
    //     // // Get the scroll position (scrollTop) of the sidebar
    //     // // const scrollPosition = sidebar.scrollTop;

    //     // this.scrolling = window.scrollY;

    //     // // Use the scroll position as needed
    //     // c
    // },
};
</script>

<style lang="scss" scoped>
#sidebar {
    // top: 87px;

    // z-index: 99;
    width: var(--sidebar-width);
    // min-height: 100%;
    position: relative;
    z-index: 99;
    background-color: #f0f0f0;
    position: fixed;
    top: 0px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    background: var(--principal-color);
    .active {
        color: var(--sidebar-li-color);
    }
    .user-space-header {
        cursor: pointer;
        border-bottom: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        color: white;
        &:hover {
            color: var(--sidebar-li-color);
            border-bottom: 2px solid var(--sidebar-li-color);
        }
        i {
            padding: 5px;
        }
    }

    .user-space-icons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 10px;
        flex-direction: column;
    }

    .user-space-icon {
        padding: 5px;
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: white;
        i {
            font-size: 24px;
        }
        span.active,
        i.active {
            color: var(--sidebar-li-color);
        }
        &:hover {
            i,
            span {
                color: var(--sidebar-li-color);
            }
        }
    }
    .signout {
        cursor: pointer;
        color: #ccc;
        &:hover {
            color: white;
        }
    }
}
</style>
