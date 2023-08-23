<template>
    <div>
        <SideBarView /> <NavBarView />
        <section id="new-employee">
            <div class="container">
                <h2>Ajouter un nouveau employee</h2>
                <form id="addEmployeeForm">
                    <div>
                        <div>
                            <label for="prenom">Prénom:</label>
                            <input
                                type="text"
                                id="prenom"
                                v-model="prenom"
                                required
                            />
                        </div>

                        <div>
                            <label for="nom">Nom:</label>
                            <input
                                type="text"
                                id="nom"
                                v-model="nom"
                                required
                            />
                        </div>

                        <div>
                            <label for="matricule">CIN:</label>
                            <input
                                type="text"
                                id="matricule"
                                v-model="cin"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="matricule">Date de Naissance:</label>
                            <input
                                type="date"
                                id=""
                                v-model="dateNaissance"
                                required
                            />
                        </div>

                        <div>
                            <label for="matricule">Sexe</label>
                            <select name="" id="" v-model="sexe">
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        </div>
                        <div>
                            <label for="matricule">Etat civil:</label>
                            <select name="" id="" v-model="etatCivil">
                                <option
                                    v-for="etatCivil in etatsCivil"
                                    :key="etatCivil"
                                >
                                    {{ etatCivil }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="matricule">Nombre d'enfants </label>
                            <input
                                type="number"
                                id="matricule"
                                v-model="nbEnfants"
                                required
                            />
                        </div>
                        <div>
                            <label for="poste">Poste:</label>
                            <input
                                type="text"
                                id="poste"
                                v-model="poste"
                                required
                            />
                        </div>
                        <div>
                            <label for="matricule">CNSS:</label>
                            <input
                                type="text"
                                id="matricule"
                                v-mode="cnss"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="">Date d'Embauche</label>
                            <input
                                type="date"
                                id=""
                                v-model="dateEmbauche"
                                required
                            />
                        </div>
                        <div>
                            <label for="">Date de debut de contrat</label>
                            <input
                                type="date"
                                v-mode="debutContrat"
                                id=""
                                required
                            />
                        </div>
                        <div>
                            <label for="">Date de fin de contrat</label>
                            <input
                                type="date"
                                id=""
                                v-model="finContrat"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="">Date de debauche</label>
                            <input type="date" id="" v-model="dateDebauche" />
                        </div>
                        <div>
                            <label for="">Salaire Net</label>
                            <input
                                type="number"
                                id=""
                                v-model="salaire"
                                required
                            />
                        </div>
                        <div>
                            <label for="">indemnité Transport </label>
                            <input
                                type="number"
                                id=""
                                v-model="indemnité"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="matricule">Employeur:</label>
                            <select v-mode="employeur">
                                <option value="UM6P">UM6P</option>
                                <option value="Best Profile">
                                    Best Profile
                                </option>
                            </select>
                        </div>
                        <div>
                            <label for="matricule">Premier Embauche</label>
                            <input
                                type="text"
                                id="matricule"
                                v-model="premierEmbauche"
                                required
                            />
                        </div>
                        <div>
                            <label for="matricule">Matricule:</label>
                            <input
                                type="text"
                                id="matricule"
                                v-model="matricule"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="matricule">Contrat</label>
                            <input
                                type="text"
                                id="matricule"
                                v-model="contrat"
                                required
                            />
                        </div>
                        <div>
                            <label for="matricule">Entité d'affectation</label>
                            <input
                                type="text"
                                id="matricule"
                                v-model="entiteAffectation"
                                required
                            />
                        </div>
                        <div>
                            <label for="matricule">Email </label>
                            <input type="text" id="" v-model="email" required />
                        </div>
                    </div>
                    <div>
                        <div class="p-relative">
                            <label for="matricule">Mot de passe</label>
                            <input :type="typeField" v-model="password" />
                            <i
                                v-if="typeField == 'password'"
                                class="fa-solid fa-eye-slash"
                                @click.prevent="switchType"
                            ></i>
                            <i
                                v-else
                                class="fa-solid fa-eye"
                                @click.prevent="switchType"
                            ></i>
                        </div>
                        <!-- <div>
                            <label for="matricule">Entité d'affectation</label>
                            <input type="text" id="matricule" required />
                        </div>
                        <div>
                            <label for="matricule">Email </label>
                            <input type="number" id="matricule" required />
                        </div> -->
                    </div>

                    <!-- Add more input fields for other employee properties -->

                    <span class="d-flex">
                        <button
                            type="submit"
                            @click.prevent="addEmployee"
                            class="btn btn-success m-3"
                        >
                            Ajouter L'employée
                        </button>

                        <span
                            class="btn btn-danger d-flex align-items-center m-3"
                            @click.prevent="setNull"
                        >
                            Annuler
                        </span>
                    </span>
                </form>
            </div>
        </section>
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
import employees from "@/Js/employees";
import Swal from "sweetalert2";
export default {
    name: "RH-employees-new",
    components: {
        SideBarView,
        NavBarView,
    },
    data() {
        return {
            etatCivil: "",
            etatsCivil: ["marié", "célibataire", "divorcé", "veuf"],
            employees,
            nom: "",
            prenom: "",
            matricule: "",
            sexe: "",
            dateNaissance: "",
            cin: "",
            cnss: "",
            nbEnfants: "",
            entiteAffectation: "",
            contrat: "",
            debutContrat: "",
            finContrat: "",
            dateDebauche: "",
            premierEmbauche: "",
            email: "",
            password: "",
            indemnité: "",
            salaire: "",
            typeField: "password",
        };
    },
    methods: {
        switchType() {
            this.typeField = this.typeField == "password" ? "text" : "password";
        },
        setNull() {
            // Clear input fields after adding employee
            this.prenom = "";
            this.nom = "";
            this.poste = "";
            this.matricule = "";
            this.employeur = "";
            this.cin = "";
            this.dateNaissance = "";
            this.nbEnfants = "";
            this.etatCivil = "";
            this.cnss = "";
            this.dateEmbauche = "";
            this.debutContrat = "";
            this.finContrat = "";
            this.dateDebauche = "";
            this.salaire = "";
            this.contrat = "";
            this.indemnité = "";
            this.entiteAffectation = "";
            this.email = "";
            this.password = "";
            this.premierEmbauche = "";
            this.activité = "";
            this.sexe = "";
        },
        async addEmployee() {
            // Create a new employee object with the provided data
            const newEmployee = {
                id: this.employees.length, // Assign a new ID (you might need to adjust this logic)
                prenom: this.prenom,
                nom: this.nom,
                poste: this.poste,
                matricule: this.matricule,
                employeur: this.employeur,
                cin: this.cin,
                dateNaissance: this.dateNaissance,
                nbEnfants: this.nbEnfants,
                etatCivil: this.etatCivil,
                cnss: this.cnss,
                dateEmbauche: this.dateEmbauche,
                debutContrat: this.debutContrat,
                finContrat: this.finContrat,
                dateDebauche: this.dateDebauche,
                salaire: this.salaire,
                contrat: this.contrat,
                indemnité: this.indemnité,
                entiteAffectation: this.entiteAffectation,
                email: this.email,
                password: this.password,
                premierEmbauche: this.premierEmbauche,
                activité: this.activité,
                sexe: this.sexe,
            };

            // Push the new employee to the employees array
            this.employees.push(newEmployee);
            this.setNull();

            await Swal.fire({
                icon: "success",
                title: "Employé ajouté avec succès",
                showConfirmButton: false,
                timer: 2500, // Adjust the time the message is shown
            });
        },
    },
};
</script>
<style lang="scss" scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#new-employee {
    // .container {
    //     max-width: 400px;
    //     margin: 50px auto;
    //     padding: 20px;
    //     background-color: #ffffff;
    //     border-radius: 5px;
    //     box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    // }
    h2 {
        font-size: 24px;
        margin-bottom: 20px;
    }
    #addEmployeeForm {
        position: relative;
        > div {
            display: flex;
            justify-content: space-between;
            div {
                flex: 1;
                margin: 4px;
            }
        }

        label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }

        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #0056b3;
        }
        select {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 3px;
            font-size: 16px;
            &:focus {
                border: 1px solid #007bff;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                outline: none;
            }
        }
        i.fa-eye-slash,
        i.fa-eye {
            position: absolute;
            right: 10px;
            top: 50%;
        }
    }
}
</style>
