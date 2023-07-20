<template>
    <div>
        <SideBarView />
        <NavBarView />

        <section id="attendance-j" v-if="isAttendanceJourne" class="container">
            <h5>Attendance de la journé</h5>

            <div class="row mt-3 justify-content-center align-items-center">
                <v-app class="col-6">
                    <v-date-picker
                        v-model="selectedDate"
                        :landscape="landscape"
                        :min="minDate"
                        :max="maxDate"
                    ></v-date-picker>
                </v-app>
                <div class="mytable col-6">
                    <table class="m-auto mt-3">
                        <thead>
                            <tr>
                                <th>Heures de Présence</th>
                                <th>Heures sups</th>
                                <th>Total jour ouvré</th>
                                <th>Total Hs</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>5</td>
                                <td>1</td>
                                <td>5</td>
                                <td>7</td>
                                <td>11</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section id="attendance-m" v-if="isAttendanceMois">
            This is attencane mois plaaaaaaaace
        </section>
        <section id="synthese-m" v-if="isSyntheseM">
            This is isSyntheseM mois plaaaaaaaace
        </section>
        <section id="synthese-s" v-if="isSyntheseS">
            This is isSyntheseS mois plaaaaaaaace
        </section>
    </div>
</template>

<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
export default {
    components: { SideBarView, NavBarView },
    name: "attendance-details",
    data() {
        return {
            isAttendanceJourne: this.$route.params.id === "journe",
            isAttendanceMois: this.$route.params.id === "mois",
            isSyntheseM: this.$route.params.id === "SyntheseMois",
            isSyntheseS: this.$route.params.id === "SyntheseS",
            selectedDate: new Date().toISOString().substr(0, 10),
            landscape: false,
            //  selectedDate: new Date(), // Default selected date is today
            minDate: "2017-01-01", // Set the minimum selectable date
            maxDate: new Date().toISOString().substr(0, 10), // Set the maximum selectable date
        };
    },
};
</script>
<style lang="scss" scoped>
#attendance-j {
    padding-left: calc(var(--sidebar-width) + 25px);
    .mytable {
        // margin-top: 30px;
        padding: 10px;
        border: 3px solid #eee;
        border-radius: 4px;
        table {
            tr {
                th,
                td {
                    padding: 10px;
                }
            }
        }
    }
}
</style>
