const demandesAbsences = [
    {
        id: 0,
        demandeur: 0,
        employeeId: 5,
        debutAbsenceDate: "2023-09-01",
        endAbsenceDate: "2023-09-01",

        justification: "C",
        startDates: {
            "2023-09-01": {
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
            "2023-09-01": {
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
        visaDemandeur: "Oui",
        visaSuperviseur: "Encours",
        visaAdmin: "Encours",
    },
    {
        id: 1,
        demandeur: 2,
        employeeId: 3,
        debutAbsenceDate: "2023-08-12",
        endAbsenceDate: "2023-08-13",

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
            "2023-08-12": {
                morning: { end: "12:00" },
                afternoon: { end: "16:00" },
            },
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
        visaDemandeur: "Oui",
        visaSuperviseur: "Oui",
        visaAdmin: "Encours",
    },
    {
        id: 2,
        demandeur: 1,
        employeeId: 5,
        debutAbsenceDate: "2023-08-16",
        endAbsenceDate: "2023-08-17",

        justification: "MGE",
        startDates: {
            // "2023-08-27": {
            //     morning: { start: "07:00" },
            //     afternoon: { start: "15:00" },
            // },
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
            "2023-08-16": {
                morning: { start: "07:00" },
                afternoon: { start: "13:00" },
            },
            "2023-08-17": {
                morning: { start: "07:00" },
                afternoon: { start: "13:00" },
            },
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
            "2023-08-16": {
                morning: { end: "12:00" },
                afternoon: { end: "16:00" },
            },
            "2023-08-17": {
                morning: { end: "12:00" },
                afternoon: { end: "16:00" },
            },
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
        visaDemandeur: "Oui",
        visaSuperviseur: "Encours",
        visaAdmin: "Encours",
    },
    // Add more entries here with authorisation: "Encours"
    {
        id: 9,
        demandeur: 0,
        employeeId: 0,
        debutAbsenceDate: "2023-08-27",
        endAbsenceDate: "2023-08-27",

        justification: "MGE",
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
        authorisation: "Oui",
        visaDemandeur: "Oui",
        visaSuperviseur: "Oui",
        visaAdmin: "Oui",
    },
    // Add more entries here with authorisation: "Encours"
];

export default demandesAbsences;
