<template>
    <div>
        <section id="othersprofile">
            <div class="general-info container mb-3 px-4">
                <div class="row">
                    <div class="col-6 d-flex flex-d-c">
                        <div class="d-flex justify-content-between nom">
                            <div>Nom & Prenom :</div>
                            <div>
                                <span
                                    >{{ employee.nom }} {{ employee.prenom }}
                                </span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 poste">
                            <div>Poste :</div>
                            <div>
                                <span>{{ employee.poste }} </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between matricule">
                            <div>Matricule :</div>
                            <div>
                                <span>{{ employee.matricule }} </span>
                            </div>
                        </div>
                        <div
                            class="d-flex justify-content-between mt-3 employeur"
                        >
                            <div>Employeur :</div>
                            <div>
                                <span>{{ employee.employeur }} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-types container px-4">
                <div class="row">
                    <div class="col-4 p-relative" @click="toggleProject()">
                        <div
                            class="p-relative info-type"
                            :class="{ 'bg-l-h-c c-white': ParametresRH }"
                        >
                            ParametresRH
                        </div>

                        <span v-if="ParametresRH">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="5"
                                viewBox="0 0 10 5"
                                fill="none"
                            >
                                <path
                                    d="M4.76311 4.5L-3.43323e-05 0L9.52625 0L4.76311 4.5Z"
                                    fill="#008000"
                                />
                            </svg>
                        </span>
                    </div>
                    <div class="col-4 p-relative" @click="toggleinfosPerso()">
                        <div
                            class="p-relative info-type"
                            :class="{ 'bg-l-h-c c-white': infospersoChosen }"
                        >
                            Informations personnelles
                        </div>
                        <span class="absolute" v-if="infospersoChosen">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="5"
                                viewBox="0 0 10 5"
                                fill="none"
                            >
                                <path
                                    d="M4.76311 4.5L-3.43323e-05 0L9.52625 0L4.76311 4.5Z"
                                    fill="#008000"
                                />
                            </svg>
                        </span>
                    </div>
                    <div class="col-4 p-relative" @click="toggleinfosPro()">
                        <div
                            class="p-relative info-type"
                            :class="{ 'bg-l-h-c c-white': infosproChosen }"
                        >
                            Informations professionnelles
                        </div>
                        <span class="p-absolute" v-if="infosproChosen">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="5"
                                viewBox="0 0 10 5"
                                fill="none"
                            >
                                <path
                                    d="M4.76311 4.5L-3.43323e-05 0L9.52625 0L4.76311 4.5Z"
                                    fill="#008000"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div v-if="ParametresRH" class="parametersRH-box mt-3">
                            <div class="">
                                <div
                                    class="bg-eee m-3 p-3 rad-10"
                                    v-for="activeProject in activeProjects"
                                    :key="activeProject.id"
                                >
                                    <div
                                        class="d-flex justify-content-around mb-3"
                                    >
                                        <div
                                            class="d-flex justify-content-around flex-1"
                                        >
                                            <span class="txt-underline"
                                                >Projet Actif</span
                                            >
                                            <div class="green-rectangle">
                                                <span>{{
                                                    activeProject.name
                                                }}</span>
                                            </div>
                                        </div>
                                        <div
                                            class="d-flex justify-content-around flex-1"
                                        >
                                            <span> Superviseur</span>
                                            <div class="green-rectangle">
                                                <span>
                                                    {{
                                                        activeProject.superviseur
                                                    }}</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <button
                                            class="btn btn-danger m-2"
                                            @click.prevent="
                                                deleteActiveProject(
                                                    activeProject.id
                                                )
                                            "
                                        >
                                            Supprimer
                                        </button>
                                        <button
                                            class="btn btn-warning m-2"
                                            @click.prevent="
                                                rendrePassif(activeProject)
                                            "
                                        >
                                            Rendre passif
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="col-12 d-flex align-items-center gap-10"
                                    >
                                        <div>Ajouter un projet Actif</div>
                                        <div
                                            class="btn btn-primary d-flex align-items-center"
                                            @click.prevent="addActiveProject"
                                        >
                                            <i class="fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Projet passifs</th>
                                            <th>Superviseur</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="passiveProject in passiveProjects"
                                            :key="passiveProject.id"
                                            @click.prevent="
                                                confirmActivate(passiveProject)
                                            "
                                        >
                                            <td>{{ passiveProject.name }}</td>
                                            <td>
                                                {{ passiveProject.superviseur }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mt-3 d-flex justify-content-end">
                                Derniere modification :
                                <span class="c-grey"> 10/07/2023</span>
                            </div>
                        </div>
                        <div
                            v-if="infospersoChosen"
                            class="infosperso-box mt-3"
                        >
                            <div class="my-3 d-flex justify-content-end">
                                <i
                                    class="fa fa-pencil"
                                    @click="toggleEditingPerso"
                                    v-if="!isEditingPerso"
                                ></i>
                                <i
                                    class="fa fa-check"
                                    @click="saveData"
                                    v-if="isEditingPerso"
                                ></i>
                                <i
                                    class="fa-solid fa-xmark ms-3 c-red"
                                    @click="toggleEditingPerso"
                                    v-if="isEditingPerso"
                                ></i>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Matricule</th>
                                        <th>CIN</th>
                                        <th>Sexe</th>
                                        <th>Date de Naissance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPerso"
                                                v-model="nom"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPerso"
                                                v-model="prenom"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPerso"
                                                v-model="matricule"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPerso"
                                                v-model="cin"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <select
                                                :disabled="!isEditingPerso"
                                                v-model="sexe"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            >
                                                <option value="Homme">
                                                    Homme
                                                </option>
                                                <option value="Femme">
                                                    Femme
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditingPerso"
                                                v-model="dateNaissance"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Etat Civil</th>
                                        <th>Nombre d'enfants</th>
                                        <th>Entité d'affetation</th>
                                        <th>Premier Embauche</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPerso"
                                                v-model="etatCivil"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                :disabled="!isEditingPerso"
                                                v-model="nbEnfants"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPerso"
                                                v-model="entiteAffectation"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPerso"
                                                v-model="premierEmbauche"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Mot de passe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>
                                        <input
                                            type="text"
                                            :disabled="!isEditingPerso"
                                            v-model="email"
                                            :class="{
                                                'border-none': !isEditingPerso,
                                            }"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            :type="typeField"
                                            :disabled="!isEditingPerso"
                                            v-model="password"
                                            :class="{
                                                'border-none': !isEditingPerso,
                                            }"
                                        />
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
                                    </td>
                                </tbody>
                            </table>

                            <div class="mt-3 d-flex justify-content-end">
                                Derniere modification :
                                <span class="c-grey">{{
                                    lastModificationDatePerso
                                }}</span>
                            </div>
                        </div>
                        <div v-if="infosproChosen" class="infospro-box mt-3">
                            <div class="my-3 d-flex justify-content-end">
                                <i
                                    class="fa fa-pencil"
                                    @click="toggleEditingPro"
                                    v-if="!isEditingPro"
                                ></i>
                                <i
                                    class="fa fa-check"
                                    @click="saveData"
                                    v-if="isEditingPro"
                                ></i>
                                <i
                                    class="fa-solid fa-xmark ms-3 c-red"
                                    @click="toggleEditingPro"
                                    v-if="isEditingPro"
                                ></i>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Entité d'affectation</th>
                                        <th>Contrat</th>
                                        <th>Date d'embauche</th>
                                        <th>Début de contrat</th>
                                        <th>Fin de contrat</th>
                                        <th>Date de débauche</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPro"
                                                v-model="entiteAffectation"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPro"
                                                v-model="contrat"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditingPro"
                                                v-model="dateEmbauche"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditingPro"
                                                v-model="debutContrat"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditingPro"
                                                v-model="finContrat"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditingPro"
                                                v-model="dateDebauche"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPerso,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Salaire Net</th>
                                        <th>Indemnité Transport</th>
                                        <th>Ancienneté</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPro"
                                                v-model="salaire"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPro"
                                                v-model="indemnité"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                        <td>
                                            {{ calculateExperience }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="mt-3 d-flex justify-content-end">
                                Derniere modification :
                                <span class="c-grey"> 20022-20-0 </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import employees from "@/Js/employees";
import Swal from "sweetalert2";
// import Vue from "vue";
export default {
    name: "RH-employees-details",
    data() {
        return {
            employees,
            id: this.$route.params.id,
            ParametresRH: true,
            infospersoChosen: false,
            infosproChosen: false,
            isEditingPerso: false,
            isEditingPro: false,
            typeField: "password",
            activeProjects: [
                {
                    id: 0,
                    name: "Project 0",
                    superviseur: "Superviseur X",
                },
                {
                    id: 1,
                    name: "Project 1",
                    superviseur: "Superviseur Y",
                },
                {
                    id: 2,
                    name: "Project 2",
                    superviseur: "Superviseur Z",
                },
                {
                    id: 3,
                    name: "Project 3",
                    superviseur: "Superviseur W",
                },
            ],
            passiveProjects: [
                {
                    id: 5,
                    name: "Project 5",
                    superviseur: "Superviseur X",
                },
                {
                    id: 6,
                    name: "Project 6",
                    superviseur: "Superviseur Y",
                },
                {
                    id: 7,
                    name: "Project 7",
                    superviseur: "Superviseur Z",
                },
                {
                    id: 8,
                    name: "Project 8",
                    superviseur: "Superviseur W",
                },
            ],
            Projects: [
                {
                    id: 0,
                    name: "Project 0",
                    superviseur: "Superviseur X",
                },
                {
                    id: 1,
                    name: "Project 1",
                    superviseur: "Superviseur Y",
                },
                {
                    id: 2,
                    name: "Project 2",
                    superviseur: "Superviseur Z",
                },
                {
                    id: 3,
                    name: "Project 3",
                    superviseur: "Superviseur W",
                },
                {
                    id: 5,
                    name: "Project 5",
                    superviseur: "Superviseur X",
                },
                {
                    id: 6,
                    name: "Project 6",
                    superviseur: "Superviseur Y",
                },
                {
                    id: 7,
                    name: "Project 7",
                    superviseur: "Superviseur Z",
                },
                {
                    id: 8,
                    name: "Project 8",
                    superviseur: "Superviseur W",
                },
            ],
            nom: "",
            prenom: "",
            matricule: "",
            sexe: "",
            dateNaissance: "",
            cin: "",
            cnss: "",
            etatCivil: "",
            nbEnfants: "",
            entiteAffectation: "",
            contrat: "",
            dateEmbauche: "",
            debutContrat: "",
            finContrat: "",
            dateDebauche: "",
            premierEmbauche: "",
            email: "",
            password: "",
            indemnité: "",
            salaire: "",
        };
    },
    methods: {
        toggleProject() {
            this.ParametresRH = true;
            this.infospersoChosen = false;
            this.infosproChosen = false;
        },
        toggleinfosPerso() {
            this.infospersoChosen = true;
            this.ParametresRH = false;
            this.infosproChosen = false;
        },
        toggleinfosPro() {
            this.infosproChosen = true;
            this.ParametresRH = false;
            this.infospersoChosen = false;
        },
        deleteActiveProject(activeProjectId) {
            const indexToDelete = this.activeProjects.findIndex((project) => {
                return project.id === activeProjectId;
            });
            console.log(indexToDelete);
            if (indexToDelete !== -1) {
                this.activeProjects.splice(indexToDelete, 1);
            } else {
                console.log(`Project with  not found.`);
            }
        },
        rendrePassif(activeProject) {
            const indexToDelete = this.activeProjects.findIndex((project) => {
                return project.id === activeProject.id;
            });
            console.log(indexToDelete);
            if (indexToDelete !== -1) {
                this.passiveProjects.push(activeProject);
                this.activeProjects.splice(indexToDelete, 1);
            } else {
                console.log(`Project with  not found.`);
            }
        },
        async addActiveProject() {
            const { value: projectId } = await Swal.fire({
                title: "Choose an Active Project",
                input: "select",
                inputOptions: this.Projects.reduce((options, project) => {
                    options[project.id] = project.name;
                    return options;
                }, {}),
                inputPlaceholder: "Select a project",
                showCancelButton: true,
            });

            if (projectId) {
                const selectedProject = this.Projects.find(
                    (project) => project.id === parseInt(projectId)
                );
                if (selectedProject) {
                    this.activeProjects.push(selectedProject);
                }
            }
        },
        async confirmActivate(passiveProject) {
            const confirmation = await Swal.fire({
                title: "Confirmer Activation",
                text: `Etes vous sur de vouloir activer "${passiveProject.name}"?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Activate",
                cancelButtonText: "Cancel",
            });

            if (confirmation.isConfirmed) {
                // Remove the project from passiveProjects
                const indexToRemove = this.passiveProjects.findIndex(
                    (project) => project.id === passiveProject.id
                );
                if (indexToRemove !== -1) {
                    const projectToMove = this.passiveProjects.splice(
                        indexToRemove,
                        1
                    )[0];
                    this.activeProjects.push(projectToMove);
                }
            }
        },
        toggleEditingPerso() {
            for (const property in this.properties) {
                this[property] = this.employee[property];
            }
            this.isEditingPerso = !this.isEditingPerso;
        },
        switchType() {
            this.typeField = this.typeField == "password" ? "text" : "password";
        },
        saveData() {
            //if data is initialized to empty string "", the data comes from the array I made, if not the case
            // the array I made get modified :)
            for (const property in this.properties) {
                if (this.properties[property] === "") {
                    this[property] = this.employee[property];
                } else {
                    this.employee[property] = this.properties[property];
                }
            }
            this.isEditingPerso = false;
            this.isEditingPro = false;
        },
        toggleEditingPro() {
            for (const property in this.properties) {
                this[property] = this.employee[property];
            }
            this.isEditingPro = !this.isEditingPro;
        },
        getDateString(year, month, day) {
            const monthStr = month < 10 ? `0${month}` : `${month}`;
            const dayStr = day < 10 ? `0${day}` : `${day}`;
            return `${year}-${monthStr}-${dayStr}`;
        },
    },
    computed: {
        employee() {
            const employeeId = this.id;
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
        properties() {
            return {
                nom: this.nom,
                prenom: this.prenom,
                matricule: this.matricule,
                sexe: this.sexe,
                dateNaissance: this.dateNaissance,
                cin: this.cin,
                cnss: this.cnss,
                etatCivil: this.etatCivil,
                nbEnfants: this.nbEnfants,
                entiteAffectation: this.entiteAffectation,
                contrat: this.contrat,
                debutContrat: this.debutContrat,
                dateEmbauche: this.dateEmbauche,
                finContrat: this.finContrat,
                dateDebauche: this.dateDebauche,
                premierEmbauche: this.premierEmbauche,
                email: this.email,
                password: this.password,
                indemnité: this.indemnité,
                salaire: this.salaire,
            };
        },
        calculateExperience() {
            const startDate = new Date(this.employee.dateEmbauche);
            const currentDate = new Date();

            let endDate;
            if (this.employee.dateDebauche === "") {
                endDate = currentDate;
            } else {
                const [year, month, day] =
                    this.employee.dateDebauche.split("-");
                endDate = new Date(year, month - 1, day);
            }

            let yearsDiff = endDate.getFullYear() - startDate.getFullYear();
            let monthsDiff = endDate.getMonth() - startDate.getMonth();

            if (monthsDiff < 0) {
                yearsDiff--;
                monthsDiff += 12;
            }

            return `${yearsDiff} Année et ${monthsDiff} mois`;
        },
        // nom() {
        //     return this.employee.nom;
        // },
        // prenom() {
        //     return this.employee.prenom;
        // },
        // matricule() {
        //     return this.employee.matricule;
        // },
        // sexe() {
        //     return this.employee.sexe;
        // },
        // dateNaissance() {
        //     return this.employee.dateNaissance;
        // },
        // cin() {
        //     return this.employee.cin;
        // },
        // cnss() {
        //     return this.employee.cnss;
        // },
        // etatCivil() {
        //     return this.employee.etatCivil;
        // },
        // nbEnfants() {
        //     return this.employee.nbEnfants;
        // },
        // entiteAffectation() {
        //     return this.employee.entiteAffectation;
        // },
        // contrat() {
        //     return this.employee.contrat;
        // },
        // debutContrat() {
        //     return this.employee.debutContrat;
        // },
        // finContrat() {
        //     return this.employee.finContrat;
        // },
        // dateDebauche() {
        //     {
        //         return this.employee.dateDebauche;
        //     }
        // },
        // premierEmbauche() {
        //     return this.employee.premierEmbauche;
        // },
        // email() {
        //     return this.employee.email;
        // },
        // password() {
        //     return this.employee.password;
        // },
        // indemnité() {
        //     return this.employee.indemnité;
        // },
        // salaire() {
        //     return this.employee.salaire;
        // },
    },
    created() {
        this.saveData(); // Call the function when the component is created
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#othersprofile {
    .green-rectangle {
        border: 1px solid var(--link-hovered-color);
        color: var(--link-hovered-color);
        border-radius: 4px;
        background: white;
        padding: 2px 5px;
    }
    .general-info {
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
    }
    .info-types {
        margin-top: 30px;
        .info-type {
            cursor: pointer;
            background: var(--secondary-grey2-color);
            padding: 2px;
            border-radius: 3px;
            transition: 0.3s;
            &:hover {
                background: var(--link-hovered-color);
                color: white;
            }
        }
        span {
            position: relative;
            bottom: 0px;
            svg {
                width: 17px;
                height: 7px;
                position: absolute;
            }
        }
    }
    .infosperso-box,
    .projects-box,
    .infospro-box {
        border: 1px solid #ccc;
        border-radius: 7px;
        padding: 14px;
    }
    .projects-box {
        .square {
            div {
                padding: 5px;
            }
            div:last-child {
                border: 1px solid var(--link-hovered-color);
                color: var(--link-hovered-color);

                border-radius: 6px;
            }
        }
    }
    .infosperso-box,
    .infospro-box {
        i {
            font-size: 25px;
            cursor: pointer;
            &:hover {
                color: var(--link-hovered-color);
            }
            &.fa-check {
                color: green;
            }
        }
        .fa-eye-slash,
        .fa-eye {
            font-size: 17px !important;
        }
        table {
            width: 100%;
            border-radius: 7px;
            table-layout: fixed;
            margin-bottom: 20px;
            margin-top: 20px;
            border: 1px solid green;

            tr {
                border-bottom: 1px solid #777;
                td {
                    border-right: 1px solid #777;
                    select {
                        padding: 0px 5px;
                        border: none;
                        border-radius: 6px;
                        &:focus {
                            border: 1px solid #007bff;
                            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                            outline: none;
                        }
                    }
                }
                td {
                    white-space: normal; /* Allow text to wrap */
                    word-wrap: break-word; /* Break words that exceed cell width */
                    overflow: hidden; /* Hide any overflow */
                    padding: 10px;
                    input:enabled {
                        width: 100%;
                        border-radius: 6px;
                        border: 1px solid #eee;
                        &:focus {
                            border: 1px solid green !important;
                            outline: none;
                        }
                    }
                }
                th {
                    border-right: 1px solid #777;
                }
            }
        }
    }
    .parametersRH-box {
        table {
            width: 100%;
            border: 1px solid #eee;
            border-radius: 3px;
            td,
            th {
                border: 1px solid #777;
                padding: 10px;
            }
            tbody {
                tr {
                    cursor: pointer;
                    &:hover {
                        box-shadow: 0px 1px 1px 1px #777;
                    }
                }
            }
        }
    }
}
</style>
