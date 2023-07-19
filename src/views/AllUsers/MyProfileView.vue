<template>
    <div>
        <SideBarView />
        <NavBarView />
        <section id="myprofile">
            <div class="general-info container mb-3 px-4">
                <div class="row">
                    <div class="col-6 d-flex flex-d-c">
                        <div class="d-flex justify-content-between nom">
                            <div>Nom & Prenom :</div>
                            <div>
                                <span
                                    >{{ user && user.nom }}
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
                        <span class="absolute">
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
                        <span>
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
                                <span class="c-grey"> 19/07/2023</span>
                            </div>
                        </div>
                        <div
                            v-if="infospersoChosen"
                            class="infosperso-box mt-3"
                        >
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Sexe</td>
                                        <td>Homme</td>
                                    </tr>
                                    <tr>
                                        <td>Date de naissance</td>
                                        <td>09/06/1999</td>
                                    </tr>
                                    <tr>
                                        <td>CIN</td>
                                        <td>E1793B</td>
                                    </tr>
                                    <tr>
                                        <td>CNSS</td>
                                        <td>FM6</td>
                                    </tr>
                                    <tr>
                                        <td>Etat civil</td>
                                        <td>marié</td>
                                    </tr>
                                    <tr>
                                        <td>Nb d'enfants</td>
                                        <td>2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="infosproChosen" class="infospro-box mt-3">
                            <div class="my-3 d-flex justify-content-end">
                                <i
                                    class="fa fa-pencil"
                                    @click="toggleEditing"
                                    v-show="!isEditing"
                                ></i>
                                <i
                                    class="fa fa-check"
                                    @click="saveData"
                                    v-show="isEditing"
                                ></i>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Entité d’affectation</td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditing"
                                                v-model="entite"
                                                :class="{
                                                    'border-none': !isEditing,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Contrat</td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditing"
                                                v-model="contrat"
                                                :class="{
                                                    'border-none': !isEditing,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date prévue d’embauche</td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditing"
                                                v-model="dateEmbauche"
                                                :class="{
                                                    'border-none': !isEditing,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Début de contrat</td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditing"
                                                v-model="debutContrat"
                                                :class="{
                                                    'border-none': !isEditing,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fin de contrat</td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditing"
                                                v-model="finContrat"
                                                :class="{
                                                    'border-none': !isEditing,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date de débauche</td>
                                        <td>
                                            <input
                                                type="date"
                                                :disabled="!isEditing"
                                                v-model="dateDebauche"
                                                :class="{
                                                    'border-none': !isEditing,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Salaire mensuel net</td>
                                        <td>
                                            <input
                                                type="number"
                                                :disabled="!isEditing"
                                                v-model="salaireNet"
                                                :class="{
                                                    'border-none': !isEditing,
                                                }"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Indemnité mensuelle transport</td>
                                        <td>
                                            <input
                                                type="text"
                                                :disabled="!isEditing"
                                                v-model="indemniteTransport"
                                                :class="{
                                                    'border-none': !isEditing,
                                                }"
                                            />
                                        </td>
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
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";

export default {
    name: "myprofile-page",
    // props: ["user"],
    components: {
        SideBarView, // Use the correct component name here
        NavBarView,
    },
    data() {
        return {
            user: null,
            projectChosen: true,
            infospersoChosen: false,
            infosproChosen: false,
            entite: "entite1",
            contrat: "CICD",
            dateEmbauche: "1999-08-10",
            debutContrat: "1999-08-10",
            finContrat: "1999-08-10",
            dateDebauche: "1999-08-10",
            salaireNet: "1900",
            indemniteTransport: "What is this ?",
            isEditing: false,
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
            this.projectChosen = !this.projectChosen;
            this.infospersoChosen = false;
            this.infosproChosen = false;
        },
        toggleinfosPerso() {
            this.infospersoChosen = !this.infospersoChosen;
            this.projectChosen = false;
            this.infosproChosen = false;
        },
        toggleinfosPro() {
            this.infosproChosen = !this.infosproChosen;
            this.projectChosen = false;
            this.infospersoChosen = false;
        },
        toggleEditing() {
            this.isEditing = !this.isEditing;
        },
        saveData() {
            // Perform any necessary operations to save the data a si che9ron :)
            this.isEditing = false; // Disable editing mode after saving
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
            tr {
                border-bottom: 1px solid #777;
                > td {
                    border-right: 1px solid #777;
                }
                td {
                    padding: 10px;
                }
                td:first-child {
                    font-weight: bold;
                }
            }
        }
    }
    .infospro-box {
        i {
            font-size: 25px;
        }
        table {
            td:first-child {
                font-weight: bold;
            }
            input:disabled {
                min-width: 200px;
            }
            input:enabled {
                min-width: 200px;
                border-radius: 6px;
                border: 2px solid #eee;
                transition: 0.3s;
                &:focus {
                    border: 2px solid green !important;
                    outline: none;
                }
            }
        }
    }
}
</style>
