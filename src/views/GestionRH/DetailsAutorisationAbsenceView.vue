<template>
    <div>
        <section id="RH-autorisation-absence-details">
            <div class="container">
                <div class="row">
                    <div class="col-10 my-3">
                        <h5>
                            <span>Details d'autorisation d'absence </span>
                        </h5>
                    </div>
                    <div class="col-12 d-flex">
                        <div class="green-box">demandeur</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Nom :</div>
                            <div>
                                <span>
                                    {{ getDemandeur.nom }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Prenom :</div>
                            <div>
                                <span>
                                    {{ getDemandeur.prenom }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Poste :</div>
                            <div>
                                <span>
                                    {{ getDemandeur.poste }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Employeur :</div>
                            <div>
                                <span>
                                    {{ getDemandeur.employeur }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>CIN :</div>
                            <div>
                                <span>
                                    {{ getDemandeur.cin }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Matricule :</div>
                            <div>
                                <span>
                                    {{ getDemandeur.matricule }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex">
                        <div class="green-box">Benificiaire</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Nom :</div>
                            <div>
                                <span>
                                    {{ getBeneficiaire.nom }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Prenom :</div>
                            <div>
                                <span>
                                    {{ getBeneficiaire.prenom }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Poste :</div>
                            <div>
                                <span>
                                    {{ getBeneficiaire.poste }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Employeur :</div>
                            <div>
                                <span>
                                    {{ getBeneficiaire.employeur }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>CIN :</div>
                            <div>
                                <span>
                                    {{ getBeneficiaire.cin }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between nom">
                            <div>Matricule :</div>
                            <div>
                                <span>
                                    {{ getBeneficiaire.matricule }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="visa-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>visa demandeur</th>
                                        <th>visa superviseur</th>
                                        <th>visa admin</th>
                                        <th>autorisation</th>
                                        <th>Motif d’absence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Oui</td>
                                        <td>Encours</td>
                                        <td>Encours</td>
                                        <td>Encours</td>
                                        <td>MGE</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <form class="absence-form">
                            <label for="start-date">Date de début :</label>
                            <input
                                type="date"
                                v-model="debutAbsenceDate"
                                required
                                disabled
                            />

                            <label for="end-date">Date de fin :</label>
                            <input
                                type="date"
                                v-model="endAbsenceDate"
                                required
                                disabled
                            />
                            <button
                                @click.prevent="showDates = !showDates"
                                class="btn-details"
                            >
                                {{
                                    showDates
                                        ? "Masquer details"
                                        : "Montrer details"
                                }}
                            </button>

                            <div v-if="showDates">
                                <div
                                    v-for="date in selectedDates"
                                    :key="date"
                                    class="date-section"
                                >
                                    <p>le {{ formatDate(date) }}</p>
                                    <div
                                        class="d-flex justify-content-between shift-container"
                                    >
                                        <div class="shift-container">
                                            <!-- Morning Shift -->
                                            <div class="shift">
                                                <div class="time-input">
                                                    <label
                                                        :for="
                                                            'start-time-morning-' +
                                                            date
                                                        "
                                                    >
                                                        Matin :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        :id="
                                                            'start-time-morning-' +
                                                            date
                                                        "
                                                        v-model="
                                                            startTimes[date][
                                                                'morning'
                                                            ].start
                                                        "
                                                        disabled
                                                        required
                                                    />
                                                    <input
                                                        type="time"
                                                        :id="
                                                            'end-time-morning-' +
                                                            date
                                                        "
                                                        v-model="
                                                            endTimes[date][
                                                                'morning'
                                                            ].end
                                                        "
                                                        disabled
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <!-- Afternoon Shift -->
                                            <div class="shift">
                                                <div class="time-input">
                                                    <label
                                                        :for="
                                                            'start-time-afternoon-' +
                                                            date
                                                        "
                                                    >
                                                        Soir :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        :id="
                                                            'start-time-aftenoon-' +
                                                            date
                                                        "
                                                        v-model="
                                                            startTimes[date][
                                                                'afternoon'
                                                            ].start
                                                        "
                                                        disabled
                                                        required
                                                    />
                                                    <input
                                                        type="time"
                                                        :id="
                                                            'end-time-aftenoon-' +
                                                            date
                                                        "
                                                        v-model="
                                                            endTimes[date][
                                                                'afternoon'
                                                            ].end
                                                        "
                                                        disabled
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import demandesAbsences from "@/Js/demandesAbsences";
import employees from "@/Js/employees";
export default {
    name: "RH-autorisation-absence-details",
    data() {
        return {
            employees,
            demandesAbsences,
            demandeId: this.$route.params.demandeId, // Initialize demandeId
            resumeDay: "",
            showDates: false,
        };
    },
    methods: {
        getEmployeeById(employeeId) {
            return this.employees.find((employee) => {
                return employee.id === employeeId;
            });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("fr-CA");
        },
    },
    computed: {
        getAbsence() {
            return this.demandesAbsences.find((demande) => {
                console.log(demande);
                return demande.id === this.demandeId;
            });
        },
        getDemandeur() {
            console.log(this.demandesAbsences);
            const demandeur = this.demandesAbsences.find((demande) => {
                console.log(demande);
                return demande.id === this.demandeId;
            }).demandeur;
            console.log("hahiya demandeur Id ", demandeur);
            return this.getEmployeeById(demandeur);
        },
        getBeneficiaire() {
            console.log(this.demandesAbsences);
            const employeeId = this.demandesAbsences.find((demande) => {
                return demande.id === this.demandeId;
            }).employeeId;
            console.log("hahiya demandeur Id ", employeeId);
            return this.getEmployeeById(employeeId);
        },
        debutAbsenceDate() {
            const debutAbsenceDate = this.demandesAbsences.find((demande) => {
                return demande.id === this.demandeId;
            }).debutAbsenceDate;
            return debutAbsenceDate;
        },
        endAbsenceDate() {
            const endAbsenceDate = this.demandesAbsences.find((demande) => {
                return demande.id === this.demandeId;
            }).endAbsenceDate;
            return endAbsenceDate;
        },
        selectedDates() {
            const dates = [];
            let formattedStartDate = new Date(this.getAbsence.debutAbsenceDate);
            console.log("formatted start date is ", formattedStartDate);
            let formattedEndDate = new Date(this.getAbsence.endAbsenceDate);
            while (formattedStartDate <= formattedEndDate) {
                dates.push(formattedStartDate.toISOString().split("T")[0]);
                formattedStartDate.setDate(formattedStartDate.getDate() + 1);
            }
            return dates;
        },
        startTimes() {
            return this.getAbsence.startDates;
        },
        endTimes() {
            return this.getAbsence.endDates;
        },
    },
    // created() {
    //     this.demandeId = this.$route.params.demandeId; // Assign the route parameter to demandeId
    // },
};
</script>
<style lang="scss" scoped>
#RH-autorisation-absence-details {
    .green-box {
        padding: 5px 10px;
        background: green;
        color: white;
        border-radius: 6px;
    }

    .nom,
    .poste,
    .matricule,
    .employeur {
        div {
            padding: 5px;
        }
        div:last-child {
            border: 1px solid var(--link-hovered-color);
            color: var(--link-hovered-color);

            border-radius: 6px;
        }
    }
    .visa-table {
        table {
            width: 100%;
            th,
            td {
                min-width: 100px;
                position: relative;
                border: 1px solid #eee;
                // width: 180px;
                select {
                    width: 100%;
                    // border: none;
                    cursor: pointer;
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    margin: 0;
                    &:focus {
                        box-shadow: none;
                        border: none;
                    }
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
            thead {
                th {
                    background: #f1f3f9;
                }
            }
        }
    }
    .absence-form {
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 3px;
            margin-bottom: 10px;
            font-size: 14px;
        }
        .btn-details {
            background: var(--submit-blue-color);
            margin: 10px;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .date-section {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .shift-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            .shift {
                flex: 1;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #ffffff;
            }
        }
    }
}
</style>
