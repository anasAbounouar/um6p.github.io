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
            demandeId: null, // Initialize demandeId
        };
    },
    methods: {
        getEmployeeById(employeeId) {
            return this.employees.find((employee) => {
                return employee.id === employeeId;
            });
        },
    },
    computed: {
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
    },
    created() {
        this.demandeId = this.$route.params.demandeId; // Assign the route parameter to demandeId
    },
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
}
</style>
