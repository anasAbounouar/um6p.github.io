<template>
    <div>
        <section id="myprofile">
            <div class="general-info container mb-3 px-4">
                <div class="row" data-aos="zoom-in">
                    <div class="col-6 d-flex flex-d-c">
                        <div class="d-flex justify-content-between nom">
                            <div>Nom & Prenom :</div>
                            <div>
                                <span>
                                    {{ user && user.nom }}
                                    {{ user && user.prenom }}</span
                                >
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 poste">
                            <div>Poste :</div>
                            <div>
                                <span>{{ user && user.poste }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-between matricule">
                            <div>Matricule :</div>
                            <div>
                                <span>{{ user && user.matricule }} </span>
                            </div>
                        </div>
                        <div
                            class="d-flex justify-content-between mt-3 employeur"
                        >
                            <div>Employeur :</div>
                            <div>
                                <span>{{ user && user.employeur }}</span>
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
                            :class="{ 'bg-l-h-c c-white': projectChosen }"
                        >
                            Projets
                        </div>

                        <span v-if="projectChosen">
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
                        <div v-if="projectChosen" class="projects-box mt-3">
                            <div class="row justify-content-between">
                                <div class="col-5">
                                    <div
                                        class="d-flex justify-content-between square"
                                    >
                                        <div>Projet-Actif :</div>
                                        <div>
                                            <span>Projet1 </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-5">
                                    <div
                                        class="d-flex justify-content-between square"
                                    >
                                        <div>Superviseur :</div>
                                        <div>
                                            <span>FLan X </span>
                                        </div>
                                    </div>

                                    .
                                </div>
                                <div class="col-5">
                                    <div
                                        class="d-flex justify-content-between square"
                                    >
                                        <div>Projet-Actif :</div>
                                        <div>
                                            <span>Projet2 </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-5">
                                    <div
                                        class="d-flex justify-content-between square"
                                    >
                                        <div>Superviseur :</div>
                                        <div>
                                            <span>FLan Y </span>
                                        </div>
                                    </div>

                                    .
                                </div>
                            </div>
                            <div class="mytable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Derniers Projets</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Nom du Projet</td>
                                            <td>Superviseur</td>
                                            <td>
                                                Temps
                                                <i
                                                    class="fa-regular fa-clock"
                                                ></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Projet1</td>
                                            <td>Superviseur 1</td>
                                            <td>
                                                Lundi 08h du matin a mercredi
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Projet2</td>
                                            <td>Superviseur 2</td>
                                            <td>
                                                Lundi 08h du matin a mercredi
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Projet3</td>
                                            <td>Superviseur 3</td>
                                            <td>
                                                Lundi 08h du matin a mercredi
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
                                            {{ nom }}
                                        </td>
                                        <td>
                                            {{ prenom }}
                                        </td>
                                        <td>
                                            {{ matricule }}
                                        </td>
                                        <td>
                                            {{ cin }}
                                        </td>
                                        <td>
                                            {{ sexe }}
                                        </td>
                                        <td>
                                            {{ dateNaissance }}
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
                                            {{ etatCivil }}
                                        </td>
                                        <td>
                                            {{ nbEnfants }}
                                        </td>
                                        <td>
                                            {{ entiteAffectation }}
                                        </td>
                                        <td>
                                            {{ premierEmbauche }}
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
                                        {{ email }}
                                    </td>
                                    <td>
                                        <input
                                            :type="typeField"
                                            disabled
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
                            <div class="my-3 d-flex justify-content-end"></div>
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
                                            {{ entiteAffectation }}
                                        </td>
                                        <td>
                                            {{ contrat }}
                                        </td>
                                        <td>
                                            {{ dateEmbauche }}
                                        </td>
                                        <td>
                                            {{ debutContrat }}
                                        </td>
                                        <td>
                                            {{ finContrat }}
                                        </td>
                                        <td>
                                            {{ dateDebauche }}
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
                                            {{ salaire }}
                                        </td>
                                        <td>
                                            {{ indemnité }}
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

export default {
    name: "myprofile-page",
    // props: ["user"],
    data() {
        return {
            employees,
            user: null,
            projectChosen: true,
            infospersoChosen: false,
            infosproChosen: false,
            isEditingPerso: false,
            isEditingPro: false,
            typeField: "password",
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
            debutContrat: "",
            finContrat: "",
            dateDebauche: "",
            premierEmbauche: "",
            email: "",
            password: "",
            indemnité: "",
            salaire: "",
            lastModificationDatePerso: "1999-06-20",
            lastModificationDatePro: "1999-06-20",
        };
    },
    created() {
        const user = localStorage.getItem("user");
        if (user) {
            this.user = JSON.parse(user);
        }
    },
    methods: {
        toggleProject() {
            this.infospersoChosen = false;
            this.infosproChosen = false;
            this.projectChosen = true;
        },
        toggleinfosPerso() {
            this.projectChosen = false;
            this.infosproChosen = false;
            this.infospersoChosen = true;
        },
        toggleinfosPro() {
            this.projectChosen = false;
            this.infospersoChosen = false;
            this.infosproChosen = true;
        },
        switchType() {
            this.typeField = this.typeField == "password" ? "text" : "password";
        },
    },
    mounted() {
        for (const property in this.properties) {
            this[property] = this.employee[property];
        }
    },
    computed: {
        employee() {
            const employeeId = this.user.id;
            console.log("my name is ");
            console.log(this.user.nom);
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
    },
};
</script>
<style lang="scss" scoped>
#myprofile {
    padding-left: calc(var(--sidebar-width) + 25px);
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
        .mytable {
            border-radius: 7px;
            border: 1px solid green;
            table {
                width: 100%;
                thead tr th {
                    font-weight: bold;
                    padding: 10px;
                }
                tbody {
                    tr:first-child {
                        background: #eee;
                        td {
                            font-weight: bold;
                        }
                    }
                    tr {
                        border-bottom: 1px solid #777;
                        td {
                            padding: 10px;
                        }
                    }
                }
            }
        }
    }
    .infosperso-box,
    .infospro-box {
        table {
            width: 100%;
            border-radius: 7px;
            border: 1px solid green;
            margin: 10px;
            i {
                cursor: pointer;
            }
            tr {
                border-bottom: 1px solid #777;
                > td {
                    border-right: 1px solid #777;
                }
                td,
                th {
                    padding: 10px;
                    border: 1px solid #777;
                }
                td:first-child {
                    font-weight: bold;
                }
            }
        }
    }
    // .infospro-box,
    // .infosperso-box {
    //     i {
    //         font-size: 25px;
    //         cursor: pointer;
    //         &:hover {
    //             color: var(--link-hovered-color);
    //         }
    //         &.fa-check {
    //             color: green;
    //         }
    //     }
    //     table {
    //         td:first-child {
    //             font-weight: bold;
    //         }
    //     }
    // }
}
</style>
