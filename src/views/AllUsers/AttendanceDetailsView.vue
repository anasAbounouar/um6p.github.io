<template>
    <div>
        <SideBarView />
        <NavBarView />

        <section id="attendance-j" v-if="isAttendanceJourne" class="container">
            <h5 class="c-brand">Attendance de la journé</h5>

            <div class="row mt-3 justify-content-center align-items-center">
                <v-app class="col-6">
                    <v-date-picker
                        v-model="selectedDate"
                        :landscape="landscape"
                        :min="minDate"
                        :max="maxDate"
                    ></v-date-picker>
                </v-app>
                <div class="mytable col-6">
                    <table class="m-auto mt-3">
                        <thead>
                            <tr>
                                <th>Total jour ouvré en heures</th>
                                <th>Total jour ouvré en jours</th>
                                <th>Total H.S</th>
                                <th>Total( jour ouvré et H.S) en heures</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>8</td>
                                <td>1</td>
                                <td>2</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section id="attendance-m" v-if="isAttendanceMois">
            <h5 class="mb-3 c-brand">Attendance du mois</h5>

            <div>
                <month-picker
                    :lang="fr"
                    :clearable="true"
                    :editable-year="true"
                    :show-year="false"
                    :max-date="new Date()"
                    id="selectedMonth"
                />
            </div>
            <div class="custom-calendar mt-3">
                <div class="week-days">
                    <div v-for="day in weekDays" :key="day">{{ day }}</div>
                </div>
                <!-- Calendar grid: display boxes for each day of the month -->
                <div class="calendar-grid">
                    <!-- Display the days of the week (Lundi, Mardi, etc.) -->

                    <!-- Display the days of the month in boxes -->
                    <div
                        v-for="day in daysInMonth"
                        :key="day"
                        class="day-box"
                        :class="{
                            'bg-ferie-box-color border-none': isFerie(
                                new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth(),
                                    day
                                )
                            ),
                        }"
                    >
                        <!-- Render data for each day (heures de présences, heures supplémentaires, etc.) -->
                        <div class="day-info">
                            <div class="number-of-day">
                                {{
                                    getNumber(
                                        new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            day
                                        )
                                    )
                                }}
                            </div>
                            <div class="presence mb-2 bg-presence-hour-color">
                                {{
                                    getPresenceData(
                                        new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            day
                                        )
                                    )
                                }}
                            </div>
                            <div class="supplementaires mb-2 bg-nature-color">
                                {{
                                    getSupplementairesData(
                                        new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            day
                                        )
                                    )
                                }}
                            </div>
                            <div class="ferie">
                                {{
                                    getFerieData(
                                        new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            day
                                        )
                                    )
                                }}
                            </div>
                            <div class="repos bg-red">
                                {{
                                    getReposData(
                                        new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            day
                                        )
                                    )
                                }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-color presence"></div>
                        <div class="legend-label">Heures de présence</div>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color ferie"></div>
                        <div class="legend-label">Jour férié</div>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color supplementaires"></div>
                        <div class="legend-label">Heures supplémentaires</div>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color repos"></div>
                        <div class="legend-label">Repos</div>
                    </div>
                </div>
            </div>
        </section>
        <section id="synthese-m" v-if="isSyntheseM" class="">
            <h5>Synthese du pointage d'un mois</h5>
            <div class="p-3">
                <month-picker
                    :lang="fr"
                    :clearable="true"
                    :editable-year="true"
                    :show-year="false"
                    :max-date="new Date()"
                    id="selectedMonth"
                />
            </div>
            <div class="mytable mx-3">
                <table class="m-auto mt-3">
                    <thead>
                        <tr>
                            <th>RMP</th>
                            <th>AA</th>
                            <th>ANA</th>
                            <th>JTS</th>
                            <th>JTHS</th>
                            <th>JRT</th>
                            <th>JFT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td>5</td>
                            <td>8</td>
                            <td>2</td>
                            <td>1</td>
                            <td>3</td>
                            <td>7</td>
                        </tr>
                    </tbody>
                </table>
                <table class="m-auto mt-3">
                    <thead>
                        <tr>
                            <th>CHS</th>
                            <th>JFCPH</th>
                            <th>CPM</th>
                            <th>PCB</th>
                            <th>Observation</th>
                            <th>RMC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>9</td>
                            <td>9</td>
                            <td>9</td>
                            <td>une telle observation</td>
                            <td>Mon rmc</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section id="synthese-s" v-if="isSyntheseS">
            <h5 class="mb-3 c-brand">Synthèse des heures supplémentaires</h5>

            <div>
                <month-picker
                    :lang="fr"
                    :clearable="true"
                    :editable-year="true"
                    :show-year="false"
                    :max-date="new Date()"
                    id="selectedMonth"
                />
            </div>
            <div class="mytable my-3">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>
                                Entrée Hs
                                <i class="fa-regular fa-clock c-nature"></i>
                            </th>
                            <th>
                                Sortie Hs
                                <i class="fa-regular fa-clock c-red"></i>
                            </th>
                            <th>
                                Hs <i class="fa-solid fa-hourglass-start"></i>
                            </th>

                            <th>
                                Lieu <i class="fa-solid fa-location-dot"></i>
                            </th>
                            <th>Projet</th>

                            <th>Travail effectué</th>
                            <th>Superviseur</th>
                            <th>
                                <div class="filter-container">
                                    <select
                                        v-model="selectedEtatValidation"
                                        name="Validation"
                                        id="etatValidationFilter"
                                    >
                                        <option
                                            value=""
                                            selected
                                            disabled
                                            hidden
                                        >
                                            Validation
                                        </option>
                                        <option
                                            v-for="option in etatValidationOptions"
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="projet in filteredProjects" :key="projet.id">
                            <td>{{ projet.Date }}</td>
                            <td>{{ projet.entreeHs }}</td>
                            <td>11.51</td>
                            <td>
                                {{ projet.hs }}
                            </td>

                            <td>{{ projet.place }}</td>
                            <td>{{ projet.nom }}</td>
                            <td>{{ projet.travailEffectue }}</td>
                            <td>{{ projet.superviseur }}</td>
                            <td>
                                <i
                                    class="fa-solid"
                                    :class="etatValidationBetter(projet)"
                                ></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h5>
                Cummul des heures supplementaires
                <span class="bg-nature-color rad-6 p-2 c-white">17 H</span>
            </h5>
        </section>
    </div>
