export const data = {
    labels: ["Homme", "Femme"],
    datasets: [
        {
            backgroundColor: ["#0000FF", "#FFC0CB"],
            //here give the nb of women and males , not the pourcentage
            data: [80, 20],
        },
    ],
};

export const options = {
    responsive: true,
    maintainAspectRatio: false,
};
