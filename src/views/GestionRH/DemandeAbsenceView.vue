<template>
    <div>
        <section id="demande-absence">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-10 my-3">
                        <h5><span>Choisissez un beneficiaire</span></h5>
                    </div>
                    <div class="col-12">
                        <div
                            class="d-flex align-items-center justify-content-around"
                        >
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="autre"
                                    checked
                                    v-model="selectedTypeDemande"
                                />
                                Demander pour une autre personne
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="moi"
                                    v-model="selectedTypeDemande"
                                />
                                Demander pour moi meme
                            </label>
                        </div>
                    </div>
                    <div class="col-8">
                        <div>
                            <form @submit.prevent="" class="modal-form">
                                <div class="form-group">
                                    <label for="employeeSearch"
                                        >Sélectionnez un employé :</label
                                    >
                                    <input
                                        type="text"
                                        id="employeeSearch"
                                        v-model="searchText"
                                        class="form-control"
                                        placeholder="Rechercher un employé"
                                    />
                                </div>

                                <div class="form-group p-relative">
                                    <label for="selectedEmployee"
                                        >Employé sélectionné :</label
                                    >
                                    <div class="p-relative">
                                        <select
                                            v-model="selectedEmployee"
                                            id="selectedEmployee"
                                            class="form-control"
                                        >
                                            <option
                                                value=""
                                                disabled
                                                selected
                                                hidden
                                            >
                                                Sélectionnez un employé
                                            </option>
                                            <option
                                                v-for="employee in filteredEmployees"
                                                :key="employee.id"
                                                :value="employee"
                                            >
                                                {{ employee.prenom }}
                                                {{ employee.nom }}
                                            </option></select
                                        ><i class="fa-solid fa-caret-down"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-6 d-flex flex-d-c">
                        <div class="d-flex justify-content-between nom">
                            <div>Nom & Prenom :</div>
                            <div>
                                <span>
                                    <!-- {{ beneficiaire.prenom }} -->
                                </span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 poste">
                            <div>Poste :</div>
                            <div>
                                <!-- <span>{{ beneficiaire.poste }} </span> -->
                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-6">
                        <div class="d-flex justify-content-between matricule">
                            <div>Matricule :</div>
                            <div>
                                <span>{{ beneficiaire.matricule }} </span>
                            </div>
                        </div>
                        <div
                            class="d-flex justify-content-between mt-3 employeur"
                        >
                            <div>Employeur :</div>
                            <div>
                                <span>{{ beneficiaire.employeur }} </span>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import employees from "@/Js/employees";
export default {
    name: "demande-absence-page",
    data() {
        return {
            employees,
            selectedTypeDemande: "autre",
            searchText: "",
            selectedEmployee: "",
        };
    },
    computed: {
        filteredEmployees() {
            const filterText = this.searchText.toLowerCase();
            return this.employees.filter(
                (employee) =>
                    employee.prenom.toLowerCase().includes(filterText) ||
                    employee.nom.toLowerCase().includes(filterText)
            );
        },
        beneficiaire() {
            const benef = this.employees.find((employee) => {
                employee === this.selectedEmployee;
            });
            console.log(benef);
            return benef;
        },
    },
    mounted() {
        const benef = this.employees.find((employee) => {
            employee === this.selectedEmployee;
        });
        console.log(benef);
        return benef;
    },
};
</script>
<style lang="scss" scoped>
#demande-absence {
    // .custom-modal {
    //     max-width: 600px;
    //     width: 100%;
    //     margin: 0 auto;
    // }

    .modal-form {
        padding: 20px;
    }

    .form-group {
        margin-bottom: 20px;
        select {
            margin-right: 0px;
            width: 100%;
            margin-left: 0px;
        }
    }

    .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition: border-color 0.2s ease-in-out;
    }

    .form-control:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    i.fa-caret-down {
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
    }
}
</style>
