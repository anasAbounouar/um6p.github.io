<template>
    <div>
        <section id="presence" v-if="isPresence" class="container">
            presence lala
        </section>
        <section id="absence" v-if="isAbsence">
            <h5 class="c-brand m-auto mt-3">Autorisation d'absence</h5>
            <div class="my-table">
                <table class="w-full mt-3">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Demandeur</th>
                            <th>Benificier</th>
                            <th>Date</th>
                            <th>
                                <div class="filter-container">
                                    <select name="" v-model="selectedEtat">
                                        <option
                                            value=""
                                            disabled
                                            hidden
                                            selected
                                        >
                                            Etat
                                        </option>
                                        <option
                                            v-for="option in etatOptions"
                                            :key="option.id"
                                        >
                                            {{ option.label }}
                                        </option>
                                    </select>
                                    <i
                                        class="fa-solid fa-sort-down p-absolute"
                                    ></i>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="absence in filteredAbsences"
                            :key="absence.id"
                        >
                            <td>{{ absence.id }}</td>
                            <td>{{ absence.demandeur.name }}</td>
                            <td>{{ absence.beneficiaire.name }}</td>
                            <td>{{ absence.date }}</td>
                            <td>
                                <i
                                    class="fa-solid"
                                    :class="etatBetter(absence)"
                                ></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<script>
import absences from "@/Js/P&A";
export default {
    name: "demandes-details",
    data() {
        return {
            isPresence: this.$route.params.type === "presence",
            isAbsence: this.$route.params.type === "absence",
            etatOptions: [
                { id: 0, label: "Tout" },
                { id: 1, label: "validé" },
                { id: 2, label: "refusé" },
                { id: 3, label: "enCours" },
            ],
            selectedEtat: "",
            user: null,
            absences,
        };
    },
    computed: {
        filteredAbsences() {
            // Return all projects if no filter is selected
            if (this.selectedEtat === "" || this.selectedEtat === "Tout") {
                return this.logicAbsence;
            }

            // Otherwise, filter the projects based on the selected etatValidation state
            return this.logicAbsence.filter((absence) => {
                if (this.selectedEtat === "validé") {
                    return absence.etat === true;
                } else if (this.selectedEtat === "refusé") {
                    return absence.etat === false;
                } else {
                    return absence.etat === "enCours";
                }
            });
        },
        logicAbsence() {
            return this.absences.filter((absence) => {
                return (
                    absence.demandeur.matricule === this.user.matricule ||
                    absence.beneficiaire.matricule === this.user.matricule
                );
            });
        },
        etatBetter() {
            return (absence) => {
                if (absence.etat === true) {
                    return "fa-check c-nature";
                } else if (absence.etat === "enCours") {
                    return "fa-spinner";
                } else {
                    return "fa-xmark c-red";
                }
            };
        },
    },
    methods: {},
    created() {
        const user = localStorage.getItem("user");
        if (user) {
            this.user = JSON.parse(user);
        }
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
.my-table {
    padding: 10px;
    table {
        tr {
            th,
            td {
                padding: 10px;
                border: 2px solid #eee;
            }
        }
    }
    .filter-container {
        cursor: pointer;
        font-size: 14px;
        line-height: 1.5;

        select {
            cursor: pointer;
            padding: 15px;
            margin-left: 15px;
            &:focus {
                outline: none;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
                color: var(--link-hovered-color);
            }
            option {
                border-top: 1px solid #ebebeb;
                font-weight: 40px;
                color: #5f6467;
                padding: 5px;
                background-color: #f0f0f0; /* Replace with your desired background color for all options */
                color: #333; /* Replace with your desired text color for all options */
            }
        }
        position: relative;
        i {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -3px;
        }
    }
}
// #absence {

// }
</style>
