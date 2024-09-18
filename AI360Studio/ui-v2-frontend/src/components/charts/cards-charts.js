// chartConfig.js

export const renderCharts = () => {
    
    new Chart(document.getElementById("chartjs-pie1"), {
        type: "pie",
        data: {
            labels: ["Social", "Search Engines"],
            datasets: [{
                data: [260, 125],
                backgroundColor: [
                    window.theme.primary,
                    window.theme.warning,
                ],
                borderColor: "transparent"
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true
            }
        }
    });
   
    
    new Chart(document.getElementById("chartjs-pie2"), {
        type: "pie",
        data: {
            labels: [ "Direct", "Other"],
            datasets: [{
                data: [ 54, 146],
                backgroundColor: [
                    window.theme.primary,
                    window.theme.warning,
                ],
                borderColor: "transparent"
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true
            }
        }
    });
   
   
  };
  