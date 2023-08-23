<template>
    <div>
        <SideBarView />
        <NavBarView />
        <section id="employees">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div
                            class="activity-filter d-flex align-items-center justify-content-around"
                        >
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="All"
                                    checked
                                    v-model="selectedActivityStatus"
                                />
                                Tout
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Actif"
                                    v-model="selectedActivityStatus"
                                />
                                Actif
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Inactif"
                                    v-model="selectedActivityStatus"
                                />
                                Inactif
                            </label>
                        </div>
                    </div>
                    <div class="col-12">
                        <table>
                            <thead class="title">
                                <th colspan="5">Liste des employees</th>
                                <th
                                    class="d-flex align-items-center justify-content-center"
                                    @click="goToaddNewEmployee"
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
                                        type="text"
                                        v-model="searchMatricule"
                                        placeholder="Matricule"
                                    />
                                </th>
                                <th>Nom</th>
                                <th>
                                    <input
                                        class="w-full"
                                        type="text"
                                        v-model="searchPrenom"
                                        placeholder="Prenom"
                                    />
                                </th>
                                <th>CIN</th>
                                <th>
                                    <select
                                        name=""
                                        id=""
                                        v-model="selectedPoste"
                                    >
                                        <option selected>Poste</option>
                                        <option
                                            :value="poste"
                                            v-for="poste in postes"
                                            :key="poste"
                                        >
                                            {{ poste }}
                                        </option>
                                    </select>
                                    <i class="fa-solid fa-caret-down"></i>
                                </th>
                                <th>
                                    <select
                                        name=""
                                        id=""
                                        v-model="selectedEmployeur"
                                    >
                                        <option selected>Employeur</option>
                                        <option
                                            :value="employeur"
                                            v-for="employeur in employeurs"
                                            :key="employeur"
                                        >
                                            {{ employeur }}
                                        </option>
                                    </select>
                                    <i class="fa-solid fa-caret-down"></i>
                                </th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="employee in GeneralFilter"
                                    :key="employee.id"
                                    @click.prevent="
                                        goToEmployeeDetails(employee.id)
                                    "
                                >
                                    <td>
                                        {{ employee.matricule }}
                                    </td>
                                    <td>
                                        {{ employee.nom }}
                                    </td>
                                    <td>
                                        {{ employee.prenom }}
                                    </td>
                                    <td>
                                        {{ employee.cin }}
                                    </td>
                                    <td>
                                        {{ employee.poste }}
                                    </td>
                                    <td>
                                        {{ employee.employeur }}
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
export default {
    name: "RH-employees-page",
    components: {
        SideBarView,
        NavBarView,
        // VSelect, // Register the VSelect component
    },
    data() {
        return {
            employees,
            selectedActivityStatus: "All",
            postes: ["Agent agricole", "Technicien", "RH", "Admin"],
            selectedPoste: "Poste",
            selectedEmployeur: "Employeur",
            employeurs: ["Best Profile", "UM6P"],
            searchMatricule: "",
            searchPrenom: "",
        };
    },
    methods: {
        goToEmployeeDetails(employeeID) {
            this.$router.push({
                name: "RH-employees-details",
                params: { id: employeeID },
            });
        },
        goToaddNewEmployee() {
            this.$router.push({ name: "RH-employees-new" });
        },
    },
    computed: {
        postesFilter() {
            if (this.selectedPoste === "Poste") {
                console.log("now we return employees");
                return employees;
            } else {
                return this.employees.filter((employee) => {
                    return employee.poste === this.selectedPoste;
                });
            }
        },
        employeurFilter() {
            if (this.selectedEmployeur === "Employeur") {
                return employees;
            } else {
                return this.employees.filter((employee) => {
                    return employee.employeur === this.selectedEmployeur;
                });
            }
        },
        GeneralFilter() {
            const postesFiltered = this.postesFilter; // Invoke the method
            const employeurFiltered = this.employeurFilter; // Invoke the method
            const matriculeFiltered = this.matriculeFilter;
            const prenomFiltered = this.prenomFilter;
            const activityStatus = this.selectedActivityStatus;
            if (activityStatus === "All") {
                const result = postesFiltered.filter((employee) => {
                    return (
                        employeurFiltered.includes(employee) &&
                        matriculeFiltered.includes(employee) &&
                        prenomFiltered.includes(employee)
                    );
                });
                return result;
            } else {
                const result = postesFiltered.filter((employee) => {
                    return (
                        employeurFiltered.includes(employee) &&
                        matriculeFiltered.includes(employee) &&
                        prenomFiltered.includes(employee) &&
                        employee.activité === activityStatus
                    );
                });
                return result;
            }
        },
        matriculeFilter() {
            if (this.searchMatricule === "") {
                return employees;
            } else {
                const regex = new RegExp(this.searchMatricule, "i", "g");
                console.log(regex);
                const result = this.employees.filter((employee) => {
                    return regex.test(employee.matricule);
                });
                console.log(result);
                return result;
            }
        },
        prenomFilter() {
            if (this.searchPrenom === "") {
                return employees;
            } else {
                const regex = new RegExp(this.searchPrenom, "i", "g");
                console.log(regex);
                const result = this.employees.filter((employee) => {
                    return regex.test(employee.prenom);
                });
                console.log(result);
                return result;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#employees {
    .activity-filter {
        label,
        input {
            cursor: pointer;
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
    select {
        font-size: 16px;
        padding: 8px;
        border: none;
        border-radius: 4px;
        margin-right: 10px;
        &:focus {
            border: 1px solid #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
            outline: none;
        }
    }
}
</style>
