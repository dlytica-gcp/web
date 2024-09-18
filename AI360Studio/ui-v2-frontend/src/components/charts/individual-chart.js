// chartConfig.js
import {
  Chart,
  Legend,
  Tooltip,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  BarController,
  BarElement,
  PieController,
} from "chart.js";

Chart.register(
  CategoryScale,
  Legend,
  Tooltip,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  BarController,
  BarElement,
  PieController,
  ArcElement
);

let charts = [];
export const renderCharts =  (params = {}) => {
  const {
  lineX = [],
  lineY = [],
  barX = [],
  barY = [],
  pieData = [],
  pieLabel = [],
  transactionX = [],
  transactionY = [],
  bar_countX = [],
  bar_countY = [],
  bar1X = [],
  bar1Y = [],
  unique_countX = [],
  unique_countY = [],
  bar3LastYearX = [],
  bar3LastYearY = [],
  bar3ThisYearY=[]
} = params;
  // const nepaliMonths = [
  //   "Shrawan",
  //   "Bhadra",
  //   "Ashwin",
  //   "Kartik",
  //   "Mangsir",
  //   "Poush",
  //   "Magh",
  //   "Falgun",
  //   "Chaitra",
  //   "Baishakh",
  //   "Jestha",
  //   "Ashad",
  // ];

  // // Initialize arrays for sales and transactions data
  // const salesData = new Array(nepaliMonths.length).fill(0);
  // const transactionsData = new Array(nepaliMonths.length).fill(0);

  // // Map the provided data to the correct month index
  // data.forEach((item) => {
  //   const monthIndex = (item.nepali_month + 8) % 12;
  //   salesData[monthIndex] = item.total_txn_amt;
  //   transactionsData[monthIndex] = item.total_no_txn;
  // });

  const chart1 = new Chart(document.getElementById("chartjs-line"), {
    type: "line",
    data: {
      // labels: nepaliMonths,
      labels: lineX,
      datasets: [
        {
          label: "Sales ($)",
          fill: true,
          backgroundColor: "transparent",
          borderColor: window.theme.primary,
          // data: salesData,
          data: lineY,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      tooltips: {
        intersect: false,
      },
      hover: {
        intersect: true,
      },
      plugins: {
        filler: {
          propagate: false,
        },
      },
      scales: {
        xAxes: [
          {
            reverse: false,
            gridLines: {
              color: "rgba(0,0,0,0.05)",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              stepSize: 500,
            },
            display: true,
            borderDash: [5, 5],
            gridLines: {
              color: "rgba(0,0,0,0)",
            },
          },
        ],
      },
    },
  });

  const chart2 = new Chart(document.getElementById("chartjs-transaction"), {
    type: "line",
    data: {
      // labels: nepaliMonths,
      labels: transactionX,
      datasets: [
        {
          label: "Transactions Count",
          fill: true,
          backgroundColor: "rgba(29, 233, 182, 0.2)",
          borderColor: "#1de9b6",
          // data: transactionsData,
          data: transactionY,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      tooltips: {
        intersect: false,
      },
      hover: {
        intersect: true,
      },
      plugins: {
        filler: {
          propagate: false,
        },
      },
      scales: {
        xAxes: [
          {
            reverse: false, // Keep the order from Shrawan
            gridLines: {
              color: "rgba(0,0,0,0.05)",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              stepSize: 100,
            },
            display: true,
            borderDash: [5, 5],
            gridLines: {
              color: "rgba(0,0,0,0)",
            },
          },
        ],
      },
    },
  });
  const chart3 = new Chart(document.getElementById("chartjs-bar"), {
    type: "bar",
    data: {
      labels: barX,
      datasets: [
        {
          label: "Last year",
          backgroundColor: window.theme.primary,
          borderColor: window.theme.primary,
          hoverBackgroundColor: window.theme.primary,
          hoverBorderColor: window.theme.primary,
          data: barY,
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            stacked: false,
            ticks: {
              stepSize: 20,
            },
          },
        ],
        xAxes: [
          {
            stacked: false,
            gridLines: {
              color: "transparent",
            },
          },
        ],
      },
    },
  });
  const chart4 = new Chart(document.getElementById("chartjs-bar-count"), {
    type: "bar",
    data: {
      labels: bar_countX,
      datasets: [
        {
          label: "Transaction Counts",
          backgroundColor: "#1de9b6",
          borderColor: "#1de9b6",
          hoverBackgroundColor: "#1de9b6",
          hoverBorderColor: "#1de9b6",
          data: bar_countY,
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            stacked: false,
            ticks: {
              stepSize: 50,
            },
          },
        ],
        xAxes: [
          {
            stacked: false,
            gridLines: {
              color: "transparent",
            },
          },
        ],
      },
    },
  });
  const chart5 = new Chart(document.getElementById("chartjs-bar1"), {
    type: "bar",
    data: {
      labels: bar1X,
      datasets: [
        {
          label: "Last year",
          backgroundColor: window.theme.primary,
          borderColor: window.theme.primary,
          hoverBackgroundColor: window.theme.primary,
          hoverBorderColor: window.theme.primary,
          data: bar1Y,
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
        {
          label: "This year",
          backgroundColor: "#dee2e6",
          borderColor: "#dee2e6",
          hoverBackgroundColor: "#dee2e6",
          hoverBorderColor: "#dee2e6",
          data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            stacked: false,
            ticks: {
              stepSize: 20,
            },
          },
        ],
        xAxes: [
          {
            stacked: false,
            gridLines: {
              color: "transparent",
            },
          },
        ],
      },
    },
  });
  const chart6 = new Chart(document.getElementById("chartjs-pie"), {
    type: "pie",
    data: {
      labels:pieLabel,
      datasets: [
        {
          data: pieData,
          backgroundColor: [
            window.theme.primary,
            window.theme.warning,
            window.theme.danger,
            "#dee2e6",
          ],
          borderColor: "transparent",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
    },
  });
  const chart7 = new Chart(document.getElementById("chartjs-unique-count"), {
    type: "bar",
    data: {
      labels: unique_countX,
      datasets: [
        {
          label: "Transaction Counts",
          backgroundColor: "#1de9b6",
          borderColor: "#1de9b6",
          hoverBackgroundColor: "#1de9b6",
          hoverBorderColor: "#1de9b6",
          data: unique_countY,
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            stacked: false,
            ticks: {
              stepSize: 50,
            },
          },
        ],
        xAxes: [
          {
            stacked: false,
            gridLines: {
              color: "transparent",
            },
          },
        ],
      },
    },
  });
  const chart8 = new Chart(document.getElementById("chartjs-bar3"), {
    type: "bar",
    data: {
      labels: bar3LastYearX,
      datasets: [
        {
          label: "Last year",
          backgroundColor: window.theme.primary,
          borderColor: window.theme.primary,
          hoverBackgroundColor: window.theme.primary,
          hoverBorderColor: window.theme.primary,
          data: bar3LastYearY,
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
        {
          label: "This year",
          backgroundColor: "#dee2e6",
          borderColor: "#dee2e6",
          hoverBackgroundColor: "#dee2e6",
          hoverBorderColor: "#dee2e6",
          data: bar3ThisYearY,
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            stacked: false,
            ticks: {
              stepSize: 20,
            },
          },
        ],
        xAxes: [
          {
            stacked: false,
            gridLines: {
              color: "transparent",
            },
          },
        ],
      },
    },
  });
  charts.push(chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8);
};
export const destroyCharts = () => {
  charts.forEach((chart) => chart.destroy());
  charts = [];
};
