<template>
    <div>
        <section id="pointage">
            <div class="container head">
                <div class="row">
                    <div class="col-12">
                        <h4>Gérer la présence du personnel</h4>
                        <div class="Generer d-flex">
                            <!-- <div>
                                <button @click="downloadPDF">
                                    Download PDF
                                </button>
                            </div> -->

                            <span
                                @click.prevent="initializeRealExistance"
                                class="btn btn-primary"
                                >Generer</span
                            >
                            <!-- Display message based on genererClicked -->
                            <div class="validation-message">
                                <span
                                    v-if="pointageValidated[this.selectedDate]"
                                    class="success-message"
                                    >Pointage est bien validé pour le jour
                                    {{ selectedDate }}
                                </span>
                                <!-- <span v-else class="warning-message"
                                    >Vous devez générer l'attendance avant de
                                    valider</span
                                > -->
                            </div>
                        </div>
                    </div>
                    <div class="col-4 p-relative">
                        <select name="" id="" v-model="selectedEmployeur">
                            <option selected>Employeur</option>
                            <option
                                :value="employeur"
                                v-for="employeur in employeurs"
                                :key="employeur"
                            >
                                {{ employeur }}
                            </option>
                        </select>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div class="col-4 p-relative">
                        <select name="" id="" v-model="selectedPoste">
                            <option selected>Poste</option>
                            <option
                                :value="poste"
                                v-for="poste in postes"
                                :key="poste"
                            >
                                {{ poste }}
                            </option>
                        </select>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div
                        class="col-4 d-flex justify-content-center align-items-center flex-d-c"
                    >
                        <!-- <label for="date">Date</label> -->
                        <input id="date" type="date" v-model="selectedDate" />
                    </div>
                    <div class="col-12">
                        <span>
                            <div class="matin-soir mb-3 d-flex">
                                <span
                                    style="cursor: pointer"
                                    class="btn btn-info"
                                    >Matin</span
                                >
                            </div></span
                        >
                        <table id="lol">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            class="w-full"
                                            type="text"
                                            v-model="searchMatricule"
                                            placeholder="Matricule"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            class="w-full"
                                            type="text"
                                            v-model="searchPrenomNom"
                                            placeholder="Nom & Prenom"
                                        />
                                    </th>
                                    <th>Presence</th>
                                    <th>Etat d’absence</th>
                                    <th>Just</th>
                                    <th>Entrée</th>
                                    <th>Sortie</th>
                                    <th>Heures</th>
                                    <th>Capacité</th>
                                    <th>Hs Supp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="employee in GeneralFilter"
                                    :key="employee.id"
                                >
                                    <td>
                                        {{ employee.matricule }}
                                    </td>
                                    <td>
                                        {{ employee.nom }} {{ employee.prenom }}
                                    </td>

                                    <td>
                                        <!-- getAbsenceStatus(
                                                    employee.id,
                                                    selectedDate
                                                ) -->
                                        <select
                                            v-model="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ]
                                            "
                                            @change="updateEntréeSortie()"
                                            :style="{
                                                backgroundColor:
                                                    getBackgroundColor(
                                                        realExistance[
                                                            `${employee.id}-${selectedDate}-morning`
                                                        ]
                                                    ),
                                            }"
                                        >
                                            <option value="Present">
                                                Present
                                            </option>
                                            <option value="Absent">
                                                Absent
                                            </option>
                                            <option value="Absent P">
                                                Absent P
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            v-if="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ] !== 'Present'
                                            "
                                            v-model="
                                                selectedEtatAbsence[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ]
                                            "
                                        >
                                            <option value="AA">AA</option>
                                            <option value="ANA">ANA</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            v-if="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ] !== 'Present' &&
                                                selectedEtatAbsence[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ] === 'AA'
                                            "
                                            v-model="
                                                selectedJustifications[
                                                    employee.id
                                                ][selectedDate].just
                                            "
                                        >
                                            <option value="MGE">MGE</option>
                                            <option value="C">C</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                        <!-- {{
                                            selectedJustifications[employee.id]
                                        }} -->
                                    </td>
                                    <td
                                        :style="{
                                            backgroundColor:
                                                getBackgroundColorTime(
                                                    realExistance[
                                                        `${employee.id}-${selectedDate}-morning`
                                                    ]
                                                ),
                                        }"
                                    >
                                        <input
                                            v-if="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ] !== 'Absent'
                                            "
                                            type="time"
                                            v-model="
                                                realEntrée[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ]
                                            "
                                        />
                                    </td>
                                    <td
                                        :style="{
                                            backgroundColor:
                                                getBackgroundColorTime(
                                                    realExistance[
                                                        `${employee.id}-${selectedDate}-morning`
                                                    ]
                                                ),
                                        }"
                                    >
                                        <input
                                            v-if="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ] !== 'Absent'
                                            "
                                            type="time"
                                            v-model="
                                                realSortie[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ]
                                            "
                                        />
                                        <!-- {{
                                            realSortie[
                                                `${employee.id}-${selectedDate}-morning`
                                            ]
                                        }} -->
                                    </td>
                                    <td>
                                        {{
                                            calculateHoursDifference(
                                                realEntrée[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ],
                                                realSortie[
                                                    `${employee.id}-${selectedDate}-morning`
                                                ]
                                            )
                                        }}
                                    </td>
                                    <td>
                                        {{
                                            getCapacité(
                                                employee.id,
                                                selectedDate,
                                                "morning"
                                            )
                                        }}
                                    </td>
                                    <td
                                        style="cursor: pointer"
                                        @click.prevent="
                                            goToSupp(employee.id, selectedDate)
                                        "
                                    >
                                        <!-- <i class="fa-solid fa-gauge-high"></i> -->
                                        <i class="fas fa-plus-circle"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12">
                        <span>
                            <span>
                                <div class="matin-soir mb-3 d-flex">
                                    <span
                                        style="cursor: pointer"
                                        class="btn btn-info"
                                        >Soir</span
                                    >
                                </div></span
                            ></span
                        >
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            class="w-full"
                                            type="text"
                                            v-model="searchMatricule"
                                            placeholder="Matricule"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            class="w-full"
                                            type="text"
                                            v-model="searchPrenomNom"
                                            placeholder="Nom & Prenom"
                                        />
                                    </th>
                                    <th>Presence</th>
                                    <th>Etat d’absence</th>
                                    <th>Just</th>
                                    <th>Entrée</th>
                                    <th>Sortie</th>
                                    <th>Heures</th>
                                    <th>Capacité</th>
                                    <th>Hs Supp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="employee in GeneralFilter"
                                    :key="employee.id"
                                >
                                    <td>{{ employee.matricule }}</td>
                                    <td>
                                        {{ employee.nom }} {{ employee.prenom }}
                                    </td>

                                    <td>
                                        <!-- getAbsenceStatus(
                                                    employee.id,
                                                    selectedDate
                                                ) -->
                                        <select
                                            v-model="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ]
                                            "
                                            @change="updateEntréeSortie()"
                                            :style="{
                                                backgroundColor:
                                                    getBackgroundColor(
                                                        realExistance[
                                                            `${employee.id}-${selectedDate}-afternoon`
                                                        ]
                                                    ),
                                            }"
                                        >
                                            <option value="Present">
                                                Present
                                            </option>
                                            <option value="Absent">
                                                Absent
                                            </option>
                                            <option value="Absent P">
                                                Absent P
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            v-if="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ] !== 'Present'
                                            "
                                            v-model="
                                                selectedEtatAbsence[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ]
                                            "
                                        >
                                            <option value="AA">AA</option>
                                            <option value="ANA">ANA</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            v-if="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ] !== 'Present' &&
                                                selectedEtatAbsence[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ] === 'AA'
                                            "
                                            v-model="
                                                selectedJustifications[
                                                    employee.id
                                                ][selectedDate].just
                                            "
                                        >
                                            <option value="MGE">MGE</option>
                                            <option value="C">C</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </td>
                                    <td
                                        :style="{
                                            backgroundColor:
                                                getBackgroundColorTime(
                                                    realExistance[
                                                        `${employee.id}-${selectedDate}-afternoon`
                                                    ]
                                                ),
                                        }"
                                    >
                                        <input
                                            v-if="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ] !== 'Absent'
                                            "
                                            type="time"
                                            v-model="
                                                realEntrée[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ]
                                            "
                                        />
                                    </td>
                                    <td
                                        :style="{
                                            backgroundColor:
                                                getBackgroundColorTime(
                                                    realExistance[
                                                        `${employee.id}-${selectedDate}-afternoon`
                                                    ]
                                                ),
                                        }"
                                    >
                                        <input
                                            v-if="
                                                realExistance[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ] !== 'Absent'
                                            "
                                            type="time"
                                            v-model="
                                                realSortie[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ]
                                            "
                                        />
                                    </td>
                                    <td>
                                        {{
                                            calculateHoursDifference(
                                                realEntrée[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ],
                                                realSortie[
                                                    `${employee.id}-${selectedDate}-afternoon`
                                                ]
                                            )
                                        }}
                                    </td>
                                    <td>
                                        {{
                                            getCapacité(
                                                employee.id,
                                                selectedDate,
                                                "afternoon"
                                            )
                                        }}
                                    </td>
                                    <td
                                        style="cursor: pointer"
                                        @click.prevent="
                                            goToSupp(employee.id, selectedDate)
                                        "
                                    >
                                        <!-- <i class="fa-solid fa-gauge-high"></i> -->
                                        <i class="fas fa-plus-circle"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12">
                        <span
                            class="btn btn-success"
                            @click.prevent="validerPointage"
                            >Valider ce Poinatage
                            <i class="fa-solid fa-thumbs-up"></i
                        ></span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import employees from "@/Js/employees";
