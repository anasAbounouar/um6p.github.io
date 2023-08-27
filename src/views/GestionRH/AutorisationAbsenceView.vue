<template>
    <div>
        <SideBarView />
        <NavBarView />
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
                                                    absencee.starDates
                                                )"
                                                :key="startDate"
                                            >
                                                {{ startDate }}
                                            </li>
                                            <!-- {{
                                                absencee.starDates
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
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
import employees from "@/Js/employees";
import absence from "@/Js/absence";
export default {
    name: "RH-autorisation-absence",
    components: {
        SideBarView,
        NavBarView,
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
                console.log(selectedEmployee.nom);
                console.log(selectedEmployee.prenom);
                return selectedEmployee;
            } else {
                console.log("No employee found with the specified id.");
                return null;
            }
        },
    },
    computed: {
        uniqueStartDates() {
            const uniqueDates = new Set();
            this.absence.forEach((absencee) => {
                Object.keys(absencee.starDates).forEach((date) => {
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
                    return Object.keys(absencee.starDates).some((date) =>
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
            console.log(filteredDateDebut);

            return this.absence.filter((absencee) => {
                return (
                    filteredBeneficiaire.includes(absencee) &&
                    filteredDemandeur.includes(absencee) &&
                    filteredNumero.includes(absencee) &&
                    filteredDateDebut.includes(absencee)
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
