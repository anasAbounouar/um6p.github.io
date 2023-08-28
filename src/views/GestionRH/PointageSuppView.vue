<template>
    <div>
        <section id="pointage-supp">
            <div class="container">
                <h5 class="mx-3">
                    Ajout des heures supplementaires pour
                    {{ getEmployee.prenom }} {{ getEmployee.nom }} le
                    {{ getselectedDate }}
                </h5>
                <div class="row align-items-center mt-3">
                    <div class="col-12">
                        <table>
                            <thead>
                                <tr>
                                    <th>Entrée</th>
                                    <th>Sortie</th>
                                    <th>Heures supp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="time"
                                            v-model="suppEntrée"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="time"
                                            v-model="suppSortie"
                                        />
                                    </td>
                                    <td>
                                        {{
                                            calculateHoursDifference(
                                                suppEntrée,
                                                suppSortie
                                            )
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12 d-flex">
                        <span
                            class="btn btn-success m-3"
                            v-if="!isValidatedSupp"
                            @click.prevent="validerHeuresSupp"
                            >Valider<i class="ms-2 fa-solid fa-thumbs-up"></i
                        ></span>
                        <span
                            class="btn btn-danger m-3"
                            v-if="isValidatedSupp"
                            @click.prevent="annulerHeuresSupp"
                            >Annuler<i class="ms-2 fa-solid fa-xmark"></i
                        ></span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import employees from "@/Js/employees";
import Swal from "sweetalert2";
export default {
    name: "pointage-supp",
    data() {
        return {
            employees,
            suppEntrée: "",
            suppSortie: "",
            heuresSupp: {},
            isValidatedSupp: false,
        };
    },
    computed: {
        getEmployee() {
            const employeeId = this.$route.params.id;
            return this.employees.find((employee) => {
                return employee.id === employeeId;
            });
        },
        getselectedDate() {
            const selectedDate = this.$route.params.mydate;
            return selectedDate;
        },
    },
    methods: {
        calculateHoursDifference(entrée, sortie) {
            if (entrée === null || sortie === null) {
                // console.log("entré is null or sortie is null");
                return 0;
            } else if (entrée === "" || sortie === "") {
                // console.log("entré is null or sortie is null");
                return 0;
            } else {
                // console.log("no one is null");
                const entréeTime = new Date(`1970-01-01T${entrée}`);
                const sortieTime = new Date(`1970-01-01T${sortie}`);
                const timeDifference = (sortieTime - entréeTime) / 1000; // Time difference in seconds
                const hours = Math.floor(timeDifference / 3600); // Get hours
                const minutes = Math.floor((timeDifference % 3600) / 60); // Get minutes
                const decimalHours = hours + minutes / 60; // Convert to decimal hours
                return decimalHours.toFixed(2); // Return formatted decimal hours
            }
        },
        validerHeuresSupp() {
            const employeeId = this.getEmployee.id;
            const selectedDate = this.getselectedDate;
            const heuresEntrée = this.suppEntrée;
            const heuresSortie = this.suppSortie;
            const heuresDifference = this.calculateHoursDifference(
                heuresEntrée,
                heuresSortie
            );
            if ((heuresEntrée !== "") & (heuresSortie !== "")) {
                // Update the heuresSupp object with the calculated values
                if (!this.heuresSupp[employeeId]) {
                    this.heuresSupp[employeeId] = {};
                }
                this.heuresSupp[employeeId][selectedDate] = {
                    heuresEntrée,
                    heuresSortie,
                    heuresDifference,
                };
                // Show a success message using SweetAlert
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Heures supplémentaires ajoutées avec succès.",
                });
                this.isValidatedSupp = true;

                // // Clear the input fields after storing the data
                // this.suppEntrée = "";
                // this.suppSortie = "";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Saisir des heures valides",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            }
        },
        annulerHeuresSupp() {
            // Clear the input fields
            this.suppEntrée = "";
            this.suppSortie = "";
            const employeeId = this.getEmployee.id;
            const selectedDate = this.getselectedDate;
            const heuresEntrée = this.suppEntrée;
            const heuresSortie = this.suppSortie;
            const heuresDifference = this.calculateHoursDifference(
                heuresEntrée,
                heuresSortie
            );
            // Update the heuresSupp object with the calculated values
            if (!this.heuresSupp[employeeId]) {
                this.heuresSupp[employeeId] = {};
            }
            this.heuresSupp[employeeId][selectedDate] = {
                heuresEntrée,
                heuresSortie,
                heuresDifference,
            };
            this.isValidatedSupp = false;
        },
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#pointage-supp {
    table {
        width: 100%;
        th,
        td {
            min-width: 100px;
            position: relative;
            border: 1px solid #eee;
            // width: 180px;
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
        thead {
            th {
                background: #f1f3f9;
            }
        }
    }
}
</style>
