<template>
    <div>
        <section id="attendance-j" v-if="isAttendanceJourne" class="container">
            <h5 class="c-brand">Attendance de la journé</h5>

            <div class="row mt-3 justify-content-center align-items-center">
                <label for="yearSelect">Choisir une année</label>
                <select id="yearSelect" v-model="selectedYear">
                    <option
                        v-for="year in [2023, 2024, 2025]"
                        :key="year"
                        :value="year"
                    >
                        {{ year }}
                    </option>
                </select>

                <label for="monthSelect">Choisir un mois</label>
                <select id="monthSelect" v-model="selectedMonth">
                    <option
                        v-for="month in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                        :key="month"
                        :value="month"
                    >
                        {{ months[month - 1] }}
                    </option>
                </select>
                <label for="daySelect"> Choisir un jour</label>
                <select id="daySelect" v-model="selectedDate">
                    <option v-for="day in daysInMonth" :key="day" :value="day">
                        {{ day }}
                    </option>
                </select>
                <div class="mytable col-12">
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
                                <td>
                                    {{
                                        monAttendance(
                                            this.selectedYear,
                                            this.selectedMonth,
                                            this.selectedDate
                                        )[0]
                                    }}
                                </td>
                                <td>
                                    {{
                                        monAttendance(
                                            this.selectedYear,
                                            this.selectedMonth,
                                            this.selectedDate
                                        )[1]
                                    }}
                                </td>
                                <td>
                                    {{
                                        monAttendance(
                                            this.selectedYear,
                                            this.selectedMonth,
                                            this.selectedDate
                                        )[2]
                                    }}
                                </td>
                                <td>
                                    {{
                                        monAttendance(
                                            this.selectedYear,
                                            this.selectedMonth,
                                            this.selectedDate
                                        )[3]
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section id="attendance-m" v-if="isAttendanceMois">
            <h5 class="mb-3 c-brand">Attendance du mois</h5>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-10">
                        <label for="yearSelect" class="w-full"
                            >Choisir une année</label
                        >
                        <select
                            id="yearSelect"
                            v-model="selectedYear"
                            class="w-full"
                        >
                            <option
                                v-for="year in [2023, 2024, 2025]"
                                :key="year"
                                :value="year"
                            >
                                {{ year }}
                            </option>
                        </select>

                        <label for="monthSelect" class="w-full"
                            >Choisir un mois</label
                        >
                        <select
                            id="monthSelect"
                            class="w-full"
                            v-model="selectedMonth"
                        >
                            <option
                                v-for="month in [
                                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                                ]"
                                :key="month"
                                :value="month"
                            >
                                {{ months[month - 1] }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-11">
                        <div class="custom-calendar mt-3">
                            <div class="week-days">
                                <div v-for="day in weekDays" :key="day">
                                    {{ day }}
                                </div>
                            </div>
                            <!-- Calendar grid: display boxes for each day of the month -->
                            <div class="calendar-grid">
                                <!-- Display the days of the week (Lundi, Mardi, etc.) -->

                                <!-- Display the days of the month in boxes -->
                                <div
                                    v-for="day in daysInMonth"
                                    :key="day"
                                    class="day-box"
                                    :value="day"
                                    :class="{
                                        'bg-WeekEnd-box-color border-none':
                                            isWeekEnd(
                                                new Date(
                                                    selectedYear,
                                                    selectedMonth - 1,
                                                    day
                                                )
                                            ),
                                        'border-none ferie': isFerie(
                                            new Date(
                                                selectedYear,
                                                selectedMonth - 1,
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
                                                        selectedYear,
                                                        selectedMonth - 1,
                                                        day
                                                    )
                                                )
                                            }}
                                        </div>
                                        <div class="presence-cell">
                                            {{
                                                getPresenceData(
                                                    selectedYear,
                                                    selectedMonth,
                                                    day
                                                )
                                            }}
                                        </div>
                                        <div class="supplementaires-cell">
                                            {{
                                                getSupplementairesData(
                                                    selectedYear,
                                                    selectedMonth,
                                                    day
                                                )
                                            }}
                                        </div>
                                        <!-- <div class="WeekEnd-cell">
                                            {{
                                                getWeekEnd(
                                                    new Date(
                                                        selectedYear,
                                                        selectedMonth - 1,
                                                        day
                                                    )
                                                )
                                            }}
                                        </div> -->
                                        <div class="repos-cell">
                                            {{
                                                getReposData(
                                                    new Date(
                                                        selectedYear,
                                                        selectedMonth - 1,
                                                        day
                                                    )
                                                )
                                            }}
                                        </div>
                                        <!-- <div class="">
                                            {{
                                                getFerie(
                                                    getDateString(
                                                        selectedYear,
                                                        selectedMonth,
                                                        day
                                                    )
                                                )
                                            }}
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="legend">
                                <div class="legend-item">
                                    <div class="legend-color presence"></div>
                                    <div class="legend-label">
                                        Heures de présence
                                    </div>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color WeekEnd"></div>
                                    <div class="legend-label">Week end</div>
                                </div>
                                <div class="legend-item">
                                    <div
                                        class="legend-color supplementaires"
                                    ></div>
                                    <div class="legend-label">
                                        Heures supplémentaires
                                    </div>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color repos"></div>
                                    <div class="legend-label">Repos</div>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color ferie"></div>
                                    <div class="legend-label">Jour ferié</div>
                                </div>
                            </div>
                        </div>
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
// import { MonthPicker } from "vue-month-picker";
import projets from "@/Js/projects.js";
export default {
    name: "attendance-details",
    data() {
        return {
            currentDate: new Date(),
            months: [
                "Janvier",
                "Février",
                "Mars",
                "Avril",
                "Mai",
                "Juin",
                "Juillet",
                "Août",
                "Septembre",
                "Octobre",
                "Novembre",
                "Décembre",
            ],
            attendanceJournée: [
                {
                    date: "2023-08-28",
                    JOEH: 8, // Jours ouvré en heures
                    HSUPP: 2,
                },
                {
                    date: "2023-08-29",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-08-30",
                    JOEH: 8,
                    HSUPP: 2,
                },
                {
                    date: "2023-09-01",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-02",
                    JOEH: 7,
                    HSUPP: 3,
                },
                {
                    date: "2023-09-03",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-04",
                    JOEH: 8,
                    HSUPP: 3,
                },
                {
                    date: "2023-09-05",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-06",
                    JOEH: 8,
                    HSUPP: 3,
                },
                {
                    date: "2023-09-07",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-08",
                    JOEH: 8,
                    HSUPP: 3,
                },
                {
                    date: "2023-09-09",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-10",
                    JOEH: 8,
                    HSUPP: 3,
                },
                {
                    date: "2023-09-11",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-12",
                    JOEH: 8,
                    HSUPP: 3,
                },
                {
                    date: "2023-09-13",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-14",
                    JOEH: 8,
                    HSUPP: 3,
                },
                {
                    date: "2023-09-15",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-16",
                    JOEH: 8,
                    HSUPP: 3,
                },
                {
                    date: "2023-09-17",
                    JOEH: 6,
                    HSUPP: 0,
                },
                {
                    date: "2023-09-18",
                    JOEH: 8,
                    HSUPP: 3,
                },
            ],
            selectedDate: new Date().getDate(),
            selectedYear: new Date().getFullYear(),
            selectedMonth: new Date().getMonth() + 1,
            heuresSupp: [
                {
                    HS: 3,
                    date: "2023-07-05",
                },
                {
                    HS: 2,
                    date: "2023-08-10",
                },
                {
                    HS: 4,
                    date: "2023-08-15",
                },
                {
                    HS: 1,
                    date: "2023-08-20",
                },
                {
                    HS: 2,
                    date: "2023-08-25",
                },
                {
                    HS: 2,
                    date: "2023-09-05",
                },
                {
                    HS: 3,
                    date: "2023-09-10",
                },
                {
                    HS: 1,
                    date: "2023-09-15",
                },
                {
                    HS: 6,
                    date: "2023-09-18",
                },
                {
                    HS: 4,
                    date: "2023-09-20",
                },
                {
                    HS: 2,
                    date: "2023-09-25",
                },
            ],
            heuresPresence: [
                { HS: 6, date: "2023-09-01" },
                { HS: 8, date: "2023-09-02" },
                { HS: 8, date: "2023-09-03" },
                { HS: 6, date: "2023-09-04" },
                { HS: 8, date: "2023-09-05" },
                { HS: 8, date: "2023-09-07" },
                { HS: 6, date: "2023-09-08" },
                { HS: 6, date: "2023-09-09" },
                { HS: 8, date: "2023-09-10" },
                { HS: 6, date: "2023-09-11" },
                { HS: 6, date: "2023-09-12" },
                { HS: 6, date: "2023-09-14" },
                { HS: 8, date: "2023-09-15" },
                { HS: 6, date: "2023-09-16" },
                { HS: 8, date: "2023-09-17" },
                { HS: 8, date: "2023-09-19" },
                { HS: 6, date: "2023-09-21" },
                { HS: 6, date: "2023-09-22" },
                { HS: 8, date: "2023-09-23" },
                { HS: 6, date: "2023-09-24" },
                { HS: 8, date: "2023-09-26" },
                { HS: 8, date: "2023-09-28" },
                { HS: 6, date: "2023-09-29" },
                { HS: 6, date: "2023-09-30" },
                { HS: 6, date: "2023-09-31" },
                { HS: 6, date: "2023-08-01" },
                { HS: 7, date: "2023-08-02" },
                { HS: 8, date: "2023-08-03" },
                { HS: 6, date: "2023-08-04" },
                { HS: 6, date: "2023-08-05" },
                { HS: 6, date: "2023-08-06" },
                { HS: 6, date: "2023-08-07" },
                { HS: 6, date: "2023-08-08" },
                { HS: 6, date: "2023-08-09" },
                { HS: 6, date: "2023-08-10" },
                { HS: 6, date: "2023-08-11" },
                { HS: 6, date: "2023-08-12" },
                { HS: 6, date: "2023-08-13" },
                { HS: 6, date: "2023-08-14" },
                { HS: 6, date: "2023-08-16" },
                { HS: 6, date: "2023-08-17" },
                { HS: 6, date: "2023-08-18" },
                { HS: 6, date: "2023-08-19" },
                { HS: 6, date: "2023-08-20" },
                { HS: 6, date: "2023-08-21" },
                { HS: 6, date: "2023-08-22" },
                { HS: 6, date: "2023-08-23" },
                { HS: 6, date: "2023-08-24" },
                { HS: 6, date: "2023-08-25" },
                { HS: 6, date: "2023-08-26" },
                { HS: 6, date: "2023-08-27" },
                { HS: 6, date: "2023-08-28" },
                { HS: 6, date: "2023-08-29" },
                { HS: 6, date: "2023-08-30" },
                { HS: 6, date: "2023-08-31" },
                // ... continue for all days in September
                { HS: 6, date: "2023-09-30" },
            ],
            ferieDays: [
                {
                    startDate: "2023-09-21",
                    endDate: "2023-09-24",
                },
                {
                    startDate: "2023-08-20",
                    endDate: "2023-08-21",
                },
            ],
            // selectedDate: new Date().toISOString().substr(0, 10),
            landscape: false,
            //  selectedDate: new Date(), // Default selected date is today
            minDate: "2017-01-01", // Set the minimum selectable date
            maxDate: new Date().toISOString().substr(0, 10), // Set the maximum selectable date
            // Sample data for days (you can replace this with your own data)
            currentMonth: new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
            }),
            projets,
            etatValidationOptions: [
                { id: 0, label: "Tout" },
                { id: 1, label: "validé" },
                { id: 2, label: "refusé" },
                { id: 3, label: "enCours" },
            ],
            selectedEtatValidation: "",
            isAttendanceJourne: this.$route.params.id === "journe",
            isAttendanceMois: this.$route.params.id === "mois",
            isSyntheseM: this.$route.params.id === "SyntheseMois",
            isSyntheseS: this.$route.params.id === "SyntheseS",
        };
    },
    computed: {
        daysInMonth() {
            // Calculate the total number of days in the current month
            const year = this.selectedYear;
            const month = this.selectedMonth - 1; // Months are zero-based, so add 1
            // Check if currentDate is a valid date object
            if (isNaN(year) || isNaN(month)) {
                return 0; // Return 0 if currentDate is invalid
            }
            return new Date(year, month, 0).getDate();
        },
        weekDays() {
            const firstDayOfMonth = new Date(
                this.selectedYear,
                this.selectedMonth - 1,
                1
            );
            const firstDayOfWeek = firstDayOfMonth.getDay();
            const weekDaysNames = [
                "Dimanche",
                "Lundi",
                "Mardi",
                "Mercredi",
                "Jeudi",
                "Vendredi",
                "Samedi",
            ];

            // Rearrange the weekDaysNames array based on the first day of the week
            const reorderedWeekDays = [
                ...weekDaysNames.slice(firstDayOfWeek),
                ...weekDaysNames.slice(0, firstDayOfWeek),
            ];

            return reorderedWeekDays;
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
        calculateTotal(...args) {
            return args.reduce(
                (total, current) => total + parseFloat(current),
                0
            );
        },
        getDateString(year, month, day) {
            const monthStr = month < 10 ? `0${month}` : `${month}`;
            const dayStr = day < 10 ? `0${day}` : `${day}`;
            return `${year}-${monthStr}-${dayStr}`;
        },
        monAttendance(year, month, day) {
            const formattedDate = this.getDateString(year, month, day);

            const result = this.attendanceJournée.filter((ele) => {
                return ele.date === formattedDate;
            });
            if (result.length > 0) {
                const matchedEntry = result[0]; // Take the first matched entry
                return [
                    matchedEntry.JOEH,
                    parseFloat(matchedEntry.JOEH / 8),
                    matchedEntry.HSUPP,
                    parseFloat(matchedEntry.JOEH) +
                        parseFloat(matchedEntry.HSUPP), // Calculate the total here
                ];
            }

            // If no matching entry is found, return an array of zeros or appropriate values
            return [0, 0, 0, 0];
        },
        getPresenceData(year, month, day) {
            const formattedDate = this.getDateString(year, month, day);
            const heurePresence = this.heuresPresence.filter((ele) => {
                return ele.date === formattedDate;
            });

            if (heurePresence.length > 0) {
                return heurePresence[0].HS;
            } else {
                return null;
            }
        },
        getSupplementairesData(year, month, day) {
            const formattedDate = this.getDateString(year, month, day);
            const result = this.heuresSupp.filter((ele) => {
                return ele.date === formattedDate;
            });
            if (result.length > 0) {
                return result[0].HS;
            } else {
                return null;
            }
        },
        getWeekEnd(day) {
            // Logic to fetch and return 'jour férié' data for the given day
            // Replace this with your data-fetching logic
            const dayOfWeek = day.getDay();

            // Check if the day is Saturday (6) or Sunday (0)
            if (dayOfWeek === 0) {
                return "D"; // Return "D" for Dimanche
            } else {
                // Replace this with your data-fetching logic
                return null; // Return null for other days
            }
        },
        getFerie(day) {
            const result = this.ferieDays.filter((ele) => {
                const startDate = new Date(ele.startDate);
                const endDate = new Date(ele.endDate);
                const currentDate = new Date(day);

                const startDateYear = startDate.getFullYear();
                const startDateMonth = startDate.getMonth();
                const startDateDay = startDate.getDate();

                const endDateYear = endDate.getFullYear();
                const endDateMonth = endDate.getMonth();
                const endDateDay = endDate.getDate();

                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth();
                const currentDay = currentDate.getDate();

                return (
                    new Date(startDateYear, startDateMonth, startDateDay) <=
                        new Date(currentYear, currentMonth, currentDay) &&
                    new Date(endDateYear, endDateMonth, endDateDay) >=
                        new Date(currentYear, currentMonth, currentDay)
                );
            });

            if (result.length > 0) {
                return "F";
            } else {
                return null;
            }
        },

        isFerie(day) {
            console.log(
                "for day",
                day,
                " result is ",
                this.getFerie(day) === "F"
            );
            return this.getFerie(day) === "F";
        },
        isWeekEnd(day) {
            return this.getWeekEnd(day) === "D";
        },

        getReposData(day) {
            // Logic to fetch and return 'repos' data for the given day
            // Replace this with your data-fetching logic
            const dayOfMonth = day.getDate(); // Get the day of the month
            if (dayOfMonth === 18) {
                return "R"; // Return "R" for the 16th and 18th day of the month
            } else {
                return null; // Return null for other days
            }
        },
        getNumber(day) {
            const dayOfMonth = day.getDate();
            return dayOfMonth;
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        getRandomDate(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const randomTime =
                start.getTime() +
                Math.random() * (end.getTime() - start.getTime());
            return new Date(randomTime).toISOString().slice(0, 10);
        },
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
/* Style for the year and month selects */
#yearSelect,
#monthSelect,
#daySelect {
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}
.day-box {
    border: 2px solid #eee;
    border-radius: 6px;
    font-family: cursive;
    min-height: 100px;
    min-width: 100px;
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
    .presence-cell,
    .supplementaires-cell,
    .repos-cell {
        width: 90%;
        text-align: center;
        margin: 3px;
        border-radius: 4px;
    }
    .repos-cell {
        background-color: #dc3545;
        color: white;
    }

    .presence-cell {
        background-color: #28a745; /* Replace with your desired color for "Heures de présence" */
    }

    .supplementaires-cell {
        background-color: #007bff; /* Replace with your desired color for "Heures supplémentaires" */
    }

    .ferie {
        background-color: #9b59b6 !important;
    }
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
            background-color: #28a745 !important; /* Replace with your desired color for "Heures de présence" */
        }

        .WeekEnd {
            background-color: #ffc107 !important; /* Replace with your desired color for "Jour férié" */
            color: white;
        }

        .supplementaires {
            background-color: #007bff !important; /* Replace with your desired color for "Heures supplémentaires" */
        }

        .repos {
            background-color: #dc3545; /* Replace with your desired color for "Repos" */
        }
        .ferie {
            background-color: #9b59b6;
        }
    }
}
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
        margin-top: 30px;
        padding: 10px;
        border: 3px solid #eee;
        border-radius: 4px;
        table {
            tr {
                th,
                td {
                    padding: 10px;
                }
                td:last-child {
                    color: var(--link-hovered-color);
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
