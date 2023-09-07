/
<template>
    <div>
        <section id="dossiers-mutuelles">
            <h5>Bulletins de paie</h5>
            <!-- <div class="my-3">
                <month-picker
                    @change="showDate"
                    :lang="fr"
                    :clearable="true"
                    :editable-year="true"
                    :show-year="false"
                    :max-date="new Date()"
                    id="selectedMonth"
                />
            </div> -->
            <div class="dossiers-table">
                <table class="w-full mt-3">
                    <thead>
                        <tr>
                            <th>N° dossier</th>
                            <th>Date de dépôt</th>
                            <th>Date de remboursement</th>
                            <th>Observations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="dossier in dossiers"
                            :key="dossier.numeroDossier"
                        >
                            <td>{{ dossier.numeroDossier }}</td>
                            <td>{{ formatDate(dossier.dateDepot) }}</td>
                            <td>{{ formatDate(dossier.dateRemboursement) }}</td>
                            <td>{{ dossier.observations }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<script>
// import { MonthPicker } from "vue-month-picker";
import dossiers from "@/Js/dossiers.js";
export default {
    name: "dossiers-mutuelles-page",
    components: {
        // MonthPicker,
    },
    data() {
        return {
            dossiers,
        };
    },
    methods: {
        formatDate(date) {
            const [year, month, day] = date.split("-");
            return `${year}/${month}/${day}`;
        },
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#dossiers-mutuelles {
    .dossiers-table {
        margin: 30px;
        margin-top: 30px;
        table {
            tr {
                th,
                td {
                    padding: 10px;
                    border: 2px solid #eee;
                }
            }
        }
    }
}
</style>
