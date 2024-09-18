// chartConfig.js

export const renderCharts = () => {
    
    new Chart(document.getElementById("chartjs-line"), {
        type: "line",
        data: {
            labels: ["Shrawan", "Bhadra", "Ashoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra", "Baishak", "Jestha", "Ashar"],
            datasets: [{
                label: "Sales ($)",
                fill: true,
                backgroundColor: "transparent",
                borderColor: window.theme.primary,
                data: [2115, 1562, 1584, 1892, 1487, 2223, 2966, 2448, 2905, 3838, 2917, 3327]
            }, ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true
            },
            tooltips: {
                intersect: false
            },
            hover: {
                intersect: true
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    reverse: true,
                    gridLines: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }],
                yAxes: [{
                    ticks: {
                        stepSize: 500
                    },
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: "rgba(0,0,0,0)",
                        fontColor: "#fff"
                    }
                }]
            }
        }
    });
   
    new Chart(document.getElementById("chartjs-transaction"), {
        type: "line",
        data: {
            labels: ["Shrawan", "Bhadra", "Ashoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra", "Baishak", "Jestha", "Ashar"],
            datasets: [
                
                {
                    label: "Transactions Count",
                    fill: true,
                    backgroundColor: "rgba(29, 233, 182, 0.2)", // Teal with transparency
                    borderColor: "#1de9b6", // Teal // You can use a different color for the second dataset
                    data: [150, 200, 170, 190, 180, 210, 230, 250, 270, 300, 280, 310] // Example data, replace with actual transaction counts
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true // Set to true to display the legend
            },
            tooltips: {
                intersect: false
            },
            hover: {
                intersect: true
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    reverse: true,
                    gridLines: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }],
                yAxes: [{
                    ticks: {
                        stepSize: 100
                    },
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: "rgba(0,0,0,0)",
                        fontColor: "#fff"
                    }
                }]
            }
        }
    });
    new Chart(document.getElementById("chartjs-fail-transaction"), {
        type: "line",
        data: {
             labels: [
                  "Insufficient Funds", "Card Expired", "Wrong PIN", "Limit Exceeded", 
                  "Suspected Fraud", "Tech Error", "Unsupported Card", "Invalid Account", 
                  "Network Timeout", "Unauthorized", "Wrong CVV", "Duplicate"
                ],
            datasets: [
                
                {
                    label: "Failed Transactions Count",
                    fill: true,
                    backgroundColor: "rgba(255, 0, 0, 0.2)", // Red with transparency
                    borderColor: "#ff0000", // Red border color
                    data: [150, 200, 170, 190, 180, 210, 230, 250, 270, 300, 280, 310] // Example data

                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true // Set to true to display the legend
            },
            tooltips: {
                intersect: false
            },
            hover: {
                intersect: true
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    reverse: true,
                    gridLines: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }],
                yAxes: [{
                    ticks: {
                        stepSize: 100
                    },
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: "rgba(0,0,0,0)",
                        fontColor: "#fff"
                    }
                }]
            }
        }
    });
   
  };
  