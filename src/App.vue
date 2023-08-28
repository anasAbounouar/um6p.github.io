<!-- eslint-disable vue/no-parsing-error -->
<!--eslint-disable -->
<template>
    <div id="app">
        <SideBarView v-if="shouldShowBar" />
        <NavBarView v-if="shouldShowBar" />
        <router-view />
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
const routesWithoutSidebarAndNavbar = ["/"];

export default {
    components: { NavBarView, SideBarView },
    computed: {
        shouldShowBar() {
            return !routesWithoutSidebarAndNavbar.includes(this.$route.path);
        },
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;

    -moz-osx-font-smoothing: grayscale;

    text-align: center;

    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;

        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
