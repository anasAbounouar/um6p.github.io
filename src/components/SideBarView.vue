<template>
    <div>
        <div id="sidebar">
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
            <div class="user-space-header" @click="toggleIcons">
                <h5 class="m-0" :class="{ active: isMyProfileActive }">
                    Mon espace
                </h5>
                <i
                    v-if="showIcons"
                    class="fa fa-chevron-up"
                    @click="toggleIcons"
                ></i>
                <i v-else class="fa fa-chevron-down" @click="toggleIcons"></i>
            </div>
            <div v-if="showIcons" class="user-space-icons">
                <div class="user-space-icon" @click="goToPage('profile')">
                    <i
                        class="fa fa-user"
                        :class="{ active: isProfilePageActive }"
                    ></i>
                    <span :class="{ active: isProfilePageActive }"
                        >Mon profil</span
                    >
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('mypassword-page')"
                >
                    <i
                        class="fa fa-lock"
                        :class="{ active: isPasswordPageActive }"
                    ></i>
                    <span :class="{ active: isPasswordPageActive }"
                        >Mot de passe</span
                    >
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('attendance-page')"
                >
                    <i
                        class="fa fa-clock"
                        :class="{ active: isAttendanceActive }"
                    ></i>
                    <span :class="{ active: isAttendanceActive }"
                        >Attendance</span
                    >
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('hors-site-page')"
                >
                    <i
                        class="fa fa-map-marker"
                        :class="{ active: isHorsSiteActive }"
                    ></i>
                    <span :class="{ active: isHorsSiteActive }">Hors site</span>
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('bulletin-de-paie-page')"
                >
                    <i class="fa fa-file-invoice-dollar"></i>
                    <span>Bulletins de paie</span>
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('dossiers-mutuelles-page')"
                >
                    <i class="fa fa-heart"></i>
                    <span>Dossiers mutuelles</span>
                </div>
                <div class="user-space-icon" @click="goToPage('demandes-page')">
                    <i class="fa fa-plus"></i>
                    <span>Demande</span>
                </div>
            </div>
            <!-- Gestion RH -->
            <div
                v-if="user.poste == 'admin'"
                class="user-space-header"
                @click="toggleRHIcons"
            >
                <h5 class="m-0" @click="toggleRHIcons">Gestion RH</h5>
                <i
                    v-if="showRHIcons"
                    class="fa fa-chevron-up"
                    @click="toggleRHIcons"
                ></i>
                <i v-else class="fa fa-chevron-down" @click="toggleRHIcons"></i>
            </div>

            <!-- RH Icons -->
            <div v-if="showRHIcons" class="user-space-icons">
                <!-- Employés -->
                <div
                    class="user-space-icon"
                    @click="goToPage('RH-employiiss-page')"
                >
                    <i class="fa fa-users"></i>
                    <span>Employés aiide</span>
                </div>
                <div
                    class="user-space-icon"
                    @click="goToPage('RH-employees-page')"
                >
                    <i class="fa fa-users"></i>
                    <span>Employés</span>
                </div>
                <!-- Pointage -->
                <div class="user-space-icon" @click="goToPage('pointage-page')">
                    <i class="fa fa-clock"></i>
                    <span>Pointage</span>
                </div>
                <!-- Attendance -->
                <div class="user-space-icon" @click="goToPage('RHAttendance')">
                    <i class="fa fa-calendar"></i>
                    <span>Attendance</span>
                </div>
                <!-- Demande -->
                <div class="user-space-icon" @click="goToPage('RHDemande')">
                    <i class="fa fa-file"></i>
                    <span>Demande</span>
                </div>
            </div>
            <!-- Gestion des comptes -->
            <div
                v-if="user.poste == 'admin'"
                class="user-space-header pb-3 mb-3"
            >
                <h5 class="m-0">Gestion Des comptes</h5>
            </div>
            <!-- //sign out -->
            <div
                class="signout d-flex justify-content-around align-items-center pb-3"
                @click="signOut"
            >
                <i class="fs-25 fa-solid fa-arrow-right-from-bracket"></i>
                <span class="fs-20">Se deconnecter</span>
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
            const currentRouteName = this.$route.name;

            if (page === "profile" && currentRouteName === "myprofile-page") {
                // Already on the profile page, no need to navigate again
                return;
            } else if (
                page === "mypassword-page" &&
                currentRouteName === "mypassword-page"
            ) {
                // Already on the password page, no need to navigate again
                return;
            } else if (
                page === "attendance-page" &&
                currentRouteName === "attendance-page"
            ) {
                // Already on the attendance page, no need to navigate again
                return;
            } else if (
                page === "hors-site-page" &&
                currentRouteName === "hors-site-page"
            ) {
                // Already on the attendance page, no need to navigate again
                return;
            } else if (
                page === "dashboard-page" &&
                currentRouteName === "dashboard-page"
            ) {
                return;
            } else if (
                page === "bulletins-de-paie" &&
                currentRouteName === "bulletins-de-paie"
            ) {
                return;
            }
            // Add other checks for different pages if needed

            switch (page) {
                case "dashboard-page":
                    this.$router.push({ name: "dashboard-page" });
                    break;
                case "profile":
                    this.$router.push({ name: "myprofile-page" });
                    break;
                case "mypassword-page":
                    this.$router.push({ name: "mypassword-page" });
                    break;
                case "attendance-page":
                    this.$router.push({ name: "attendance-page" });
                    break;
                // Add cases for other pages if needed
                case "hors-site-page":
                    this.$router.push({ name: "hors-site-page" });
                    break;
                case "bulletin-de-paie-page":
                    this.$router.push({ name: "bulletin-de-paie-page" });
                    break;
                case "dossiers-mutuelles-page":
                    this.$router.push({ name: "dossiers-mutuelles-page" });
                    break;
                case "demandes-page":
                    this.$router.push({ name: "demandes-page" });
                    break;
                case "RH-employees-page":
                    this.$router.push({ name: "RH-employees-page" });
                    break;
                case "pointage-page":
                    this.$router.push({ name: "pointage-page" });
                    break;
                case "RH-employiiss-page":
                    this.$router.push({ name: "RH-employiiss-page" });
                    break;
                default:
                    console.warn(`Unknown page: ${page}`);
            }
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
    },
};
</script>

<style lang="scss" scoped>
#sidebar {
    top: 87px;

    z-index: 99;
    min-width: var(--sidebar-width);
    min-height: 100%;
    position: absolute;
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
