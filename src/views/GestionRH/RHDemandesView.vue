<template>
    <div>
        <SideBarView /> <NavBarView />
        <section id="RH-demandes" class="vh-100 d-flex align-items-center">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-10 RH-demandes-wrapper">
                        <div>
                            <div
                                class="RH-demande-wrapper"
                                @click.prevent="
                                    goToPage('RH-autorisation-absence')
                                "
                            >
                                <h5>Demandes d'Absences</h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>Demandes de Presence</h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>Demande de main d’oeuvre hors site</h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>
                                    Demande hebdomadaire interne de la main
                                    d'œuvre
                                </h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>
                                    Informations pour la préparation d'ordre de
                                    mission
                                </h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>Déplacements hors site</h5>
                            </div>
                        </div>
                    </div>
                    .
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
// import absence from "@/Js/absence";
export default {
    name: "RH-demandes-page",
    components: {
        SideBarView,
        NavBarView,
    },
    methods: {
        goToPage(page) {
            switch (page) {
                case "RH-autorisation-absence":
                    this.$router.push({
                        name: "RH-autorisation-absence",
                    });
                    break;
                case "AttendanceM":
                    this.$router.push({
                        name: "attendance-details",
                        params: { id: "mois" },
                    });
                    break;
                case "SyntheseM":
                    this.$router.push({
                        name: "attendance-details",
                        params: { id: "SyntheseMois" },
                    });
                    break;
                case "SyntheseS":
                    this.$router.push({
                        name: "attendance-details",
                        params: { id: "SyntheseS" },
                    });
                    break;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
#RH-demandes {
    padding-left: calc(var(--sidebar-width) + 25px);
    .RH-demandes-wrapper {
        border-radius: 3px;
        background: var(--secondary-grey2-color);
        > div {
            padding: 10px;
        }
    }
    .RH-demande-wrapper {
        border-radius: 3px;
        transition: 0.3s;
        cursor: pointer;
        background: var(--nature-color);
        padding: 10px;
        &:hover {
            color: white;
            background: var(--link-hovered-color);
        }
    }
}
</style>