</template>

<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
import { MonthPicker } from "vue-month-picker";
import projets from "@/Js/projects.js";
export default {
    components: { SideBarView, NavBarView, MonthPicker },
    name: "attendance-details",
    data() {
        return {
            selectedMonth: null, // Initialize to null initially.
            isAttendanceJourne: this.$route.params.id === "journe",
            isAttendanceMois: this.$route.params.id === "mois",
            isSyntheseM: this.$route.params.id === "SyntheseMois",
            isSyntheseS: this.$route.params.id === "SyntheseS",
            selectedDate: new Date().toISOString().substr(0, 10),
            landscape: false,
            //  selectedDate: new Date(), // Default selected date is today
            minDate: "2017-01-01", // Set the minimum selectable date
            maxDate: new Date().toISOString().substr(0, 10), // Set the maximum selectable date
            // Sample data for days (you can replace this with your own data)
            currentMonth: new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
            }),
            currentDate: new Date(),
            projets,
            etatValidationOptions: [
                { id: 0, label: "Tout" },
                { id: 1, label: "validé" },
                { id: 2, label: "refusé" },
                { id: 3, label: "enCours" },
            ],
            selectedEtatValidation: "",
        };
    },
    computed: {
        daysInMonth() {
            // Calculate the total number of days in the current month
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth() + 1; // Months are zero-based, so add 1
            // Check if currentDate is a valid date object
            if (isNaN(year) || isNaN(month)) {
                return 0; // Return 0 if currentDate is invalid
            }
            return new Date(year, month, 0).getDate();
        },
        weekDays() {
            return [
                "Lundi",
                "Mardi",
                "Mercredi",
                "Jeudi",
                "Vendredi",
                "Samedi",
                "Dimanche",
            ];
        },
        etatValidationBetter() {
            return (projet) => {
                if (projet.etatValidation === true) {
                    return "fa-check c-nature";
                } else if (projet.etatValidation === false) {
                    return "fa-x c-red";
                }
                return "fa-spinner";
            };
        },
        filteredProjects() {
            // Return all projects if no filter is selected
            if (
                this.selectedEtatValidation === "" ||
                this.selectedEtatValidation === "Tout"
            ) {
                return this.projets;
            }

            // Otherwise, filter the projects based on the selected etatValidation state
            return this.projets.filter((projet) => {
                if (this.selectedEtatValidation === "validé") {
                    return projet.etatValidation === true;
                } else if (this.selectedEtatValidation === "refusé") {
                    return projet.etatValidation === false;
                } else {
                    return projet.etatValidation === "enCours";
                }
            });
        },
    },
    methods: {
        prevMonth() {
            // Logic to go to the previous month
        },
        nextMonth() {
            // Logic to go to the next month
        },
        getPresenceData(day) {
            // Logic to fetch and return 'heures de présences' data for the given day
            // Replace this with your data-fetching logic
            // you should get the data from somewhere else checkron, the day ===0 doenst mean anything i just
            //i just didnt want to get an error for not using the day parametre
            const dayOfMonth = day.getDate();
            const dayOfWeek = day.getDay();
            if (
                dayOfWeek === 4 ||
                dayOfWeek === 5 ||
                dayOfMonth === 18 ||
                dayOfMonth === 19
            ) {
                return null; // Return "F" for Saturday and Sunday
            }
            return "H";
        },
        getSupplementairesData(day) {
            // Logic to fetch and return 'heures supplémentaires' data for the given day
            // Replace this with your data-fetching logic
            const dayOfMonth = day.getDate();
            const dayOfWeek = day.getDay();
            if (
                dayOfWeek === 4 ||
                dayOfWeek === 5 ||
                dayOfMonth === 18 ||
                dayOfMonth === 19
            ) {
                return null; // Return "F" for Saturday and Sunday
            }
            return "Hs";
        },
        getFerieData(day) {
            // Logic to fetch and return 'jour férié' data for the given day
            // Replace this with your data-fetching logic
            const dayOfWeek = day.getDay();
            console.log(dayOfWeek);

            // Check if the day is Saturday (6) or Sunday (0)
            if (dayOfWeek === 4 || dayOfWeek === 5) {
                return "F"; // Return "F" for Saturday and Sunday
            } else {
                // Replace this with your data-fetching logic
                return null; // Return null for other days
            }
        },
        isFerie(day) {
            const ferieData = this.getFerieData(day);
            return ferieData === "F";
        },

        getReposData(day) {
            // Logic to fetch and return 'repos' data for the given day
            // Replace this with your data-fetching logic
            const dayOfMonth = day.getDate(); // Get the day of the month
            if (dayOfMonth === 18 || dayOfMonth === 19) {
                return "R"; // Return "R" for the 16th and 18th day of the month
            } else {
                return null; // Return null for other days
            }
        },
        getNumber(day) {
            const dayOfMonth = day.getDate();
            return dayOfMonth;
        },
    },
    created() {
        this.selectedMonth = new Date().toISOString().substr(0, 7);
        console.log(this.projets);
        console.log(this.users);
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}

.calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
    width: 50%;
    margin: auto;
    margin-bottom: 30px;
}
.presence,
.supplementaires,
.repos {
    width: 90%;
    text-align: center;
    margin: auto;
    border-radius: 4px;
}
.day-box {
    border: 2px solid #eee;
    border-radius: 6px;
    font-family: cursive;
}
.week-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}
.calendar-grid {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 7 columns */
    grid-template-rows: repeat(4, 1fr); /* 4 rows */
    gap: 5px; /* Adjust the gap between day boxes */
}
.legend {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .legend-item {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .legend-color {
            width: 20px;
            height: 20px;
            margin-right: 5px;
            border-radius: 50%;
        }

        /* Define colors for the legend */
        .presence {
            background-color: var(
                --presence-hour-color
            ) !important; /* Replace with your desired color for "Heures de présence" */
        }

        .ferie {
            background-color: var(
                --ferie-box-color
            ) !important; /* Replace with your desired color for "Jour férié" */
        }

        .supplementaires {
            background-color: var(
                --nature-color
            ) !important; /* Replace with your desired color for "Heures supplémentaires" */
        }

        .repos {
            background-color: red; /* Replace with your desired color for "Repos" */
        }
    }
}
/* Your styles for the day boxes and data... */
// .day-box {
//     /* Your styles... */
// }

// /* Your styles for the data within each day box... */
.day-info {
    .number-of-day {
        display: flex;
        align-content: flex-start;
        padding-left: 5px;
    }
}
#attendance-j {
    .day-box {
        border: 1px solid #ccc;
        padding: 10px;
    }
    .mytable {
        // margin-top: 30px;
        padding: 10px;
        border: 3px solid #eee;
        border-radius: 4px;
        table {
            tr {
                th,
                td {
                    padding: 10px;
                }
            }
        }
    }
}
#synthese-m {
    .mytable {
        table {
            tr {
                th,
                td {
                    padding: 14px;
                    border: 1px solid #eee;
                }
            }
        }
    }
}
#synthese-s {
    .mytable {
        table {
            margin: auto;
            tr {
                th,
                td {
                    padding: 14px;
                    border: 1px solid #eee;
                }
            }
        }
        .filter-container {
            cursor: pointer;
            font-size: 14px;
            line-height: 1.5;

            select {
                cursor: pointer;
                padding: 15px;
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
