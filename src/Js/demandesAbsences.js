const demandesAbsences = [
    {
        id: 0,
        demandeur: 4,
        employeeId: 5,
        debutAbsenceDate: "2023-09-01",
        endAbsenceDate: "2023-09-10",

        justification: "C",
        startDates: {
            "2023-08-27": {
                morning: { start: "07:00" },
                afternoon: { start: "15:00" },
            },
            // "2023-08-12": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-13": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-14": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-15": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-16": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-17": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-18": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-19": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
        },
        endDates: {
            "2023-08-27": {
                morning: { end: "12:00" },
                afternoon: { end: "16:00" },
            },
            // "2023-08-12": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-13": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-14": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-15": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-16": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-17": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-18": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-19": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
        },
        authorisation: "Encours",
    },
    {
        id: 1,
        demandeur: 2,
        employeeId: 3,
        debutAbsenceDate: "2023-09-05",
        endAbsenceDate: "2023-09-08",

        justification: "M",
        startDates: {
            // "2023-08-27": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "15:00" },
            // },
            "2023-08-12": {
                morning: { start: "07:00" },
                afternoon: { start: "13:00" },
            },
            // "2023-08-13": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-14": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-15": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-16": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-17": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-18": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-19": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
        },
        endDates: {
            // "2023-08-27": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            "2023-08-12": {
                morning: { end: "12:00" },
                afternoon: { end: "16:00" },
            },
            // "2023-08-13": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-14": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-15": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-16": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-17": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-18": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-19": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
        },
        authorisation: "Encours",
    },
    {
        id: 2,
        demandeur: 1,
        employeeId: 5,
        debutAbsenceDate: "2023-09-10",
        endAbsenceDate: "2023-09-15",

        justification: "V",
        startDates: {
            // "2023-08-27": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "15:00" },
            // },
            // "2023-08-12": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            "2023-08-13": {
                morning: { start: "07:00" },
                afternoon: { start: "13:00" },
            },
            // "2023-08-14": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-15": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-16": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-17": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-18": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
            // "2023-08-19": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "13:00" },
            // },
        },
        endDates: {
            // "2023-08-27": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-12": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            "2023-08-13": {
                morning: { end: "12:00" },
                afternoon: { end: "16:00" },
            },
            // "2023-08-14": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-15": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-16": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-17": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-18": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
            // "2023-08-19": {
            //     morning: { end: "12:00" },
            //     afternoon: { end: "16:00" },
            // },
        },
        authorisation: "Encours",
    },
    // Add more entries here with authorisation: "Encours"
];

export default demandesAbsences;
