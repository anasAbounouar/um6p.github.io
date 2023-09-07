<template>
    <div>
        <section id="bulletins">
            <div class="container">
                <h5>Bulletins de paie</h5>
                <!-- <div class="mt-3">
                    <month-picker
                        @change="showDate"
                        :lang="fr"
                        :clearable="true"
                        :editable-year="true"
                        :show-year="false"
                        :max-date="new Date()"
                        id="selectedMonth"
                    />
                </div> -->
                <div class="row mt-3">
                    <div class="col-12 d-flex align-items-center gap-10">
                        <div>Ajouter une demande</div>
                        <div
                            @click="addBulletin"
                            class="btn btn-primary d-flex align-items-center"
                        >
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                    <div class="col-12">
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date de depot</th>
                                    <th>
                                        <div class="filter-container">
                                            <select
                                                name=""
                                                id="etatBulletins"
                                                v-model="selectedEtatBulletin"
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    hidden
                                                    selected
                                                >
                                                    Etat
                                                </option>
                                                <option
                                                    v-for="option in etatOptions"
                                                    :key="option.id"
                                                >
                                                    {{ option.label }}
                                                </option>
                                            </select>
                                            <i
                                                class="fa-solid fa-sort-down p-absolute"
                                            ></i>
                                        </div>
                                    </th>
                                    <th>Changement</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="bulletin in filteredBulletins"
                                    :key="bulletin.id"
                                >
                                    <td>{{ bulletin.id }}</td>
                                    <td>{{ formatDate(bulletin.date) }}</td>
                                    <!-- Format the date here -->
                                    <td>
                                        <i
                                            class="fa-solid"
                                            :class="{
                                                'fa-spinner c-red':
                                                    !bulletin.etat,
                                                'fa-check c-nature':
                                                    bulletin.etat,
                                            }"
                                        ></i>
                                        <!-- {{ bulletin.etat ? "True" : "False" }} -->
                                    </td>
                                    <td>
                                        <div
                                            @click="action(bulletin)"
                                            class="btn btn-primary border-none"
                                            :class="{
                                                'bg-danger-color':
                                                    !bulletin.etat,
                                                'bg-my-blue-color':
                                                    bulletin.etat,
                                            }"
                                        >
                                            {{
                                                bulletin.etat
                                                    ? "Signaler"
                                                    : "Annuler"
                                            }}
                                        </div>
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
// import { MonthPicker } from "vue-month-picker";
import bulletins from "@/Js/bulletins";
import Swal from "sweetalert2";
export default {
    name: "bulletin-de-paie-page",
    components: {},
    data() {
        return {
            bulletins,
            etatOptions: [
                { id: 0, label: "Tout" },
                { id: 1, label: "validé" },
                { id: 2, label: "enCours" },
            ],
            selectedEtatBulletin: "",
        };
    },
    methods: {
        formatDate(date) {
            const [year, month, day] = date.split("-");
            return `${year}/${month}/${day}`;
        },
        addBulletin() {
            const newItem = {
                id: this.bulletins.length + 1,
                date: new Date().toISOString().slice(0, 10), // Format as YYYY-MM-DD of today
                etat: false, //bye default it is false
            };
            // i want to make sure that even if the user clicks more than once in one day , it is counted just as once
            // Check if a bulletin with the same date already exists
            const isDuplicateDate = this.bulletins.some(
                (bulletin) => bulletin.date === newItem.date
            );

            if (!isDuplicateDate) {
                Swal.fire({
                    icon: "question",
                    title: "Ajouter un bulletin",
                    text: "Êtes-vous sûr de vouloir ajouter un nouveau bulletin ?",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Oui, ajouter",
                    cancelButtonText: "Annuler",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // User confirmed, add the new bulletin
                        this.bulletins.push(newItem);
                    }
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Bulletin déjà existant",
                    text: "Un bulletin avec la même date existe déjà.",
                    timer: 2500,
                    timerProgressBar: true,
                });
            }
        },
        action(bulletin) {
            if (bulletin.etat === true) {
                Swal.fire({
                    icon: "info",
                    title: "Notification envoyé",
                    text: "Une notification est envoyée a l'admin pour qu'il  puisse reperer le probleme.",
                    timer: 5000, // Show the notification for 3 seconds (adjust as needed)
                    timerProgressBar: true,
                });
                return;
            } else {
                this.bulletins.splice(bulletin.id - 1, 1); // the index is id-1 because index starts from 0
            }
        },
    },
    computed: {
        filteredBulletins() {
            if (
                this.selectedEtatBulletin === "" ||
                this.selectedEtatBulletin === "Tout"
            ) {
                return this.bulletins;
            } else if (this.selectedEtatBulletin === "validé") {
                return this.bulletins.filter((bulletin) => {
                    return bulletin.etat === true;
                });
            } else {
                return this.bulletins.filter((bulletin) => {
                    return bulletin.etat === false;
                });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#bulletins {
    table {
        tr {
            th,
            td {
                padding: 10px;
                border: 2px solid #eee;
            }
        }
        .filter-container {
            cursor: pointer;
            font-size: 14px;
            line-height: 1.5;

            select {
                cursor: pointer;
                padding: 15px;
                margin-left: 15px;
                &:focus {
                    outline: none;
                    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
                    color: var(--link-hovered-color);
                }
                option {
                    border-top: 1px solid #ebebeb;
                    font-weight: 40px;
                    color: #5f6467;
                    padding: 5px;
                    background-color: #f0f0f0; /* Replace with your desired background color for all options */
                    color: #333; /* Replace with your desired text color for all options */
                }
            }
            position: relative;
            i {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -3px;
            }
        }
    }
}
</style>
