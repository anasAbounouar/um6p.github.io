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
        </section>
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
// import Vue from "vue";
export default {
    name: "RH-employees-page",
    components: {
        SideBarView,
        NavBarView,
    },

    data() {
        return {
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
</style>
