<template>
    <div>
        <section id="presence" v-if="isPresence" class="container">
            presence lala
        </section>
        <section id="absence" v-if="isAbsence">
            <h5 class="c-brand m-auto mt-3">Autorisation d'absence</h5>
            <div class="my-table">
                <div class="col-12">
                    <table>
                        <thead class="title">
                            <th colspan="6">Liste des demandes</th>
                        </thead>
                        <thead>
                            <th>
                                <input
                                    class="w-full"
                                    type="number"
                                    v-model="searchNumero"
                                    placeholder="N°"
                                />
                            </th>
                            <th>
                                <input
                                    class="w-full"
                                    type="text"
                                    v-model="searchDemandeur"
                                    placeholder="Demandeur"
                                />
                            </th>
                            <th>
                                <input
                                    class="w-full"
                                    type="text"
                                    v-model="searchBeneficiaire"
                                    placeholder="Beneficiaire"
                                />
                            </th>
                            <th>
                                <input
                                    class="w-full"
                                    type="text"
                                    v-model="searchDate"
                                    placeholder="Date de debut"
                                />
                            </th>
                            <th>
                                <input
                                    class="w-full"
                                    type="text"
                                    placeholder="Date de fin"
                                />
                            </th>
                            <th><span class="mx-2">autorisation</span></th>
                        </thead>
                        <tbody>
                            <tr
                                v-for="demandeAbsence in GeneralFilter"
                                :key="demandeAbsence.id"
                                @click.prevent="
                                    goToEmployeeDetails(demandeAbsence.id)
                                "
                            >
                                <td>
                                    {{ demandeAbsence.id }}
                                </td>
                                <td>
                                    {{
                                        getEmployeeById(
                                            demandeAbsence.demandeur
                                        ).prenom
                                    }}
                                    {{
                                        getEmployeeById(
                                            demandeAbsence.demandeur
                                        ).nom
                                    }}
                                </td>
                                <td>
                                    {{
                                        getEmployeeById(
                                            demandeAbsence.employeeId
                                        ).prenom
                                    }}
                                    {{
                                        getEmployeeById(
                                            demandeAbsence.employeeId
                                        ).nom
                                    }}
                                </td>
                                <td>
                                    {{ demandeAbsence.debutAbsenceDate }}
                                </td>
                                <td>
                                    {{ demandeAbsence.endAbsenceDate }}
                                </td>
                                <td>
                                    {{ demandeAbsence.authorisation }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import absences from "@/Js/P&A";
import demandesAbsences from "@/Js/demandesAbsences";
import employees from "@/Js/employees";
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
            employees,
            demandesAbsences,
            searchDemandeur: "",
            searchBeneficiaire: "",
            searchNumero: "",
            searchDate: "",
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
        filterDemandeur() {
            if (this.searchDemandeur === "") {
                return this.demandesAbsences;
            } else {
                const regex = new RegExp(this.searchDemandeur, "i");
                return this.demandesAbsences.filter((demandeAbsence) => {
                    return (
                        regex.test(
                            this.getEmployeeById(demandeAbsence.demandeur).nom
                        ) ||
                        regex.test(
                            this.getEmployeeById(demandeAbsence.demandeur)
                                .prenom
                        )
                    );
                });
            }
        },
        filterBeneficiaire() {
            if (this.searchBeneficiaire === "") {
                return this.demandesAbsences;
            } else {
                const regex = new RegExp(this.searchBeneficiaire, "i");
                return this.demandesAbsences.filter((demandeAbsence) => {
                    return (
                        regex.test(
                            this.getEmployeeById(demandeAbsence.employeeId).nom
                        ) ||
                        regex.test(
                            this.getEmployeeById(demandeAbsence.employeeId)
                                .prenom
                        )
                    );
                });
            }
        },
        filterNumero() {
            if (this.searchNumero === "") {
                return this.demandesAbsences;
            } else {
                return this.demandesAbsences.filter((demandeAbsence) => {
                    return demandeAbsence.id == this.searchNumero;
                });
            }
        },
        filterDate() {
            if (this.searchDate !== "") {
                const regex = new RegExp(this.searchDate, "i");
                return this.demandesAbsences.filter((demandeAbsence) => {
                    // return demandeAbsence.debutAbsenceDate((date) =>
                    //     regex.test(date)
                    // );
                    return regex.test(demandeAbsence.debutAbsenceDate);
                });
            } else {
                return this.demandesAbsences;
            }
        },
        GeneralFilter() {
            const filteredBeneficiaire = this.filterBeneficiaire;
            const filteredDemandeur = this.filterDemandeur;
            const filteredNumero = this.filterNumero;
            const filteredDateDebut = this.filterDate;

            return this.ourDemandes.filter((demandeAbsence) => {
                return (
                    filteredBeneficiaire.includes(demandeAbsence) &&
                    filteredDemandeur.includes(demandeAbsence) &&
                    filteredNumero.includes(demandeAbsence) &&
                    filteredDateDebut.includes(demandeAbsence) &&
                    Object.keys(demandeAbsence.debutAbsenceDate).length > 0
                );
            });
        },
        ourDemandes() {
            console.log("thsi is user id ", this.user.id);
            return this.demandesAbsences.filter((demande) => {
                console.log(demande.demandeur);
                return (
                    demande.employeeId === this.user.id ||
                    demande.demandeur === this.user.id
                );
            });
        },
    },
    methods: {
        getEmployeeById(employeeId) {
            return this.employees.find((employee) => {
                return employee.id === employeeId;
            });
        },
    },
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
table {
    width: 100%;
    th,
    td {
        position: relative;
        border: 1px solid #eee;
        // width: 180px;
        select {
            width: 100%;
        }
        input {
            padding: 10px;
            border: none;
            border-radius: 5px;
            outline: none;
            transition: border-color 0.3s ease-in-out;
        }
        input::placeholder {
            color: black;
        }
    }
    thead.title {
        th {
            height: 80px;
            span {
                height: 40px;
                width: 40px;
            }
        }
    }
}
</style>
