<template>
    <div>
        <SideBarView /> <NavBarView />
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
                        <div v-if="ParametresRH" class="projects-box mt-3">
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
                            <div class="my-3 d-flex justify-content-end">
                                <i
                                    class="fa fa-pencil"
                                    @click="toggleEditingPerso"
                                    v-show="!isEditingPerso"
                                ></i>
                                <i
                                    class="fa fa-check"
                                    @click="saveDataPerso"
                                    v-show="isEditingPerso"
                                ></i>
                                <i
                                    class="fa-solid fa-xmark ms-3 c-red"
                                    @click="toggleEditingPerso"
                                    v-show="isEditingPerso"
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
                                            <input
                                                type="text"
                                                :disabled="!isEditingPerso"
                                                v-model="sexe"
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
                                                type="text"
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
                                            :type="passwordtype"
                                            :disabled="!isEditingPerso"
                                            v-model="password"
                                            :class="{
                                                'border-none': !isEditingPerso,
                                            }"
                                        />
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
                                    v-show="!isEditingPro"
                                ></i>
                                <i
                                    class="fa fa-check"
                                    @click="saveDataPro"
                                    v-show="isEditingPro"
                                ></i>
                            </div>
                            <!-- <table>
                                <tbody>
                                    <tr>
                                        <td>Entité d’affectation</td>
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
                                    </tr>
                                    <tr>
                                        <td>Contrat</td>
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
                                    </tr>
                                    <tr>
                                        <td>Date prévue d’embauche</td>
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
                                    </tr>
                                    <tr>
                                        <td>Début de contrat</td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="
                                                    !isEditingProisEditingPro
                                                "
                                                v-model="debutContrat"
                                                :class="{
                                                    'border-none':
                                                        !isEditingProisEditingPro,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fin de contrat</td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="
                                                    !isEditingProisEditingPro
                                                "
                                                v-model="finContrat"
                                                :class="{
                                                    'border-none':
                                                        !isEditingProisEditingPro,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date de débauche</td>
                                        <td>
                                            <input
                                                type="text"
                                                disabled
                                                v-model="dateDebauche"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Salaire mensuel net</td>
                                        <td>
                                            <input
                                                type="number"
                                                :disabled="!isEditingPro"
                                                v-model="salaireNet"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Indemnité mensuelle transport</td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditingPro"
                                                v-model="indemniteTransport"
                                                :class="{
                                                    'border-none':
                                                        !isEditingPro,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table> -->
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
                                    </tr>
                                </tbody>
                            </table>
                            <div class="mt-3 d-flex justify-content-end">
                                Derniere modification :
                                <span class="c-grey">
                                    {{ lastModificationDatePro }}
                                </span>
                            </div>
                        </div>
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
    name: "RH-employees-details",
    components: {
        SideBarView,
        NavBarView,
    },
    data() {
        return {
            employees,
            id: this.$route.params.id,
            ParametresRH: true,
            infospersoChosen: false,
            infosproChosen: false,
            dateEmbauche: "1999-08-10",
            salaireNet: "1900",
            isEditingPerso: false,
            isEditingPro: false,
            passwordtype: "password",
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
        toggleEditingPerso() {
            this.isEditingPerso = !this.isEditingPerso;
        },
        saveDataPerso() {
            // Perform any necessary operations to save the data a si che9ron :)
            this.isEditingPerso = false; // Disable editing mode after saving
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}/${
                currentDate.getMonth() + 1
            }/${currentDate.getFullYear()}`;
            this.lastModificationDatePerso = formattedDate;
        },
        toggleEditingPro() {
            this.isEditingPro = !this.isEditingPro;
        },
        saveDataPro() {
            // Perform any necessary operations to save the data a si che9ron :)
            this.isEditingPro = false; // Disable editing mode after saving
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}/${
                currentDate.getMonth() + 1
            }/${currentDate.getFullYear()}`;
            this.lastModificationDatePro = formattedDate;
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
        nom() {
            return this.employee.nom;
        },
        prenom() {
            return this.employee.prenom;
        },
        matricule() {
            return this.employee.matricule;
        },
        sexe() {
            return this.employee.sexe;
        },
        dateNaissance() {
            return this.employee.dateNaissance;
        },
        cin() {
            return this.employee.cin;
        },
        cnss() {
            return this.employee.cnss;
        },
        etatCivil() {
            return this.employee.etatCivil;
        },
        nbEnfants() {
            return this.employee.nbEnfants;
        },
        entiteAffectation() {
            return this.employee.entiteAffectation;
        },
        contrat() {
            return this.employee.contrat;
        },
        debutContrat() {
            return this.employee.debutContrat;
        },
        finContrat() {
            return this.employee.finContrat;
        },
        dateDebauche() {
            {
                return this.employee.dateDebauche;
            }
        },
        premierEmbauche() {
            return this.employee.premierEmbauche;
        },
        email() {
            return this.employee.email;
        },
        password() {
            return this.employee.password;
        },
        indemnité() {
            return this.employee.indemnité;
        },
        salaire() {
            return this.employee.salaire;
        },
    },
};
</script>
<style lang="scss" scoped>
#othersprofile {
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
        table {
            width: 100%;
            border-radius: 7px;
            table-layout: fixed;
            margin-bottom: 20px;
            margin-top: 20px;
            border: 1px solid green;

            tr {
                border-bottom: 1px solid #777;
                > td {
                    border-right: 1px solid #777;
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
            }
        }
    }
}
</style>
