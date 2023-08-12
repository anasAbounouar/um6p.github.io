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
                <form @submit.prevent="calculateTotalDuration">
                    <label for="start-date">Date de début :</label>
                    <input type="date" v-model="startDate" required />

                    <label for="end-date">Date de fin :</label>
                    <input type="date" v-model="endDate" required />

                    <div v-for="date in selectedDates" :key="date">
                        <p>le {{ formatDate(date) }}</p>
                        <div class="d-flex justify-content-between">
                            <!-- Morning Shift -->
                            <div>
                                <label :for="'start-time-morning-' + date">
                                    Matin :
                                </label>
                                <input
                                    type="time"
                                    :id="'start-time-morning-' + date"
                                    :value="getStartTime(date, 'morning')"
                                    required
                                />
                                <input
                                    type="time"
                                    :id="'end-time-morning-' + date"
                                    v-model="defaultEndMorning"
                                    required
                                />
                            </div>
                            <!-- Afternoon Shift -->
                            <div>
                                <label :for="'start-time-afternoon-' + date">
                                    Soir :
                                </label>
                                <input
                                    type="time"
                                    :id="'start-time-aftenoon-' + date"
                                    v-model="defaultStartAfternoon"
                                    required
                                />
                                <input
                                    type="time"
                                    :id="'end-time-aftenoon-' + date"
                                    v-model="defaultEndAfternoon"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit">Enregistrer l'absence</button>
                </form>

                <div id="result" v-html="resultHTML"></div>
            </div>
            <div id="result"></div>
        </section>
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
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
        // resultHTML() {
        //     // Calculate and format the result HTML here
        //     // You can use the data from startTimes and endTimes
        // },
    },
    methods: {
        calculateTotalDuration() {
            // Calculate the total duration here using the data from startTimes and endTimes
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("fr-CA");
        },
        setDefaultTimes() {
            // Loop through selected dates and set default absence times
            for (const date of this.selectedDates) {
                this.startTimes[date] = this.defaultStartMorning;
                this.endTimes[date] = this.defaultEndMorning;
            }
        },
        getStartTime(date, shift) {
            return (
                this.startTimes[date] &&
                this.startTimes[date][shift] &&
                this.startTimes[date][shift].start
            );
        },
        setStartTime(date, shift, value) {
            if (!this.startTimes[date]) {
                this.startTimes[date] = {};
            }
            if (!this.startTimes[date][shift]) {
                this.startTimes[date][shift] = {};
            }
            this.startTimes[date][shift].start = value;
        },
    },
    mounted() {
        this.setDefaultTimes(); // Call the method to set default times on component mount
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
</style>
