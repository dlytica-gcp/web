const customerData = [
    { id: 'customer', label: 'Customer', dataset: [130000, 120000, 115000, 110000, 105000, 100000, 95000, 90000, 85000, 80000, 75000, 70000], chartType: 'line' },
    { id: 'deposit-customer', label: 'Deposit Customer', dataset: [15000, 14000, 13500, 13000, 12500, 12000, 11500, 11000, 10500, 10000, 9500, 9000], chartType: 'line' },
    { id: 'cards-customer', label: 'Cards Customer', datasets:[15400, 14500, 14000, 13500, 13000, 12500, 12000, 11500, 11000, 10500, 10000, 9500],chartType: 'line' }, 
    { id: 'mobile-banking-customers', label: 'Mobile Banking Customers', dataset: [45000, 44000, 43000, 42000, 41000, 40000, 39000, 38000, 37000, 36000, 35000, 34000], chartType: 'line' },
    { id: 'ecommerce-customers', label: 'Ecommerce Customers', dataset: [45000, 44000, 43000, 42000, 41000, 40000, 39000, 38000, 37000, 36000, 35000, 34000], chartType: 'line' },
    { id: 'entity-customers', label: 'Entity Customers', dataset: [65482, 64000, 63000, 62000, 61000, 60000, 59000, 58000, 57000, 56000, 55000, 54000], chartType: 'line' },
    { id: 'merchant-customers', label: 'Merchant Customers', dataset: [45552, 44500, 43500, 42500, 41500, 40500, 39500, 38500, 37500, 36500, 35500, 34500], chartType: 'line' },
    { id: 'total-loan', label: 'Total Loans', dataset: [1522222, 440000, 430000, 420000, 41000, 400000, 390000, 380000, 370000, 360000, 350000, 340000], chartType: 'line' },
    { id: 'total-debit-transaction', label: 'Total Debit Transaction', dataset: [1522222, 440000, 430000, 420000, 41000, 400000, 390000, 380000, 370000, 360000, 350000, 340000], chartType: 'line' },
    { id: 'total-credit-transaction', label: 'Total Credit Transaction', dataset: [45552, 44500, 43500, 42500, 41500, 40500, 39500, 38500, 37500, 36500, 35500, 34500], chartType: 'line' },
];

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const cardId = card.id.replace('-card', ''); 
        
        const cardData = customerData.find(data => data.id === cardId);

        if (cardData) {
            
            createPopup(cardData);
        }
    });
});

function createPopup(cardData) {
    
    const popup = document.createElement('div');
    popup.classList.add('popup');

    
    const closeButton = document.createElement('button');
    closeButton.textContent = '✖'; 
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        popup.remove(); 
    });
    popup.appendChild(closeButton);

    // Create the chart container
    const chartContainer = document.createElement('div');
    chartContainer.id = 'chartContainer'; 
    popup.appendChild(chartContainer);

    
    const canvas = document.createElement('canvas');
    canvas.id = 'chartCanvas'; 
    chartContainer.appendChild(canvas);

    
    document.body.appendChild(popup);


    createChart(canvas, cardData.label, cardData.datasets || cardData.dataset, cardData.chartType);
}

function createChart(canvas, label, dataset, chartType) {
    const ctx = canvas.getContext('2d');
    
    let data;
    
    if (chartType === 'bar') {
        data = {
            labels: ["Shrawan", "Bhadra", "Ashoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra", "Baishak", "Jestha", "Ashar"],
            datasets: Array.isArray(dataset) ? [{
                label: label,
                data: dataset,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }] : [
                {
                    label: 'Credit Cards',
                    data: dataset.credit,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Debit Cards',
                    data: dataset.debit,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        };
    } else if (chartType === 'pie' || chartType === 'doughnut') {
        data = {
            labels: ["Shrawan", "Bhadra", "Ashoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra", "Baishak", "Jestha", "Ashar"],
            datasets: [{
                label: label,
                data: dataset,
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)',],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)',],
                borderWidth: 1
            }]
        };
    } else if (chartType === 'radar') {
        data = {
            labels: ["Shrawan", "Bhadra", "Ashoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra", "Baishak", "Jestha", "Ashar"],
            datasets: [{
                label: label,
                data: dataset,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
    } else if (chartType === 'polarArea') {
        data = {
            labels: ["Shrawan", "Bhadra", "Ashoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra", "Baishak", "Jestha", "Ashar"],
            datasets: [{
                label: label,
                data: dataset,
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'], 
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', ],
                borderWidth: 1
            }]
        };
    } else if (chartType === 'scatter') {
        data = {
            datasets: [{
                label: label,
                data: dataset.map((value, index) => ({ x: index, y: value })),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
    } else {
        data = {
            labels: ["Shrawan", "Bhadra", "Ashoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra", "Baishak", "Jestha", "Ashar"],
            datasets: [{
                label: label,
                data: dataset,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
    }
    
    new Chart(ctx, {
        type: chartType,
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
