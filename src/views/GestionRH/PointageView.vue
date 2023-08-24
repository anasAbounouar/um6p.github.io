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
                                                theoriticalExistance[
                                                    `${employee.id}-${selectedDate}`
                                                ]
                                            "
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
                                        <!-- <select
                                            v-model="employee.theoriticalExistance"
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
                                        </select> -->
                                    </td>
                                    <td>
                                        <select
                                            v-if="
                                                employee.theoriticalExistance !==
                                                'Present'
                                            "
                                            v-model="
                                                employee.selectedEtatAbsence
                                            "
                                        >
                                            <option value="AA">AA</option>
                                            <option value="ANA">ANA</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            v-if="
                                                employee.theoriticalExistance !==
                                                    'Present' &&
                                                employee.selectedEtatAbsence ===
                                                    'AA'
                                            "
                                            v-model="employee.just"
                                        >
                                            <option value="MGE">MGE</option>
                                            <option value="C">C</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            v-show="
                                                employee.theoriticalExistance !==
                                                'Absent'
                                            "
                                            type="time"
                                            v-model="entréeMatin"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            v-if="
                                                employee.theoriticalExistance !==
                                                'Absent'
                                            "
                                            type="time"
                                            v-model="sortieMatin"
                                        />
                                    </td>
                                    <td>
                                        {{
                                            calculateHoursDifference(
                                                employee.entréeMatin,
                                                employee.sortieMatin
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
            absence,
            selectedDate: formattedToday,
            employees,
            postes: ["Agent agricole", "Technicien", "RH", "Admin"],
            selectedPoste: "Poste",
            selectedEmployeur: "Employeur",
            employeurs: ["Best Profile", "UM6P"],
            selectedEtatAbsence: "AA",
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
        calculateTotalAbsenceHours(employeeId, date) {
            const formattedSelectedDate = new Date(date)
                .toISOString()
                .substr(0, 10); // Format to 'yyyy-mm-dd'

            const employeeAbsence = absence.find(
                (item) => item.employeeId === employeeId
            );

            if (employeeAbsence) {
                const absenceDataForDate =
                    employeeAbsence.starDates[formattedSelectedDate];
                const startTime = absenceDataForDate?.morning?.start;
                console.log(startTime);
                const endTime =
                    employeeAbsence.endDates[formattedSelectedDate]?.morning
                        ?.end;
                console.log(employeeAbsence.endDates);
                // console.log(endTime);

                if (startTime && endTime) {
                    const start = new Date(`1970-01-01T${startTime}`);
                    const end = new Date(`1970-01-01T${endTime}`);
                    const totalSeconds = (end - start) / 1000;
                    const totalHours = totalSeconds / 3600;
                    console.log("Total hours is ", totalHours);

                    return totalHours;
                }
            }

            return 0; // Default to 0 hours if data is missing
        },

        determineAbsenceStatus(totalHours) {
            if (totalHours >= 5) {
                return "Absent";
            } else if (totalHours > 0 && totalHours < 5) {
                return "Absent P";
            } else {
                return "Present";
            }
        },

        getAbsenceStatus(employeeId, selectedDate) {
            const totalAbsenceHours = this.calculateTotalAbsenceHours(
                employeeId,
                selectedDate
            );
            return this.determineAbsenceStatus(totalAbsenceHours);
        },
        // updateAbsenceStatus(employeeId, date) {
        //     const formattedSelectedDate = new Date(date)
        //         .toISOString()
        //         .substr(0, 10);

        //     const employeeAbsence = absence.find(
        //         (item) => item.employeeId === employeeId
        //     );

        //     if (employeeAbsence) {
        //         const realAbsenceData = {
        //             employeeId: employeeId,
        //             starDates: { ...employeeAbsence.starDates },
        //             endDates: { ...employeeAbsence.endDates },
        //         };

        //         // Modify the realAbsenceData based on the theoriticalExistance value
        //         const theoriticalExistanceValue =
        //             this.theoriticalExistance[
        //                 `${employeeId}-${formattedSelectedDate}`
        //             ];
        //         if (theoriticalExistanceValue === "Present") {
        //             delete realAbsenceData.starDates[formattedSelectedDate];
        //             delete realAbsenceData.endDates[formattedSelectedDate];
        //         } else {
        //             realAbsenceData.starDates[formattedSelectedDate] = {
        //                 morning: { start: "07:00" },
        //                 afternoon: { start: "13:00" },
        //             };
        //             realAbsenceData.endDates[formattedSelectedDate] = {
        //                 morning: { end: "12:00" },
        //                 afternoon: { end: "16:00" },
        //             };
        //         }

        //         // Update the realAbsence object
        //         this.realAbsence[employeeId] = realAbsenceData;
        //     }
        // },
    },
    mounted() {
        this.employees.forEach((employee) => {
            const absenceStatus = this.getAbsenceStatus(
                employee.id,
                this.selectedDate
            );
            this.$set(
                this.theoriticalExistance,
                `${employee.id}-${this.selectedDate}`,
                absenceStatus
            );
        });
    },
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
                    box-shadow: 0px 1px 0px 0px rgb(41 41 41 / 50%);
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
