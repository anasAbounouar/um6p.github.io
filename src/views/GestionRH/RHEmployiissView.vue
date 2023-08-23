<template>
    <div>
        <SideBarView />
        <NavBarView />
        <section id="employees">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div
                            class="activity-filter d-flex align-items-center justify-content-around"
                        >
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="all"
                                    checked
                                />
                                Tout
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                />
                                Actif
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                />
                                Inactif
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1>Gestion d'Absences</h1>
                <form class="absence-form">
                    <label for="start-date">Date de début :</label>
                    <input type="date" v-model="startDate" required />

                    <label for="end-date">Date de fin :</label>
                    <input type="date" v-model="endDate" required />
                    <label for="resume-day">Reprise le :</label>
                    <input
                        type="date"
                        id="resume-day"
                        v-model="resumeDay"
                        required
                    />
                    <button
                        @click.prevent="showDates = !showDates"
                        class="btn-details"
                    >
                        {{ showDates ? "Masquer details" : "Montrer details" }}
                    </button>

                    <div v-if="showDates">
                        <div
                            v-for="date in selectedDates"
                            :key="date"
                            class="date-section"
                        >
                            <p>le {{ formatDate(date) }}</p>
                            <div
                                class="d-flex justify-content-between shift-container"
                            >
                                <div class="shift-container">
                                    <!-- Morning Shift -->
                                    <div class="shift">
                                        <div class="time-input">
                                            <label
                                                :for="
                                                    'start-time-morning-' + date
                                                "
                                            >
                                                Matin :
                                            </label>
                                            <input
                                                type="time"
                                                :id="
                                                    'start-time-morning-' + date
                                                "
                                                v-model="
                                                    startTimes[date]['morning']
                                                        .start
                                                "
                                                @input="
                                                    setStartTime(
                                                        date,
                                                        'morning',
                                                        $event.target.value
                                                    )
                                                "
                                                required
                                            />
                                            <input
                                                type="time"
                                                :id="'end-time-morning-' + date"
                                                v-model="
                                                    endTimes[date]['morning']
                                                        .end
                                                "
                                                @input="
                                                    setEndTime(
                                                        date,
                                                        'morning',
                                                        $event.target.value
                                                    )
                                                "
                                                required
                                            />
                                        </div>
                                    </div>
                                    <!-- Afternoon Shift -->
                                    <div class="shift">
                                        <div class="time-input">
                                            <label
                                                :for="
                                                    'start-time-afternoon-' +
                                                    date
                                                "
                                            >
                                                Soir :
                                            </label>
                                            <input
                                                type="time"
                                                :id="
                                                    'start-time-aftenoon-' +
                                                    date
                                                "
                                                v-model="
                                                    startTimes[date][
                                                        'afternoon'
                                                    ].start
                                                "
                                                @input="
                                                    setStartTime(
                                                        date,
                                                        'afternoon',
                                                        $event.target.value
                                                    )
                                                "
                                                required
                                            />
                                            <input
                                                type="time"
                                                :id="
                                                    'end-time-aftenoon-' + date
                                                "
                                                v-model="
                                                    endTimes[date]['afternoon']
                                                        .end
                                                "
                                                @input="
                                                    setEndTime(
                                                        date,
                                                        'afternoon',
                                                        $event.target.value
                                                    )
                                                "
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit">Enregistrer l'absence</button>
                    <button
                        @click.prevent="calculateTotalHours"
                        class="btn-calculation"
                    >
                        Calculer les heures d'absences
                    </button>
                    <div class="total-duration">
                        Total Hours of Absence: {{ totalHours }}
                        <!-- im calling setDefaultTimes just to work  -->
                        {{ setDefaultTimes() }}
                    </div>
                </form>
            </div>
            <div>
                <label for="beneficiarySelect"
                    >Choisissez un bénéficiaire</label
                >
                <input
                    id="beneficiarySelect"
                    v-model="possibleBeneficiary"
                    placeholder="Tapez son Prénom & nom"
                />
                <form>
                    <select v-model="selectedBeneficiary" name="beneficiaire">
                        <option value="" disabled selected hidden>
                            Selectez
                        </option>
                        <option
                            v-for="name in filteredBeneficiaries"
                            :key="name.id"
                            :value="name"
                        >
                            {{ name.firstName }} {{ name.lastName }}
                        </option>
                    </select>
                </form>
            </div>
            <div class="planification">
                <div class="mb-3">
                    <label for="yearSelect">Choisissez une année</label>
                    <select id="yearSelect" v-model="selectedYear">
                        <option
                            v-for="year in [2023, 2024, 2025]"
                            :key="year"
                            :value="year"
                        >
                            {{ year }}
                        </option>
                    </select>

                    <label for="monthSelect">Choisissez un mois</label>
                    <select id="monthSelect" v-model="selectedMonth">
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
                <button @click="openDialog" class="my-3 d-flex ajouter-repos">
                    Ajouter un repos
                </button>
                <button
                    @click="openDialogFerie"
                    class="my-3 d-flex ajouter-ferie"
                >
                    Ajouter un jour ferié
                </button>

                <b-modal
                    v-if="dialogVisible"
                    title="Ajouter un repos"
                    class="custom-modal"
                >
                    <form @submit.prevent="addRepos" class="modal-form">
                        <div class="form-group">
                            <label for="employeeSearch"
                                >Sélectionnez un employé :</label
                            >
                            <input
                                type="text"
                                id="employeeSearch"
                                v-model="searchText"
                                @input="filterEmployees"
                                class="form-control"
                                placeholder="Rechercher un employé"
                            />
                        </div>

                        <div class="form-group">
                            <label for="selectedEmployee"
                                >Employé sélectionné :</label
                            >
                            <select
                                v-model="selectedEmployee"
                                id="selectedEmployee"
                                class="form-control"
                            >
                                <option value="" disabled selected hidden>
                                    Sélectionnez un employé
                                </option>
                                <option
                                    v-for="employee in filteredEmployees"
                                    :key="employee.id"
                                    :value="employee"
                                >
                                    {{ employee.prenom }} {{ employee.nom }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="startReposDate"
                                >Date de début du repos :</label
                            >
                            <input
                                type="date"
                                v-model="startReposDate"
                                class="form-control"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label for="endReposDate"
                                >Date de fin du repos :</label
                            >
                            <input
                                type="date"
                                v-model="endReposDate"
                                class="form-control"
                                required
                            />
                        </div>

                        <div class="buttons">
                            <button type="submit" class="btn btn-primary">
                                Enregistrer Repos
                            </button>
                            <button
                                type="button"
                                @click.prevent="dialogVisible = !dialogVisible"
                                class="btn btn-secondary"
                            >
                                Annuler Repos
                            </button>
                        </div>
                    </form>
                </b-modal>
                <b-modal
                    v-if="dialogVisibleFerie"
                    title="Ajouter un jour ferié"
                    class="custom-modal"
                >
                    <form @submit.prevent="addjourferie" class="modal-form">
                        <div class="form-group">
                            <label for="startJourFerieDate"
                                >Date de début du repos :</label
                            >
                            <input
                                type="date"
                                v-model="startJourFerieDate"
                                class="form-control"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label for="endJourFerieDate"
                                >Date de fin du repos :</label
                            >
                            <input
                                type="date"
                                v-model="endJourFerieDate"
                                class="form-control"
                                required
                            />
                        </div>

                        <div class="buttons">
                            <button type="submit" class="btn btn-primary">
                                Enregistrer Jour ferié
                            </button>
                            <button
                                type="button"
                                @click.prevent="
                                    dialogVisibleFerie = !dialogVisibleFerie
                                "
                                class="btn btn-secondary"
                            >
                                Annuler Jour ferié
                            </button>
                        </div>
                    </form>
                </b-modal>
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2">Name</th>
                            <th :colspan="daysInMonth">
                                {{ months[currentDate.getMonth()] }}
                            </th>
                            <!-- Added colspan for the month header -->
                        </tr>
                        <tr>
                            <!-- <th>Name</th> -->
                            <th v-for="day in daysInMonth" :key="day">
                                {{
                                    getNumber(
                                        new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            day
                                        )
                                    )
                                }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in employees" :key="employee.id">
                            <td>{{ employee.nom }} {{ employee.prenom }}</td>
                            <td
                                v-for="day in daysInMonth"
                                :key="day"
                                class="day-cell"
                                :class="{
                                    'holiday-cell': isHoliday(
                                        employee.id,
                                        getDateString(
                                            selectedYear,
                                            selectedMonth,
                                            day
                                        )
                                    ),
                                    'repos-cell': isRepos(
                                        employee.id,
                                        getDateString(
                                            selectedYear,
                                            selectedMonth,
                                            day
                                        )
                                    ),
                                    'public-holiday-cell': isPublicHoliday(
                                        getDateString(
                                            selectedYear,
                                            selectedMonth,
                                            day
                                        )
                                    ),
                                    'sunday-cell': isSunday(
                                        getDateString(
                                            selectedYear,
                                            selectedMonth,
                                            day
                                        )
                                    ),
                                }"
                                @click="
                                    handleHolidayCellClick(
                                        employee.id,
                                        selectedYear,
                                        selectedMonth,
                                        day,
                                        isHoliday(
                                            employee.id,
                                            getDateString(
                                                selectedYear,
                                                selectedMonth,
                                                day
                                            )
                                        ),
                                        isPublicHoliday(
                                            getDateString(
                                                selectedYear,
                                                selectedMonth,
                                                day
                                            )
                                        ),
                                        isRepos(
                                            employee.id,
                                            getDateString(
                                                selectedYear,
                                                selectedMonth,
                                                day
                                            )
                                        )
                                    )
                                "
                            ></td>
                        </tr>
                    </tbody>
                </table>
                <div
                    class="legend d-flex align-items-center justify-content-around"
                >
                    <p><span class="color-box holiday-color"></span> Congé</p>
                    <p><span class="color-box repos-color"></span> Repos</p>
                    <p>
                        <span class="color-box public-holiday-color"></span>
                        Jour férié
                    </p>
                    <p><span class="color-box sunday-color"></span> Dimanche</p>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
