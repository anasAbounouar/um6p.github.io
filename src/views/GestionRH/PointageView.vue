<template>
    <div>
        <SideBarView /> <NavBarView />
        <section id="pointage">
            <div class="container head">
                <div class="row">
                    <div class="col-12">
                        <h4>Gérer la présence du personnel</h4>
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
                        <span>Morning Shift</span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Matricule</th>
                                    <th>Nom & Prenom</th>
                                    <th>Presence</th>
                                    <th>Etat d’absence</th>
                                    <th>Just</th>
                                    <th>Entrée</th>
                                    <th>Sortie</th>
                                    <th>Heures</th>
                                    <th>Capacité</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="employee in employees"
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
                                                    `${employee.id}-${selectedDate}-morning`
                                                ]
                                            "
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
                                    <td>
                                        <input
                                            v-show="
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
                                    <td>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12">
                        <span>Afternoon shift</span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Matricule</th>
                                    <th>Nom & Prenom</th>
                                    <th>Presence</th>
                                    <th>Etat d’absence</th>
                                    <th>Just</th>
                                    <th>Entrée</th>
                                    <th>Sortie</th>
                                    <th>Heures</th>
                                    <th>Capacité</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="employee in employees"
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
                                    <td>
                                        <input
                                            v-show="
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
                                    <td>
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
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
import employees from "@/Js/employees";
import absence from "@/Js/absence";
import justifications from "@/Js/justifications";
export default {
    name: "Pointage-page",
    components: {
        SideBarView,
        NavBarView,
    },
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
            selectedEmployeur: "Employeur",
            employeurs: ["Best Profile", "UM6P"],
            selectedEtatAbsence: {},
            just: "MGE",
            entréeMatin: "07:00",
            sortieMatin: "12:00",
            realAbsence: {},
            theoriticalExistance: {},
        };
    },
    methods: {
        calculateHoursDifference(entrée, sortie) {
            const entréeTime = new Date(`1970-01-01T${entrée}`);
            const sortieTime = new Date(`1970-01-01T${sortie}`);
            const timeDifference = (sortieTime - entréeTime) / 1000; // Time difference in seconds
            const hours = Math.floor(timeDifference / 3600); // Get hours
            const minutes = Math.floor((timeDifference % 3600) / 60); // Get minutes
            const decimalHours = hours + minutes / 60; // Convert to decimal hours
            return decimalHours.toFixed(2); // Return formatted decimal hours
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
                    employeeAbsence.starDates[formattedSelectedDate];
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
                    console.log(this.selectedJustifications[employeeID][date]);
                }
            }
        },
        selectedJustificationForEmployee(employeeId, date) {
            console.log(employeeId);
            console.log();
            const employeeJustifications =
                this.selectedJustifications[employeeId];
            if (employeeJustifications && employeeJustifications[date]) {
                return employeeJustifications[date].just || "";
            }
            return "";
        },
        setRealEntréeSortie(employeeId, date, shift) {
            const formattedSelectedDate = new Date(date)
                .toISOString()
                .substr(0, 10);

            if (
                this.realExistance[
                    `${employeeId}-${formattedSelectedDate}-shift`
                ] !== "Absent"
            ) {
                const entréeTime = shift === "morning" ? "07:00" : "13:00";
                const sortieTime = shift === "morning" ? "12:00" : "16:00";

                this.$set(
                    this.realEntrée,
                    `${employeeId}-${formattedSelectedDate}-${shift}`,
                    entréeTime
                );
                this.$set(
                    this.realSortie,
                    `${employeeId}-${formattedSelectedDate}-${shift}`,
                    sortieTime
                );
            }
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
    },

    mounted() {
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
                morningShiftStatus !== "Present"
                    ? "AA"
                    : employee.selectedEtatAbsence || "ANA";
            // actually employee.selected .. has no meaning , but "ANA "yes . it meany if i change .
            // the presence of someone from present to another thing , bye default it ana
            const afternoonState =
                afternoonShiftStatus !== "Present"
                    ? "AA"
                    : employee.selectedEtatAbsence || "ANA";

            this.selectedEtatAbsence[
                `${employee.id}-${this.selectedDate}-morning`
            ] = morningState;
            this.selectedEtatAbsence[
                `${employee.id}-${this.selectedDate}-afternoon`
            ] = afternoonState;
            this.realExistance = this.theoriticalExistance;
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
            this.setRealEntréeSortie(employee.id, this.selectedDate, "morning");
            this.setRealEntréeSortie(
                employee.id,
                this.selectedDate,
                "afternoon"
            );
        });
    },
    // created() {
    //     this.setRealEntréeSortie();
    // },
};
</script>
<style lang="scss">
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#pointage {
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
            // thead.title {
            //     th {
            //         height: 80px;
            //         span {
            //             height: 40px;
            //             width: 40px;
            //         }
            //     }
            // }
        }
    }
}
</style>
