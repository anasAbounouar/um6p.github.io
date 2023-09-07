<template>
    <div>
        <section id="autorisation-absence">
            <div class="container p-relative">
                <div class="row">
                    <div class="col-12">
                        <table data-aos="fade-down">
                            <thead class="title">
                                <th colspan="5">Liste des demandes</th>
                                <th
                                    class="d-flex align-items-center justify-content-center"
                                >
                                    <span
                                        @click="
                                            goToPage('demande-absence-page')
                                        "
                                        class="btn rounded-circle btn-primary d-flex align-items-center justify-content-center"
                                        ><i class="fa-solid fa-plus"></i
                                    ></span>
                                </th>
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
            </div>
        </section>
    </div>
</template>
<script>
import employees from "@/Js/employees";
import demandesAbsences from "@/Js/demandesAbsences";
export default {
    name: "RH-autorisation-absence",
    components: {
        // VSelect, // Register the VSelect component
    },
    data() {
        return {
            employees,
            demandesAbsences,
            searchDemandeur: "",
            searchBeneficiaire: "",
            searchNumero: "",
            searchDate: "",
        };
    },
    methods: {
        getEmployeeById(employeeId) {
            const selectedEmployee = this.employees.find((employee) => {
                return employee.id === employeeId;
            });

            if (selectedEmployee) {
                return selectedEmployee;
            } else {
                console.log("No employee found with the specified id.");
                return null;
            }
        },
        goToPage(page) {
            if (page === "demande-absence-page") {
                this.$router.push({ name: "demande-absence-page" });
            }
        },
        extractFirstDateAndMonth(startDates) {
            const firstDateKey = Object.keys(startDates)[0];
            const [year, month] = firstDateKey.split("-");
            const firstDateObject = startDates[firstDateKey];

            return {
                firstDateObject,
                year,
                month,
            };
        },
        goToEmployeeDetails(demandeId) {
            this.$router.push({
                name: "RH-autorisation-absence-details",
                params: { demandeId: demandeId },
            });
        },
    },
    computed: {
        uniqueStartDates() {
            const uniqueDates = new Set();
            this.demandesAbsences.forEach((demandeAbsence) => {
                Object.keys(demandeAbsence.startDates).forEach((date) => {
                    uniqueDates.add(date);
                });
            });
            return Array.from(uniqueDates);
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

            return this.demandesAbsences.filter((demandeAbsence) => {
                return (
                    filteredBeneficiaire.includes(demandeAbsence) &&
                    filteredDemandeur.includes(demandeAbsence) &&
                    filteredNumero.includes(demandeAbsence) &&
                    filteredDateDebut.includes(demandeAbsence) &&
                    Object.keys(demandeAbsence.debutAbsenceDate).length > 0
                );
            });
        },
    },
};
</script>
<style lang="scss" scoped>
#autorisation-absence {
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
            .fa-caret-down {
                top: 50%;
                transform: translateY(-50%);
                right: 10px;
                position: absolute;
            }
            input {
                padding: 10px;
                border: none;
                border-radius: 5px;
                outline: none;
                transition: border-color 0.3s ease-in-out;
                &:focus {
                    border: 0.1px solid #007bff;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }
            }
            input::placeholder {
                color: black;
            }
        }
        tr {
            cursor: pointer;
            transition: 0.2s;
            &:hover {
                border: 1px solid var(--link-hovered-color);
                box-shadow: 0 0 5px var(--link-hovered-color);
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
}
</style>
