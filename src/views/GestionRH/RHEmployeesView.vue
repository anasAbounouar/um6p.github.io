<template>
    <div>
        <SideBarView />
        <NavBarView />
        <section id="employees">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div
                            class="activity-filter d-flex align-items-center justify-content-around"
                        >
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="all"
                                    checked
                                />
                                Tout
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                />
                                Actif
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                />
                                Inactif
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
export default {
    name: "RH-employees-page",
    components: {
        SideBarView,
        NavBarView,
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
</style>
