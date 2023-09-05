<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div class="container-fluid">
                <a
                    @click="goToPage('myprofile-page')"
                    class="navbar-brand"
                    href="#"
                    ><img src="@/assets/ferme2.png" alt="this is a logo"
                /></a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" @click="goToPage('myprofile-page')">
                        <!-- <li class="nav-item me-3 notification">
                            <a class="nav-link p-relative" href="#"
                                ><i class="fa-regular fa-bell"></i
                            ></a>
                        </li> -->
                        <router-link
                            tag="li"
                            class="nav-item d-flex align-items-center"
                            to="/MyProfile"
                        >
                            <i class="fa-regular fa-user"></i>
                            <a class="nav-link" href="#"
                                >{{ user && user.nom }}
                                {{ user && user.prenom }}</a
                            >
                        </router-link>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name: "NavBarView",
    data() {
        return {
            user: null,
        };
    },
    created() {
        const user = localStorage.getItem("user");
        if (user) {
            this.user = JSON.parse(user);
        }
    },
    methods: {
        goToPage(page) {
            const currentRouteName = this.$route.name;
            // Prevent default link behavior
            if (page === currentRouteName) {
                return;
            }
            this.$router.push({ name: page });
        },
    },
};
</script>
<style lang="scss" scoped>
nav {
    margin-left: var(--sidebar-width);
    // width: 100%;
    height: 86px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    // padding-left: calc(var(--sidebar-width) + 25px);
    .navbar-brand {
        img {
            max-height: 60px;
        }
    }
    #navbarNav {
        justify-content: flex-end;
        margin-right: 10px;
    }
    ul {
        align-items: baseline;
        li {
            i {
                font-size: 20px;
            }
            &.notification {
                a::before {
                    position: absolute;
                    content: "";
                    right: 0;
                    top: 0;
                    background: var(--link-hovered-color);
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>
