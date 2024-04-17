document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('currency-form');
    var resetButton = document.getElementById('reset-view');
    var resultsSection = document.getElementById('results');

    function drawChart(data) {
        var ctx = document.getElementById('currencyChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(data), // Daty lub inne identyfikatory dla osi X
                datasets: [{
                    label: 'Kurs waluty',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: Object.values(data)
                }]
            },
            options: {}
        });
    }
    function loadDataAndDrawChart() {
        fetch('/api/rates')
            .then(response => response.json())
            .then(data => {
                drawChart(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    form.addEventListener('submit', function(event) {
        fetch('/api/rates')
        .then(response => response.json())
        .then(data => {
            drawChart(data);
        })
        .catch(error => console.error('Error fetching data:', error));
        event.preventDefault();
        var baseCurrency = document.getElementById('baseCurrency').value;

        fetch(`/rates/${baseCurrency}`)
            .then(response => response.json())
            .then(data => {
                resultsSection.innerHTML = `<h2>Kursy dla ${baseCurrency}:</h2>`;
                for (var currency in data.conversion_rates) {
                    var rate = data.conversion_rates[currency];
                    resultsSection.innerHTML += `<p>1 ${baseCurrency} = ${rate} ${currency}</p>`;
                }
                // Przewijanie do sekcji wyników
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    resetButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Czyszczenie sekcji wyników i przewijanie do góry
        resultsSection.innerHTML = '';
        document.body.scrollIntoView({ behavior: 'smooth' });
    });
    
    loadDataAndDrawChart();
});
