<template>
    <div>
        <section id="demande-absence">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-10 my-3">
                        <h5><span>Choisissez un beneficiaire</span></h5>
                    </div>
                    <div class="col-12">
                        <div
                            class="d-flex align-items-center justify-content-around"
                        >
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="autre"
                                    checked
                                    v-model="selectedTypeDemande"
                                />
                                Demander pour une autre personne
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="moi"
                                    v-model="selectedTypeDemande"
                                />
                                Demander pour moi meme
                            </label>
                        </div>
                    </div>
                    <div v-if="selectedTypeDemande === 'autre'" class="col-8">
                        <div>
                            <form class="modal-form">
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

                                <div class="form-group p-relative">
                                    <label for="selectedEmployee"
                                        >Employé sélectionné :</label
                                    >
                                    <div class="p-relative">
                                        <select
                                            v-model="selectedEmployee"
                                            id="selectedEmployee"
                                            class="form-control"
                                        >
                                            <option
                                                value=""
                                                disabled
                                                selected
                                                hidden
                                            >
                                                Sélectionnez un employé
                                            </option>
                                            <option
                                                v-for="employee in filteredEmployees"
                                                :key="employee.id"
                                                :value="employee"
                                            >
                                                {{ employee.prenom }}
                                                {{ employee.nom }}
                                            </option></select
                                        ><i class="fa-solid fa-caret-down"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div
                        class="beneficiaire-infos"
                        v-if="this.isEmployeeSelected"
                    >
                        <div class="col-6 d-flex flex-d-c">
                            <div
                                class="beneficiaire-info d-flex justify-content-between nom"
                            >
                                <div>Nom & Prenom :</div>
                                <div>
                                    <span>
                                        {{ this.beneficiaire().prenom }}
                                    </span>
                                </div>
                            </div>
                            <div
                                class="beneficiaire-info d-flex justify-content-between mt-3 poste"
                            >
                                <div>Poste :</div>
                                <div>
                                    <span
                                        >{{ this.beneficiaire().poste }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div
                                class="beneficiaire-info d-flex justify-content-between matricule"
                            >
                                <div>Matricule :</div>
                                <div>
                                    <span
                                        >{{ this.beneficiaire().matricule }}
                                    </span>
                                </div>
                            </div>
                            <div
                                class="beneficiaire-info d-flex justify-content-between mt-3 employeur"
                            >
                                <div>Employeur :</div>
                                <div>
                                    <span
                                        >{{ this.beneficiaire().employeur }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="visa-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>visa demandeur</th>
                                        <th>visa superviseur</th>
                                        <th>visa admin</th>
                                        <th>autorisation</th>
                                        <th>Motif d’absence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <select
                                                name=""
                                                id=""
                                                v-model="visaDemandeur"
                                            >
                                                <option value="" disabled>
                                                    Choisir une option
                                                </option>
                                                <option
                                                    v-for="visa in visas"
                                                    :key="visa"
                                                >
                                                    {{ visa }}
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                name=""
                                                id=""
                                                v-model="visaSuperviseur"
                                                :disabled="
                                                    !isAccesVisaSuperviseur
                                                "
                                            >
                                                <option value="" disabled>
                                                    Choisir une option
                                                </option>
                                                <option
                                                    v-for="visa in visas"
                                                    :key="visa"
                                                >
                                                    {{ visa }}
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                name=""
                                                id=""
                                                v-model="visaAdmin"
                                                :disabled="!isAccesVisaAdmin"
                                            >
                                                <option value="" disabled>
                                                    Choisir une option
                                                </option>
                                                <option
                                                    v-for="visa in visas"
                                                    :key="visa"
                                                    :value="visa"
                                                >
                                                    {{ visa }}
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            {{ autorisation }}
                                        </td>
                                        <td>
                                            <select
                                                id="selectJustification"
                                                v-model="selectedJustification"
                                            >
                                                <option value="" disabled>
                                                    Choisir une option
                                                </option>
                                                <option
                                                    v-for="type in typesJustifications"
                                                    :key="type"
                                                >
                                                    {{ type }}
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            {{ this.startDate }}
                            {{ this.endDate }}
                            {{ this.getStartTime(this.startDate, "morning") }}
                            <h1>Gestion d'Absences</h1>
                            <form class="absence-form">
                                <label for="start-date">Date de début :</label>
                                <input
                                    type="date"
                                    v-model="startDate"
                                    required
                                />

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
                                    {{
                                        showDates
                                            ? "Masquer details"
                                            : "Montrer details"
                                    }}
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
                                                                'start-time-morning-' +
                                                                date
                                                            "
                                                        >
                                                            Matin :
                                                        </label>
                                                        <input
                                                            type="time"
                                                            :id="
                                                                'start-time-morning-' +
                                                                date
                                                            "
                                                            v-model="
                                                                startTimes[
                                                                    date
                                                                ]['morning']
                                                                    .start
                                                            "
                                                            @input="
                                                                setStartTime(
                                                                    date,
                                                                    'morning',
                                                                    $event
                                                                        .target
                                                                        .value
                                                                )
                                                            "
                                                            required
                                                        />
                                                        <input
                                                            type="time"
                                                            :id="
                                                                'end-time-morning-' +
                                                                date
                                                            "
                                                            v-model="
                                                                endTimes[date][
                                                                    'morning'
                                                                ].end
                                                            "
                                                            @input="
                                                                setEndTime(
                                                                    date,
                                                                    'morning',
                                                                    $event
                                                                        .target
                                                                        .value
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
                                                                startTimes[
                                                                    date
                                                                ]['afternoon']
                                                                    .start
                                                            "
                                                            @input="
                                                                setStartTime(
                                                                    date,
                                                                    'afternoon',
                                                                    $event
                                                                        .target
                                                                        .value
                                                                )
                                                            "
                                                            required
                                                        />
                                                        <input
                                                            type="time"
                                                            :id="
                                                                'end-time-aftenoon-' +
                                                                date
                                                            "
                                                            v-model="
                                                                endTimes[date][
                                                                    'afternoon'
                                                                ].end
                                                            "
                                                            @input="
                                                                setEndTime(
                                                                    date,
                                                                    'afternoon',
                                                                    $event
                                                                        .target
                                                                        .value
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
                                <button
                                    type="submit"
                                    @click.prevent="saveAbsence()"
                                >
                                    Enregistrer l'absence
                                </button>
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
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import employees from "@/Js/employees";
import Swal from "sweetalert2";
import absence from "@/Js/absence";
export default {
    name: "demande-absence-page",
    data() {
        return {
            absence,
            user: null,
            employees,
            selectedTypeDemande: "autre",
            searchText: "",
            selectedEmployee: "",
            isEmployeeSelected: false,
            visas: ["Encours", "Non", "Oui"],
            typesJustifications: [
                "MGE",
                "NCE",
                "OC",
                "C",
                "D",
                "CG",
                "CM",
                "M",
            ],
            selectedJustification: "C",
            visaAdmin: "Encours",
            visaSuperviseur: "Encours",
            visaDemandeur: "Encours",
            // now the part of gestion d'absence
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
            justifications: {}, // Initialize the justifications object
        };
    },
    computed: {
        filteredEmployees() {
            const filterText = this.searchText.toLowerCase();
            return this.employees.filter(
                (employee) =>
                    employee.prenom.toLowerCase().includes(filterText) ||
                    employee.nom.toLowerCase().includes(filterText)
            );
        },
        autorisation() {
            const visas = [
                this.visaAdmin,
                this.visaSuperviseur,
                this.visaDemandeur,
            ];

            if (visas.includes("Non")) {
                return "Non";
            } else if (visas.includes("Encours")) {
                return "Encours";
            } else {
                return "Oui";
            }
        },
        isAccesVisaSuperviseur() {
            if (this.user.poste === "admin" || this.user.poste === "RH") {
                return true;
                // an admin can do whatever he wants
            } else {
                if (this.selectedTypeDemande === "autre") {
                    return true;
                    // this means im a supervisor of someone else
                } else {
                    // case its for me
                    return false;
                }
            }
        },
        isAccesVisaAdmin() {
            if (this.user.poste === "admin") {
                return true;
            } else {
                return false;
            }
        },
        //gestion d'absence
        selectedDates() {
            const dates = [];
            let formattedStartDate = new Date(this.startDate);
            let formattedEndDate = new Date(this.endDate);
            while (formattedStartDate <= formattedEndDate) {
                dates.push(formattedStartDate.toISOString().split("T")[0]);
                formattedStartDate.setDate(formattedStartDate.getDate() + 1);
            }
            return dates;
        },
    },
    methods: {
        beneficiaire() {
            if (this.selectedTypeDemande === "autre") {
                if (this.selectedEmployee !== "") {
                    this.isEmployeeSelected = true;
                    const benef = this.employees.find((employee) => {
                        return employee.id === this.selectedEmployee.id;
                    });
                    return benef;
                } else {
                    return null;
                }
            }
            // case its me
            else {
                return this.user;
            }
        },
        //gestion d'absence
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
        async saveAbsence() {
            for (const date of this.selectedDates) {
                //lets save the justification for these days
                this.justifications[date] = this.selectedJustification;
                //checkrone must edit this to push to the table (backend)
            }

            const targetAbsence = this.absence.find((absenceObj) => {
                console.log(absenceObj.employeeId, "absenceObjc");
                console.log(this.beneficiaire().id, "beneficiaireId");
                return absenceObj.employeeId == this.beneficiaire().id;
            });
            console.log("before targetabsence", targetAbsence);

            if (targetAbsence) {
                const formattedStartDate = {
                    morning: {
                        start: this.getStartTime(this.startDate, "morning"),
                    },
                    afternoon: {
                        start: this.getStartTime(this.startDate, "afternoon"),
                    },
                };

                const formattedEndDate = {
                    morning: { end: this.getEndTime(this.endDate, "morning") },
                    afternoon: {
                        end: this.getEndTime(this.endDate, "afternoon"),
                    },
                };

                for (const date of this.selectedDates) {
                    targetAbsence.startDates[date] = formattedStartDate;
                    targetAbsence.endDates[date] = formattedEndDate;
                }
            }
            console.log("target absence", targetAbsence);
            console.log("absences", this.absence);
            let message = "";
            if (this.autorisation === "Oui") {
                message = "Vous avez bien enregistré l'absence de cet employé.";
            } else {
                message = "Vous avez bien demandé l'absence pour cet employé.";
            }
            Swal.fire({
                icon: "success",
                title: "Succès!",
                text: message,
                confirmButtonText: "OK",
            });
            this.$router.push({ name: "RH-autorisation-absence" });
        },
        async calculateTotalHours() {
            this.totalHours = 0;
            if (
                this.selectedDates.length > 0 &&
                this.startDate !== "" &&
                this.endDate !== ""
            ) {
                for (const date of this.selectedDates) {
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
            }

            return this.totalHours;
        },
    },
    watch: {
        selectedEmployee() {
            this.beneficiaire();
        },
        selectedTypeDemande(newValue) {
            if (newValue === "moi") {
                this.isEmployeeSelected = true;
            } else {
                this.isEmployeeSelected = false;
            }
            this.beneficiaire();
        },
        visaSuperviseur() {
            this.autorisation;
        },
        visaAdmin() {
            this.autorisation;
        },
        visaDemandeur() {
            this.autorisation;
        },
    },
    created() {
        const user = localStorage.getItem("user");
        if (user) {
            this.user = JSON.parse(user);
        }
    },
    mounted() {
        if (this.startDate !== "" && this.endDate !== "") {
            this.calculateTotalHours();
        }
    },
};
</script>
<style lang="scss" scoped>
#demande-absence {
    // .custom-modal {
    //     max-width: 600px;
    //     width: 100%;
    //     margin: 0 auto;
    // }

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
    i.fa-caret-down {
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
    }
    .beneficiaire-infos {
        display: flex;
        .beneficiaire-info {
            div:last-child {
                border: 1px solid var(--link-hovered-color);
                color: var(--link-hovered-color);
                border-radius: 6px;
                padding: 5px;
            }
        }
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
                // border: none;
                cursor: pointer;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 3px;
                margin: 0;
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
    .time-input label {
        margin-right: 10px;
        font-weight: bold;
        flex-shrink: 0;
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
    .btn-details {
        background: var(--submit-blue-color);
        margin: 10px;
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
    .btn-calculation {
        background: blueviolet;
        margin: 10px;
    }
}
</style>
