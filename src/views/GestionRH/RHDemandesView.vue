<template>
    <div>
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
                                <h5>Demandes de Presence x</h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>Demande de main d’oeuvre hors site x</h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>
                                    Demande hebdomadaire interne de la main
                                    d'œuvre x
                                </h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>
                                    Informations pour la préparation d'ordre de
                                    mission x
                                </h5>
                            </div>
                        </div>
                        <div>
                            <div class="RH-demande-wrapper" @click.prevent="">
                                <h5>Déplacements hors site x</h5>
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
// import absence from "@/Js/absence";
export default {
    name: "RH-demandes-page",

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
