<template>
    <div>
        <section id="attendance" class="vh-100 d-flex align-items-center">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-10 attendances-wrapper">
                        <div>
                            <div
                                class="attendance-wrapper"
                                @click.prevent="goToPage('AttendanceJ')"
                            >
                                <h5>Attendance de la journée</h5>
                            </div>
                        </div>
                        <div>
                            <div
                                class="attendance-wrapper"
                                @click.prevent="goToPage('AttendanceM')"
                            >
                                <h5>Attendance d’un mois</h5>
                            </div>
                        </div>
                        <div>
                            <div
                                class="attendance-wrapper"
                                @click.prevent="goToPage('SyntheseM')"
                            >
                                <h5>Synthèse du pointage du mois</h5>
                            </div>
                        </div>
                        <div>
                            <div
                                class="attendance-wrapper"
                                @click.prevent="goToPage('SyntheseS')"
                            >
                                <h5>Synthèse des heures supplémentaire</h5>
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
export default {
    name: "attendance-page",
    methods: {
        goToPage(page) {
            switch (page) {
                case "AttendanceJ":
                    this.$router.push({
                        name: "attendance-details",
                        params: { id: "journe" },
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
#attendance {
    padding-left: calc(var(--sidebar-width) + 25px);
    .attendances-wrapper {
        border-radius: 3px;
        background: var(--secondary-grey2-color);
        > div {
            padding: 10px;
        }
    }
    .attendance-wrapper {
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
