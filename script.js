const API_KEY = '11HK8Grj5YajQJ6EAy6A';
let today = new Date().toISOString().split('T')[0];
let startDate = [];
let endDate = [];
let responseAsJson = '';
let responseAsJsonToday = '';
let labelsX = [];
let labelsY = [];
let myChart = null;

async function loadCurrentRate() {
    let urlForToday = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${today}&end_date=${today}&api_key=${API_KEY}`;
    let responseToday = await fetch(urlForToday);
    responseAsJsonToday = await responseToday.json();
    console.log(responseAsJsonToday['dataset'])
    let bitCoinValueToday = responseAsJsonToday.dataset.data[0][1];
    console.log(bitCoinValueToday)
    document.getElementById('currentCourse').innerHTML = bitCoinValueToday;
    document.getElementById('todaysDate').innerHTML = today;
}

































// Chart
function chart() {

    const data = {
        labels: labelsX,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: labelsY,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}