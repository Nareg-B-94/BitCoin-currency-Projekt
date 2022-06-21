const API_KEY = '11HK8Grj5YajQJ6EAy6A';
let today = new Date().toISOString().split('T')[0];
let startDate = [];
let endDate = [];
let responseAsJson = '';
let responseAsJsonToday = '';
let labelsX = [];
let labelsY = [];
let myChart = null;
let bitCoinCurrency = '';

async function loadCurrentRate() {
    let urlForToday = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${today}&end_date=${today}&api_key=${API_KEY}`;
    let responseToday = await fetch(urlForToday);
    responseAsJsonToday = await responseToday.json();
    console.log(responseAsJsonToday['dataset'])
    bitCoinCurrency = responseAsJsonToday.dataset.data[0][1];
    console.log(bitCoinCurrency)
    document.getElementById('currentCourse').innerHTML = bitCoinCurrency;
    document.getElementById('todaysDate').innerHTML = today;
    document.getElementById('currentCourse2').innerHTML = bitCoinCurrency;
}

// Calculator 

function convertCurrencyToBTC() {
    let x = document.getElementById('input1').value / bitCoinCurrency;
    x = document.getElementById('input2').value = x.toFixed(6);
}

function convertCurrencyToUSD() {
    let x = document.getElementById('input2').value * bitCoinCurrency;
    document.getElementById('input1').value = x;
}

// chart 

async function getDates() {
    if (myChart != null) {
        deleteChart()
    }
    if (document.getElementById('startDate').value == 0) {
        document.getElementById('getDateButton').disabled = true
        alert('please select a start date and an End date');
        location.reload();

    }


    let startDateValue = document.getElementById('startDate').value;
    let endDateValue = document.getElementById('endDate').value;


    endDate.push(endDateValue);
    startDate.push(startDateValue);
    let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    console.log(responseAsJson)

    document.getElementById('showAsBarChartButton').classList.remove('d-none');
    document.getElementById('getDateButton').innerHTML = 'show as Chart';

    chart();
    buildTable()
};


function deleteChart() {
    myChart.destroy();
    startDate = [];
    endDate = [];
    labelsY = [];
    labelsX = [];
};

function chart() {
    document.getElementById('chartContainer').classList.remove('d-none')
    let info = responseAsJson.dataset.data;
    for (let i = info.length - 1; i > 0; i--) {
        labelsX.push(info[i][0]);
        labelsY.push(info[i][1]);
    }
    let data = {
        labels: labelsX, //labels = x Axis 
        datasets: [{
            label: 'Exchange Rate',
            backgroundColor: 'gold',
            borderColor: 'black',
            data: labelsY, //data = Y Axis
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
};


function getDatesBarChart() {
    if (myChart != null) {
        deleteChart()
    };
    let info = responseAsJson.dataset.data;
    for (let i = info.length - 1; i > 0; i--) {
        labelsX.push(info[i][0]);
        labelsY.push(info[i][1]);
    }
    let data = {
        labels: labelsX, //labels = x Axis 
        datasets: [{
            label: 'Exchange Rate',
            backgroundColor: 'gold',
            borderColor: 'black',
            data: labelsY, //data = Y Axis
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {}
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

};

function getDatesTable() {
    if (myChart != null) {
        deleteChart()
    };
    buildTable()
};

function buildTable() {
    document.getElementById('tableOutput').style.display = 'grid'
    let tableData = document.getElementById('tableOutput');
    let responseTable = responseAsJson.dataset.data;
    tableData.innerHTML = "";
    for (let i = 0; i < responseTable.length; i++) {
        tableData.innerHTML += `
    <table class="tableOutput" >
        
        <tr>
            <td class="td1">${responseTable[i][0]}:</td> &nbsp 
            <td class="td2">${responseTable[i][1].toFixed(2)}&nbsp<b>USD</b></td>
        </tr>

    </table>

    `
    }
};


$(function() {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate() - 1;
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var minDate = year + '-' + month + '-' + day;

    $('#endDate').attr('max', minDate);
    $('#startDate').attr('max', minDate);
});