// import { BTooltip } from "bootstrap-vue"; // Import BTooltip from Bootstrap Vue
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
import employees from "@/Js/employees";
// import { VSelect } from "vuetify/lib"; // Import VSelect component from Vuetify
import Swal from "sweetalert2";

// import Vue from "vue";
export default {
    name: "RH-employiis-page",
    components: {
        SideBarView,
        NavBarView,
        // VSelect, // Register the VSelect component
    },

    data() {
        return {
            employees,
            startDate: "",
            endDate: "",
            startTimes: {},
            endTimes: {},
            defaultStartMorning: "07:00",
            defaultEndMorning: "12:00",
            defaultStartAfternoon: "13:00",
            defaultEndAfternoon: "16:00",
            showDates: false,
            totalHours: 0,
            shifts: ["morning", "afternoon"],
            resumeDay: "",
            possibleBeneficiary: null,
            selectedBeneficiary: "",
            beneficiaryList: [
                {
                    id: 1,
                    firstName: "John",
                    lastName: "Doe",
                    age: 28,
                    gender: "Male",
                    country: "USA",
                },
                {
                    id: 2,
                    firstName: "Jane",
                    lastName: "Smith",
                    age: 34,
                    gender: "Female",
                    country: "Canada",
                },
                {
                    id: 3,
                    firstName: "Michael",
                    lastName: "Johnson",
                    age: 42,
                    gender: "Male",
                    country: "UK",
                },
                {
                    id: 4,
                    firstName: "Emily",
                    lastName: "Williams",
                    age: 29,
                    gender: "Female",
                    country: "Australia",
                },
                {
                    id: 5,
                    firstName: "David",
                    lastName: "Brown",
                    age: 31,
                    gender: "Male",
                    country: "USA",
                },
                // ... other beneficiary objects
            ],
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
            holidays: [
                {
                    employeeId: 1,
                    startDate: "2023-08-05",
                    endDate: "2023-08-16",
                }, // Example holiday data (employeeId and date range)
                {
                    employeeId: 3,
                    startDate: "2023-08-10",
                    endDate: "2023-08-12",
                },
                // Add more holiday data as needed
            ],
            reposDays: [
                {
                    employeeId: 1,
                    startDate: "2023-08-29",
                    endDate: "2023-08-29",
                },
                {
                    employeeId: 2,
                    startDate: "2023-08-22",
                    endDate: "2023-08-24",
                },
                // Add more repos days data as needed
            ],
            publicHolidays: [
                {
                    startDate: "2023-08-31",
                    endDate: "2023-08-31",
                    name: "New Year's Day",
                },
                // Add more public holidays as needed
            ],
            selectedYear: "2023",
            selectedMonth: 8,
            dialogVisible: false,
            dialogVisibleFerie: false,
            selectedEmployee: null,
            startReposDate: "",
            startJourFerieDate: "",
            endJourFerieDate: "",
            endReposDate: "",
            searchText: "", // Initialize search text
        };
    },
    computed: {
        selectedDates() {
            const dates = [];
            let currentDate = new Date(this.startDate);
            while (currentDate <= new Date(this.endDate)) {
                dates.push(currentDate.toISOString().split("T")[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
        },
        filteredBeneficiaries() {
            const filterText = this.possibleBeneficiary
                ? this.possibleBeneficiary.toLowerCase()
                : "";

            return this.beneficiaryList.filter(
                (name) =>
                    name.firstName.toLowerCase().includes(filterText) ||
                    name.lastName.toLowerCase().includes(filterText)
            );
        },
        daysInMonth() {
            // Calculate the total number of days in the current month
            const year = this.selectedYear;
            const month = this.selectedMonth; // Months are zero-based, so add 1
            // Check if currentDate is a valid date object
            if (isNaN(year) || isNaN(month)) {
                return 0; // Return 0 if currentDate is invalid
            }
            return new Date(year, month, 0).getDate();
        },
        filteredEmployees() {
            const filterText = this.searchText.toLowerCase();
            return this.employees.filter(
                (employee) =>
                    employee.prenom.toLowerCase().includes(filterText) ||
                    employee.nom.toLowerCase().includes(filterText)
            );
        },
        prenomNom() {
            return `${this.prenom} ${this.nom}`;
        },
    },
    created() {
        // Set default start and end times when the component is created
        this.setDefaultTimes();
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("fr-CA");
        },
        setDefaultTimes() {
            if (
                Object.keys(this.startTimes).length === 0 &&
                Object.keys(this.endTimes).length === 0
            ) {
                // Loop through selected dates and set default absence times
                for (const date of this.selectedDates) {
                    // Set default values for morning shift
                    this.startTimes[date] = {
                        morning: { start: this.defaultStartMorning },
                        afternoon: { start: this.defaultStartAfternoon },
                    };

                    // Set default values for afternoon shift
                    this.endTimes[date] = {
                        morning: { end: this.defaultEndMorning },
                        afternoon: { end: this.defaultEndAfternoon },
                    };
                }
            }
        },
        setStartTime(date, shift, value) {
            this.startTimes[date][shift].start = value;
        },
        setEndTime(date, shift, value) {
            this.endTimes[date][shift].end = value;
        },
        getStartTime(date, shift) {
            if (this.startTimes[date] && this.startTimes[date][shift]) {
                return this.startTimes[date][shift].start;
            }
            return null;
        },
        getEndTime(date, shift) {
            if (this.endTimes[date] && this.endTimes[date][shift]) {
                return this.endTimes[date][shift].end;
            }
            return null;
        },
        calculateTotalHours() {
            this.totalHours = 0;
            for (const date of this.selectedDates) {
                console.log(this.startTimes[date]["morning"].start);
                for (const shift of this.shifts) {
                    const startTime = this.startTimes[date][shift].start;
                    const endTime = this.endTimes[date][shift].end;

                    const startTimeObj = new Date(`${date}T${startTime}`);
                    const endTimeObj = new Date(`${date}T${endTime}`);

                    const timeDifference =
                        endTimeObj.getTime() - startTimeObj.getTime();
                    const hoursDifference = timeDifference / 3600000;

                    this.totalHours += hoursDifference;
                }
            }

            return this.totalHours;
        },
        filterBeneficiaries() {
            // Reset selected beneficiary when user is typing
            this.selectedBeneficiary = null;
        },
        getNumber(day) {
            const dayOfMonth = day.getDate();
            return dayOfMonth;
        },
        isHoliday(employeeId, date) {
            return this.holidays.some((holiday) => {
                const startDate = new Date(holiday.startDate);
                const endDate = new Date(holiday.endDate);
                const currentDate = new Date(date);
                return (
                    holiday.employeeId === employeeId &&
                    currentDate >= startDate &&
                    currentDate <= endDate
                );
            });
        },
        isDateInRange(currentDate, startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            return currentDate >= start && currentDate <= end;
        },
        isRepos(employeeId, date) {
            return this.reposDays.some((repos) => {
                const startDate = new Date(repos.startDate);
                const endDate = new Date(repos.endDate);
                const currentDate = new Date(date);
                return (
                    repos.employeeId === employeeId &&
                    currentDate >= startDate &&
                    currentDate <= endDate
                );
            });
        },
        getDateString(year, month, day) {
            const monthStr = month < 10 ? `0${month}` : `${month}`;
            const dayStr = day < 10 ? `0${day}` : `${day}`;
            return `${year}-${monthStr}-${dayStr}`;
        },
        isPublicHoliday(date) {
            return this.publicHolidays.some((pHoliday) =>
                this.isDateInRange(
                    new Date(date),
                    pHoliday.startDate,
                    pHoliday.endDate
                )
            );
        },
        isSunday(date) {
            return new Date(date).getDay() === 0; // 0 corresponds to Sunday
        },
        openDialog() {
            // Open the dialog when the button is clicked
            this.dialogVisible = true;
        },
        openDialogFerie() {
            // Open the dialog when the button is clicked
            this.dialogVisibleFerie = true;
        },
        addRepos() {
            if (this.selectedEmployee !== "") {
                const newRepos = {
                    employeeId: this.selectedEmployee.id,
                    startDate: this.startReposDate,
                    endDate: this.endReposDate,
                };
                // Push the new repos object into the reposDays array
                this.reposDays.push(newRepos);

                // Clear the form fields
                this.selectedEmployee = "";
                this.startReposDate = "";
                this.endReposDate = "";

                // Close the dialog
                this.dialogVisible = false;
            }
        },
        addjourferie() {
            const newJourFerie = {
                startDate: this.startJourFerieDate,
                endDate: this.endJourFerieDate,
            };
            // Push the new repos object into the reposDays array
            this.publicHolidays.push(newJourFerie);

            // Clear the form fields
            this.startJourFerieDate = "";
            this.endJourFerieDate = "";

            // Close the dialog
            this.dialogVisibleFerie = false;
        },
        // Method to show SweetAlert pop-up for modifying or canceling a "repos" entry
        handleHolidayCellClick(
            employeeId,
            year,
            month,
            day,
            holiday,
            publicHoliday,
            repos
        ) {
            if (holiday === true) {
                // Find the index of the holiday in the holidays array based on employeeId and date
                const holidayIndex = this.holidays.findIndex(
                    (holiday) =>
                        holiday.employeeId === employeeId &&
                        new Date(holiday.startDate) <=
                            new Date(this.getDateString(year, month, day)) &&
                        new Date(this.getDateString(year, month, day)) <=
                            new Date(holiday.endDate)
                );

                // Handle updating start and end dates if a holiday is clicked
                if (holidayIndex !== -1) {
                    Swal.fire({
                        title: `Modifier les dates du congé de la personne`,
                        html: `
                    <div class="d-flex flex-d-c">
                        <label for="startDate">Nouvelle date de début:</label>
                        <input type="date" id="startDate" class="swal2-input" value="${this.holidays[holidayIndex].startDate}" required>
                    <div/>   
                    <div class="d-flex flex-d-c mt-2">           
                        <label for="endDate">Nouvelle date de fin:</label>
                        <input type="date" id="endDate" class="swal2-input" value="${this.holidays[holidayIndex].endDate}" required>
                    <div/> 
            `,
                        showCancelButton: true,
                        confirmButtonText: "Enregistrer",
                        cancelButtonText: "Annuler",
                        customClass: {
                            popup: "custom-swal-popup",
                            title: "custom-swal-title",
                            input: "custom-swal-input",
                            confirmButton: "swal2-confirm",
                            cancelButton: "swal2-cancel",
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const newStartDate =
                                document.getElementById("startDate").value;
                            const newEndDate =
                                document.getElementById("endDate").value;

                            // Update the holidays array with new start and end dates
                            this.holidays[holidayIndex].startDate =
                                newStartDate;
                            this.holidays[holidayIndex].endDate = newEndDate;

                            // Perform any additional logic here, such as updating the server or UI
                        }
                    });
                }
            } else if (publicHoliday === true) {
                const publicHolidayIndex = this.publicHolidays.findIndex(
                    (publicHoliday) =>
                        new Date(publicHoliday.startDate) <=
                            new Date(this.getDateString(year, month, day)) &&
                        new Date(this.getDateString(year, month, day)) <=
                            new Date(publicHoliday.endDate)
                );

                // Handle updating start and end dates if a holiday is clicked
                if (publicHolidayIndex !== -1) {
                    console.log(publicHolidayIndex);
                    Swal.fire({
                        title: `Modifier les dates du jour férié`,
                        html: `
                    <div class="d-flex flex-d-c">
                        <label for="startDate">Nouvelle date de début:</label>
                        <input type="date" id="startDate" class="swal2-input" value="${this.publicHolidays[publicHolidayIndex].startDate}" required>
                    <div/>   
                    <div class="d-flex flex-d-c mt-2">           
                        <label for="endDate">Nouvelle date de fin:</label>
                        <input type="date" id="endDate" class="swal2-input" value="${this.publicHolidays[publicHolidayIndex].endDate}" required>
                    <div/> 
            `,
                        showCancelButton: true,
                        confirmButtonText: "Enregistrer",
                        cancelButtonText: "Annuler",
                        customClass: {
                            popup: "custom-swal-popup",
                            title: "custom-swal-title",
                            input: "custom-swal-input",
                            confirmButton: "swal2-confirm",
                            cancelButton: "swal2-cancel",
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const newStartDate =
                                document.getElementById("startDate").value;
                            const newEndDate =
                                document.getElementById("endDate").value;

                            // Update the holidays array with new start and end dates
                            this.publicHolidays[publicHolidayIndex].startDate =
                                newStartDate;
                            this.publicHolidays[publicHolidayIndex].endDate =
                                newEndDate;

                            // Perform any additional logic here, such as updating the server or UI
                        }
                    });
                }
            } else if (repos === true) {
                // Find the index of the holiday in the holidays array based on employeeId and date
                const reposIndex = this.reposDays.findIndex(
                    (repos) =>
                        repos.employeeId === employeeId &&
                        new Date(repos.startDate) <=
                            new Date(this.getDateString(year, month, day)) &&
                        new Date(this.getDateString(year, month, day)) <=
                            new Date(repos.endDate)
                );

                // Handle updating start and end dates if a holiday is clicked
                if (reposIndex !== -1) {
                    Swal.fire({
                        title: `Modifier les dates du repos de la personne`,
                        html: `
                    <div class="d-flex flex-d-c">
                        <label for="startDate">Nouvelle date de début:</label>
                        <input type="date" id="startDate" class="swal2-input" value="${this.reposDays[reposIndex].startDate}" required>
                    <div/>   
                    <div class="d-flex flex-d-c mt-2">           
                        <label for="endDate">Nouvelle date de fin:</label>
                        <input type="date" id="endDate" class="swal2-input" value="${this.reposDays[reposIndex].endDate}" required>
                    <div/> 
            `,
                        showCancelButton: true,
                        confirmButtonText: "Enregistrer",
                        cancelButtonText: "Annuler",
                        customClass: {
                            popup: "custom-swal-popup",
                            title: "custom-swal-title",
                            input: "custom-swal-input",
                            confirmButton: "swal2-confirm",
                            cancelButton: "swal2-cancel",
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const newStartDate =
                                document.getElementById("startDate").value;
                            const newEndDate =
                                document.getElementById("endDate").value;

                            // Update the holidays array with new start and end dates
                            this.reposDays[reposIndex].startDate = newStartDate;
                            this.reposDays[reposIndex].endDate = newEndDate;

                            // Perform any additional logic here, such as updating the server or UI
                        }
                    });
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}

form {
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input[type="date"],
input[type="time"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
    font-size: 14px;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}

.shift-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.shift {
    flex: 1;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.shift label {
    font-weight: normal;
}
.absence-form {
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-section {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.date-heading {
    font-size: 18px;
    font-weight: bold;
}

.shift-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.shift {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ffffff;
}

h3 {
    font-size: 16px;
    margin-bottom: 10px;
}

// .time-input {
//     display: flex;
//     align-items: center;
//     margin-bottom: 10px;
// }

.time-input label {
    margin-right: 10px;
    font-weight: bold;
    flex-shrink: 0;
}
.btn-details {
    background: var(--submit-blue-color);
    margin: 10px;
}
.btn-calculation {
    background: blueviolet;
    margin: 10px;
}
select {
    border: 1px solid red;
}
form {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
}
select:focus {
    outline: none;
}
select {
    height: 40px;
    font-size: 16px;
    padding: 3px 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    width: 70%;
    margin-left: 15px;
    option {
        border-top: 1px solid #ebebeb;
        font-weight: 40px;
        color: #5f6467;
    }
}
.planification {
    margin-top: 250px;
    padding-left: -50px;
    margin-left: -200px;
    table {
        width: 100%;
        border-collapse: collapse;
        th,
        td {
            border: 1px solid #ccc;
            text-align: center;
        }

        th[scope="row"] {
            background-color: #f2f2f2;
        }

        .day-cell {
            width: 36px; /* Adjust width as needed */
            height: 36px; /* Adjust height as needed */
        }
    }
    .sunday-cell {
        background-color: #bdc3c7; // Apply the desired background color
    }
    .holiday-cell {
        background-color: #3498db; /* Beautiful blue color */
        // border: none;
        cursor: pointer;
    }
    .public-holiday-cell {
        background-color: #2ecc71;
        cursor: pointer;

        // border: none;
    }
    .repos-cell {
        background-color: #e74c3c;
        // border: none;
        cursor: pointer;
    }
    .legend {
        margin-top: 20px;
    }

    .color-box {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border: 1px solid #ccc;
    }

    .holiday-color {
        background-color: #3498db; /* Beautiful blue color */
    }

    .repos-color {
        background-color: #e74c3c; /* Attractive red color */
    }

    .public-holiday-color {
        background-color: #2ecc71; /* Vibrant green color */
    }

    .sunday-color {
        background-color: #bdc3c7; /* Grey color for Sundays */
    }
    b-modal {
        position: absolute;
        .custom-modal {
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
        }

        .modal-form {
            padding: 20px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            transition: border-color 0.2s ease-in-out;
        }

        .form-control:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn {
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }

        .btn-primary {
            background-color: #007bff;
            color: white;
            border: none;
        }

        .btn-secondary {
            background-color: #f0f0f0;
            color: #333;
            border: none;
        }
    }
    .ajouter-repos {
        padding: 10px 20px;
        background-color: #e74c3c; /* Blue color */
        color: white;
        // border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
    }
    .ajouter-ferie {
        padding: 10px 20px;
        background-color: #2ecc71; /* Blue color */
        color: white;
        // border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
    }
    /* Custom CSS for SweetAlert dialogs */
    .swal2-popup {
        width: 400px; /* Set a width that fits your content */
        border-radius: 8px;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }

    .swal2-title {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .swal2-content {
        font-size: 1rem;
        margin-bottom: 20px;
    }

    .swal2-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        margin-bottom: 15px;
    }

    .swal2-confirm {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .swal2-cancel {
        background-color: #f0f0f0;
        color: #333;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .swal2-confirm:hover,
    .swal2-cancel:hover {
        opacity: 0.8;
    }
}
</style>
