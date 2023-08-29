<template>
    <div>
        <section id="planification">
            <div class="my-5">
                <label for="yearSelect">Choisisir une année</label>
                <select id="yearSelect" v-model="selectedYear">
                    <option
                        v-for="year in [2023, 2024, 2025]"
                        :key="year"
                        :value="year"
                    >
                        {{ year }}
                    </option>
                </select>

                <label for="monthSelect" class="mt-2">Choisisir un mois</label>
                <select id="monthSelect" v-model="selectedMonth">
                    <option
                        v-for="month in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                        :key="month"
                        :value="month"
                    >
                        {{ months[month - 1] }}
                    </option>
                </select>
            </div>
            <div class="d-flex justify-content-around">
                <button @click="openDialog" class="my-3 d-flex ajouter-repos">
                    Ajouter un repos
                </button>
                <button
                    @click="openDialogCongé()"
                    class="my-3 d-flex ajouter-congé"
                >
                    Ajouter un Congé
                </button>
                <button
                    @click="openDialogFerie"
                    class="my-3 d-flex ajouter-ferie"
                >
                    Ajouter un jour ferié
                </button>
            </div>

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
                        <label for="endReposDate">Date de fin du repos :</label>
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
                v-if="dialogVisibleCongé"
                title="Ajouter un Congé"
                class="custom-modal"
            >
                <form @submit.prevent="addCongé()" class="modal-form">
                    <div class="form-group">
                        <label for="employeeSearch"
                            >Sélectionnez un employé :</label
                        >
                        <input
                            type="text"
                            id="employeeSearch"
                            v-model="searchText"
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
                            >Date de début du Congé :</label
                        >
                        <input
                            type="date"
                            v-model="startCongéDate"
                            class="form-control"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="endReposDate">Date de fin du Congé :</label>
                        <input
                            type="date"
                            v-model="endCongéDate"
                            class="form-control"
                            required
                        />
                    </div>

                    <div class="buttons">
                        <button type="submit" class="btn btn-primary">
                            Enregistrer Congé
                        </button>
                        <button
                            type="button"
                            @click.prevent="
                                dialogVisibleCongé = !dialogVisibleCongé
                            "
                            class="btn btn-secondary"
                        >
                            Annuler Congé
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
            <div class="container">
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2">Name</th>
                            <th :colspan="daysInMonth">
                                {{ months[selectedMonth - 1] }}
                            </th>
                        </tr>
                        <tr>
                            <!-- <th>Name</th> -->
                            <th v-for="day in daysInMonth" :key="day">
                                {{
                                    getNumber(
                                        new Date(
                                            selectedYear,
                                            selectedMonth + 1,
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
            </div>
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
        </section>
    </div>
</template>
<script>
import employees from "@/Js/employees";
import Swal from "sweetalert2";
import absence from "@/Js/absence.js";
export default {
    name: "planification-page",
    components: {
        // VSelect, // Register the VSelect component
    },
    data() {
        return {
            absence,
            searchText: "",
            selectedEmployee: null,
            dialogVisible: false,
            dialogVisibleFerie: false,
            dialogVisibleCongé: false,
            employees,
            selectedDate: new Date().getDate(),
            selectedYear: new Date().getFullYear(),
            selectedMonth: new Date().getMonth() + 1,
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
        };
    },
    computed: {
        daysInMonth() {
            // Calculate the total number of days in the current month
            const year = this.selectedYear;
            const month = this.selectedMonth; // Months are zero-based,
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
    },
    methods: {
        getNumber(day) {
            const dayOfMonth = day.getDate();
            return dayOfMonth;
        },
        getDateString(year, month, day) {
            const monthStr = month < 10 ? `0${month}` : `${month}`;
            const dayStr = day < 10 ? `0${day}` : `${day}`;
            return `${year}-${monthStr}-${dayStr}`;
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
        openDialog() {
            // Open the dialog when the button is clicked
            this.dialogVisible = true;
        },
        openDialogFerie() {
            // Open the dialog when the button is clicked
            this.dialogVisibleFerie = true;
        },
        openDialogCongé() {
            // Open the dialog when the button is clicked
            this.dialogVisibleCongé = true;
        },
        isDateInRange(currentDate, startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            return currentDate >= start && currentDate <= end;
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
        addCongé() {
            if (this.selectedEmployee !== "") {
                const newCongé = {
                    employeeId: this.selectedEmployee.id,
                    startDate: this.startCongéDate,
                    endDate: this.endCongéDate,
                };
                // Push the new repos object into the reposDays array
                this.holidays.push(newCongé);

                // Clear the form fields
                this.selectedEmployee = "";
                this.startCongéDate = "";
                this.endCongéDate = "";

                // Close the dialog
                this.dialogVisibleCongé = false;
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
    },
};
</script>
<style lang="scss" scoped>
#planification {
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }
    select {
        cursor: pointer;
        height: 40px;
        font-size: 16px;
        padding: 3px 10px;
        border: 2px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
        width: 70%;
        margin-left: 15px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        th,
        td {
            border: 1px solid #ccc;
            text-align: center;
            white-space: normal;
            word-wrap: break-word;
            overflow: hidden;
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
        border: none;
        cursor: pointer;
    }
    .public-holiday-cell {
        background-color: #2ecc71;
        cursor: pointer;

        border: none;
    }
    .repos-cell {
        background-color: #e74c3c;
        border: none;
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
            select {
                margin-right: 0px;
                width: 100%;
                margin-left: 0px;
            }
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
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        position: fixed;
        right: 30%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 99;
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
    .ajouter-congé {
        padding: 10px 20px;
        background-color: #3498db;
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
