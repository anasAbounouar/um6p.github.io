<template>
    <div>
        <section id="autorisation-absence">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <table>
                            <thead class="title">
                                <th colspan="3">Liste des demandes</th>
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
                            </thead>
                            <tbody>
                                <tr
                                    v-for="absencee in GeneralFilter"
                                    :key="absencee.id"
                                    @click.prevent="
                                        goToEmployeeDetails(absencee.id)
                                    "
                                >
                                    <td>
                                        {{ absencee.id }}
                                    </td>
                                    <td>
                                        {{
                                            getEmployee(absencee.demandeur)
                                                .prenom
                                        }}
                                        {{
                                            getEmployee(absencee.demandeur).nom
                                        }}
                                    </td>
                                    <td>
                                        {{
                                            getEmployee(absencee.employeeId).nom
                                        }}

                                        {{
                                            getEmployee(absencee.employeeId)
                                                .prenom
                                        }}
                                    </td>
                                    <td>
                                        <ul>
                                            <li
                                                v-for="startDate in Object.keys(
                                                    absencee.startDates
                                                )"
                                                :key="startDate"
                                            >
                                                {{ startDate }}
                                            </li>
                                            <!-- {{
                                                this.extractFirstDateAndMonth(
                                                    absencee.startDates
                                                )
                                            }} -->
                                        </ul>
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
import absence from "@/Js/absence";
export default {
    name: "RH-autorisation-absence",
    components: {
        // VSelect, // Register the VSelect component
    },
    data() {
        return {
            employees,
            absence,
            searchDemandeur: "",
            searchBeneficiaire: "",
            searchNumero: "",
            searchDate: "",
        };
    },
    methods: {
        getEmployee(employeeId) {
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
    },
    computed: {
        uniqueStartDates() {
            const uniqueDates = new Set();
            this.absence.forEach((absencee) => {
                Object.keys(absencee.startDates).forEach((date) => {
                    uniqueDates.add(date);
                });
            });
            return Array.from(uniqueDates);
        },
        filterDemandeur() {
            if (this.searchDemandeur === "") {
                return this.absence;
            } else {
                const regex = new RegExp(this.searchDemandeur, "i");
                return this.absence.filter((absencee) => {
                    return (
                        regex.test(this.getEmployee(absencee.demandeur).nom) ||
                        regex.test(this.getEmployee(absencee.demandeur).prenom)
                    );
                });
            }
        },
        filterBeneficiaire() {
            if (this.searchBeneficiaire === "") {
                return this.absence;
            } else {
                const regex = new RegExp(this.searchBeneficiaire, "i");
                return this.absence.filter((absencee) => {
                    return (
                        regex.test(this.getEmployee(absencee.employeeId).nom) ||
                        regex.test(this.getEmployee(absencee.employeeId).prenom)
                    );
                });
            }
        },
        filterNumero() {
            if (this.searchNumero === "") {
                return this.absence;
            } else {
                return this.absence.filter((absencee) => {
                    return absencee.id == this.searchNumero;
                });
            }
        },
        filterDate() {
            if (this.searchDate !== "") {
                const regex = new RegExp(this.searchDate, "i");
                return this.absence.filter((absencee) => {
                    return Object.keys(absencee.startDates).some((date) =>
                        regex.test(date)
                    );
                });
            } else {
                return this.absence;
            }
        },
        GeneralFilter() {
            const filteredBeneficiaire = this.filterBeneficiaire;
            const filteredDemandeur = this.filterDemandeur;
            const filteredNumero = this.filterNumero;
            const filteredDateDebut = this.filterDate;

            return this.absence.filter((absencee) => {
                console.log(Object.keys(absencee.startDates));
                return (
                    filteredBeneficiaire.includes(absencee) &&
                    filteredDemandeur.includes(absencee) &&
                    filteredNumero.includes(absencee) &&
                    filteredDateDebut.includes(absencee) &&
                    Object.keys(absencee.startDates).length > 0
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