import absence from "@/Js/absence";
import justifications from "@/Js/justifications";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
    name: "Pointage-page",
    data() {
        const today = new Date();
        const formattedToday = today.toISOString().substr(0, 10);
        return {
            shifts: ["morning", "afternoon"],
            realEntrée: {},
            realSortie: {},
            realExistance: {},
            realJustifications: {},
            selectedJustifications: {},
            justifications,
            absence,
            selectedDate: formattedToday,
            employees,
            postes: ["Agent agricole", "Technicien", "RH", "Admin"],
            selectedPoste: "Poste",
            searchMatricule: "",
            searchPrenomNom: "",
            selectedEmployeur: "Employeur",
            employeurs: ["Best Profile", "UM6P"],
            selectedEtatAbsence: {},
            genererClicked: false,
            pointageValidated: {
                "2023-08-15": false,
                "2023-08-24": false,
                "2023-08-27": false,
                "2023-08-26": false,
                "2023-08-25": false,
                "2023-08-20": false,
                "2023-08-21": false,
                "2023-08-22": false,
                "2023-08-23": false,
                "2023-08-28": false,
                "2023-08-29": false,
                "2023-08-30": false,
                "2023-08-31": false,
                "2023-09-01": false,
                "2023-09-02": false,
                "2023-09-03": false,
                "2023-09-04": false,
                "2023-09-05": false,
            },

            realAbsence: {},
            theoriticalExistance: {},
        };
    },
    methods: {
        calculateHoursDifference(entrée, sortie) {
            if (entrée && sortie) {
                if (entrée === null || sortie === null) {
                    // console.log("entré is null or sortie is null");
                    return 0;
                } else if (entrée === "" || sortie === "") {
                    // console.log("entré is null or sortie is null");
                    return 0;
                } else {
                    // console.log("no one is null");
                    const entréeTime = new Date(`1970-01-01T${entrée}`);
                    const sortieTime = new Date(`1970-01-01T${sortie}`);
                    const timeDifference = (sortieTime - entréeTime) / 1000; // Time difference in seconds
                    const hours = Math.floor(timeDifference / 3600); // Get hours
                    const minutes = Math.floor((timeDifference % 3600) / 60); // Get minutes
                    const decimalHours = hours + minutes / 60; // Convert to decimal hours
                    return decimalHours.toFixed(2); // Return formatted decimal hours
                }
            } else {
                return 0;
            }
        },
        calculateTotalAbsenceHours(employeeId, date, shift) {
            const formattedSelectedDate = new Date(date)
                .toISOString()
                .substr(0, 10); // Format to 'yyyy-mm-dd'

            const employeeAbsence = absence.find(
                (item) => item.employeeId === employeeId
            );

            if (employeeAbsence) {
                const absenceDataForDate =
                    employeeAbsence.startDates[formattedSelectedDate];
                let startTime, endTime; // Declare startTime and endTime
                if (shift === "morning") {
                    startTime = absenceDataForDate?.morning?.start;

                    endTime =
                        employeeAbsence.endDates[formattedSelectedDate]?.morning
                            ?.end;
                } else {
                    startTime = absenceDataForDate?.afternoon?.start;
                    endTime =
                        employeeAbsence.endDates[formattedSelectedDate]
                            ?.afternoon?.end;
                }

                if (startTime && endTime) {
                    const start = new Date(`1970-01-01T${startTime}`);
                    const end = new Date(`1970-01-01T${endTime}`);
                    const totalSeconds = (end - start) / 1000;
                    const totalHours = totalSeconds / 3600;
                    return totalHours;
                }
            }

            return 0; // Default to 0 hours if data is missing
        },

        determineAbsenceStatus(totalHours, shift) {
            if (shift === "morning") {
                if (totalHours == 5) {
                    return "Absent";
                } else if (totalHours > 0 && totalHours < 5) {
                    return "Absent P";
                } else {
                    return "Present";
                }
            } else if (shift === "afternoon") {
                if (totalHours == 3) {
                    return "Absent";
                } else if (totalHours > 0 && totalHours < 3) {
                    return "Absent P";
                } else {
                    return "Present";
                }
            }
        },

        getAbsenceStatus(employeeId, selectedDate, shift) {
            const totalAbsenceHours = this.calculateTotalAbsenceHours(
                employeeId,
                selectedDate,
                shift
            );
            return this.determineAbsenceStatus(totalAbsenceHours, shift);
        },
        getBackgroundColor(existence) {
            if (existence === "Present") {
                return "#A9DFBF"; // Light green for 'Present'
            } else if (existence === "Absent") {
                return "#F1948A"; // Light red for 'Absent'
            } else if (existence === "Absent P") {
                return "#F5B7B1"; // Light pink for 'Absent P'
            }
            return ""; // Default background color
        },
        getBackgroundColorTime(existence) {
            if (existence === "Present") {
                return null; // Light green for 'Present'
            } else if (existence === "Absent") {
                return "#F1948A"; // Light red for 'Absent'
            } else if (existence === "Absent P") {
                return "#F5B7B1"; // Light pink for 'Absent P'
            }
            return ""; // Default background color
        },
        updateSelectedJustifications() {
            for (const justification of this.justifications) {
                const { employeeID, dates } = justification;
                if (!this.selectedJustifications[employeeID]) {
                    this.selectedJustifications[employeeID] = {};
                }

                for (const date in dates) {
                    const { just } = dates[date];
                    if (!this.selectedJustifications[employeeID][date]) {
                        this.selectedJustifications[employeeID][date] = {};
                    }
                    this.selectedJustifications[employeeID][date].just = just;
                }
            }
        },
        selectedJustificationForEmployee(employeeId, date) {
            const employeeJustifications =
                this.selectedJustifications[employeeId];
            if (employeeJustifications && employeeJustifications[date]) {
                return employeeJustifications[date].just || "";
            }
            return "";
        },
        setRealEntréeSortie(employeeId, selectedDate, shift) {
            // const formattedSelectedDate = new Date(date)
            //     .toISOString()
            //     .substr(0, 10);

            if (
                this.realExistance[`${employeeId}-${selectedDate}-${shift}`] !==
                "Absent"
            ) {
                const entréeTime = shift === "morning" ? "07:00" : "13:00";
                const sortieTime = shift === "morning" ? "12:00" : "16:00";

                this.$set(
                    this.realEntrée,
                    `${employeeId}-${selectedDate}-${shift}`,
                    entréeTime
                );
                this.$set(
                    this.realSortie,
                    `${employeeId}-${selectedDate}-${shift}`,
                    sortieTime
                );
            } else {
                // const entréeTime = null;
                // const sortieTime = null;

                this.$set(
                    this.realEntrée,
                    `${employeeId}-${selectedDate}-${shift}`,
                    null
                );
                this.$set(
                    this.realSortie,
                    `${employeeId}-${selectedDate}-${shift}`,
                    null
                );
            }
        },
        getCapacité(employeeId, date, shift) {
            const normalHours = shift === "morning" ? 5 : 3;
            let capacité = normalHours;
            if (
                this.theoriticalExistance[`${employeeId}-${date}-${shift}`] !==
                "Present"
            ) {
                capacité =
                    normalHours -
                    this.calculateTotalAbsenceHours(employeeId, date, shift);
            }
            return capacité;
        },
        initializeRealExistance() {
            this.employees.forEach((employee) => {
                const absenceStatusMorning = this.getAbsenceStatus(
                    employee.id,
                    this.selectedDate,
                    "morning"
                );
                this.$set(
                    this.theoriticalExistance,
                    `${employee.id}-${this.selectedDate}-morning`,
                    absenceStatusMorning
                );
                const absenceStatusAfternoon = this.getAbsenceStatus(
                    employee.id,
                    this.selectedDate,
                    "afternoon"
                );
                this.$set(
                    this.theoriticalExistance,
                    `${employee.id}-${this.selectedDate}-afternoon`,
                    absenceStatusAfternoon
                );
                const morningShiftStatus =
                    this.theoriticalExistance[
                        `${employee.id}-${this.selectedDate}-morning`
                    ];
                const afternoonShiftStatus =
                    this.theoriticalExistance[
                        `${employee.id}-${this.selectedDate}-afternoon`
                    ];

                // Determine absence state based on theoriticalExistance
                const morningState =
                    morningShiftStatus !== "Present" ? "AA" : "ANA";
                const afternoonState =
                    afternoonShiftStatus !== "Present" ? "AA" : "ANA";

                this.selectedEtatAbsence[
                    `${employee.id}-${this.selectedDate}-morning`
                ] = morningState;
                this.selectedEtatAbsence[
                    `${employee.id}-${this.selectedDate}-afternoon`
                ] = afternoonState;
                // this.selectedJustifications[
                //     `${employee.id}-${this.selectedDate}-morning-just`
                // ] = this.justifications.dates[this.selectedDate]?.just;
                // const employeeId = employee.id;
                // const selectedDate = this.selectedDate;
                // const theoriticalExistance = this.theoriticalExistance;

                // const morningPresence =
                //     theoriticalExistance[employeeId]?.[selectedDate]?.morning;
                // const afternoonPresence =
                //     theoriticalExistance[employeeId]?.[selectedDate]?.afternoon;

                // const morningJustification =
                //     justifications.find((j) => j.employeeID === employeeId)?.dates[
                //         selectedDate
                //     ]?.just || "";
                // const afternoonJustification =
                //     justifications.find((j) => j.employeeID === employeeId)?.dates[
                //         selectedDate
                //     ]?.just || "";

                // this.selectedJustifications[
                //     `${employeeId}-${selectedDate}-morning-just`
                // ] = morningPresence !== "Present" ? "AA" : morningJustification;
                // this.selectedJustifications[
                //     `${employeeId}-${selectedDate}-afternoon-just`
                // ] = afternoonPresence !== "Present" ? "AA" : afternoonJustification;
                // Call the method to populate selectedJustifications when the component is mounted
                this.updateSelectedJustifications();
                // another function
                // for (const shift in this.shifts) {
                // if (
                //     this.realExistance[
                //         `${employee.id}-${this.selectedDate}-${"morning"}`
                //     ] !== "Absent"
                // ) {
                //     //     const entréeTime = shift === "morning" ? "07:00" : "13:00";
                //     //     const sortieTime = shift === "morning" ? "12:00" : "16:00";
                //     const sortieTime = "12:00";
                //     const entréeTime = "07:00";

                //     this.$set(
                //         this.realEntrée,
                //         `${employee.id}-${this.selectedDate}-${"morning"}`,
                //         entréeTime
                //     );
                //     this.$set(
                //         this.realSortie,
                //         `${employee.id}-${this.selectedDate}-${"morning"}`,
                //         sortieTime
                //     );
                //     console.log("voila real sortie");
                //     console.log(this.realAbsence);
                //     // window.alert("k");
                //     // }
                // }
                // something else now , a test
            });

            this.realExistance = this.theoriticalExistance;
            // console.log(
            //     "now we are comparing real and theoritical existance",
            //     this.realExistance === this.theoriticalExistance
            // );
            this.updateEntréeSortie();
            this.genererClicked = true;
        },
        updateEntréeSortie() {
            this.employees.forEach((employee) => {
                this.setRealEntréeSortie(
                    employee.id,
                    this.selectedDate,
                    "morning"
                );
                this.setRealEntréeSortie(
                    employee.id,
                    this.selectedDate,
                    "afternoon"
                );
            });
        },
        // areObjectsEqual(obj1, obj2) {
        //     return JSON.stringify(obj1) === JSON.stringify(obj2);
        // },
        downloadPDF() {
            const doc = new jsPDF();
            doc.autoTable({ html: "lol" }); // Replace 'your-table-id' with the actual ID of your table element
            doc.save("table-data.pdf");
        },
        validerPointage() {
            //here we should make some backend things to store the data of the selectedDate
            //case we clicked on generere
            if (this.genererClicked === true) {
                this.pointageValidated[this.selectedDate] = true;
                Swal.fire({
                    icon: "success",
                    title: "Succès",
                    text: `Pointage est bien validé pour le jour ${this.selectedDate}`,
                    confirmButtonText: "OK",
                });
                this.pointageValidate = true;
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Attention",
                    text: "Vous devez générer l'attendance avant de valider",
                    confirmButtonText: "OK",
                });
            }
        },
        goToSupp(employeeId, selectedDate) {
            this.$router.push({
                name: "pointage-supp",
                params: {
                    id: employeeId,
                    mydate: selectedDate,
                },
            });
        },
    },
    computed: {
        selectedEtatAbsenceComputed() {
            return (employeeId, selectedDate, shift) => {
                const theoriticalExistanceKey = `${employeeId}-${selectedDate}-${shift}`;
                const theoriticalExistanceValue =
                    this.theoriticalExistance[theoriticalExistanceKey];
                return theoriticalExistanceValue !== "Present" ? "AA" : "";
            };
        },
        postesFilter() {
            if (this.selectedPoste === "Poste") {
                return employees;
            } else {
                return this.employees.filter((employee) => {
                    return employee.poste === this.selectedPoste;
                });
            }
        },
        employeurFilter() {
            if (this.selectedEmployeur === "Employeur") {
                return employees;
            } else {
                return this.employees.filter((employee) => {
                    return employee.employeur === this.selectedEmployeur;
                });
            }
        },
        GeneralFilter() {
            const postesFiltered = this.postesFilter; // Invoke the method
            const employeurFiltered = this.employeurFilter; // Invoke the method
            const matriculeFiltered = this.matriculeFilter;
            const prenomNomFiltered = this.prenomNomFilter;
            const result = postesFiltered.filter((employee) => {
                return (
                    employeurFiltered.includes(employee) &&
                    matriculeFiltered.includes(employee) &&
                    prenomNomFiltered.includes(employee)
                );
            });
            return result;
        },
        matriculeFilter() {
            if (this.searchMatricule === "") {
                return employees;
            } else {
                const regex = new RegExp(this.searchMatricule, "i", "g");
                console.log(regex);
                const result = this.employees.filter((employee) => {
                    return regex.test(employee.matricule);
                });
                return result;
            }
        },
        prenomNomFilter() {
            if (this.searchPrenomNom === "") {
                return employees;
            } else {
                const regex = new RegExp(this.searchPrenomNom, "i", "g");
                console.log(regex);
                const result = this.employees.filter((employee) => {
                    return (
                        regex.test(employee.prenom) || regex.test(employee.nom)
                    );
                });
                return result;
            }
        },
    },

    mounted() {
        console.log(this.realEntrée[`1-${this.selectedDate}-morning`]);
    },
    // watch: {
    //     realExistance: {
    //         deep: true,
    //         handler(newRealExistance) {
    //             if (
    //                 !this.areObjectsEqual(
    //                     newRealExistance,
    //                     this.theoriticalExistance
    //                 )
    //             ) {
    //                 this.updateEntréeSortie();
    //             }
    //         },
    //     },
    // },
};
</script>
<style lang="scss">
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#pointage {
    .validation-message {
        margin-left: 20px;
        display: flex;
        align-items: center;
    }

    .success-message {
        color: green;
        font-weight: bold;
    }

    // .warning-message {
    //     color: red;
    //     font-weight: bold;
    // }
    // .matin-soir {
    // }
    .head {
        select {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 3px;
            margin: 0;

            &:focus {
                border: 1px solid #007bff;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                outline: none;
            }
        }
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }

        input {
            // this is for the date
            width: 100%;
            padding: 10px;
            // margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
        i.fa-caret-down {
            position: absolute;
            top: 50%;
            right: 30px;
            transform: translateY(-50%);
        }
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
                    border: none;
                    cursor: pointer;
                    // box-shadow: 0px 1px 0px 0px rgb(41 41 41 / 50%);
                    // .present-bg {
                    //     background-color: white; /* or any color for 'Present' */
                    // }
                    // .absent-bg {
                    //     background-color: red; /* or any color for 'Absent' */
                    // }
                    // .absent-p-bg {
                    //     background-color: pink; /* or any color for 'Absent P' */
                    // }
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
