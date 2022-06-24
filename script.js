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


//scroll event listener
function scrollToTop() {
    // window.addEventListener('scroll', () => {
    //     const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    //     console.log(scrollable);
    //     if (scrollable > 100) {
    //         document.getElementById('stickyNavButton').classList.remove('d-none');
    window.scrollTo(0);
}
//     });
// }

window.onscroll = function() {

    if (window.scrollY > 100) {
        document.getElementById('stickyNavButton').classList.remove('d-none');

    }
};

//loads the current Day for the date picker
function todayAsFunction() {
    ['startDate', 'endDate'].forEach((date) => {
        document.getElementById(date).setAttribute('max', today);
        document.getElementById(date).value = today;
    });

}

//loads the current currency Value of Bitcoin
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
    todayAsFunction();
}

// Calculator --------------------------------------------------------------
// calculates the value of Bitcoin to $
function convertCurrencyToBTC() {
    let x = document.getElementById('input1').value / bitCoinCurrency;
    x = document.getElementById('input2').value = x.toFixed(6);
}
// calculates the value of $ to Bitcoin
function convertCurrencyToUSD() {
    let x = document.getElementById('input2').value * bitCoinCurrency;
    document.getElementById('input1').value = x;
}

function removePopup() {
    document.getElementById('popupMessage').classList.add('d-none');
};




// chart ----------------------------------------------------------------
// saving the Dates to further creat the Chart 
async function getDates() {
    let selectedStartDate = document.getElementById('startDate').value.length;
    let selectedEndDate = document.getElementById('endDate').value.length;
    let startDateValue = document.getElementById('startDate').value;
    let endDateValue = document.getElementById('endDate').value;

    if (myChart) {
        deleteChart()
    };
    if (selectedStartDate == 0) {

        document.getElementById('popupMessage').classList.remove('d-none');
        return;
    };
    if (selectedEndDate == 0) {

        document.getElementById('popupMessage').classList.remove('d-none');
        return;
    };

    //continues with the data that are needed for creation of the Chart

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


// starts with the creation of the Chart 
function chart() {
    document.getElementById('chartContainer').classList.remove('d-none');
    let info = responseAsJson.dataset.data;
    for (let i = info.length - 1; i > 0; i--) {
        labelsX.push(info[i][0]);
        labelsY.push(info[i][1]);
    }
    let data = {
        labels: labelsX, //labels = x Axis 
        datasets: [{
            label: 'Exchange Rate',
            backgroundColor: 'white',
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


// shows the created Chart as Bar-chart
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
            backgroundColor: 'black',
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

// Table -------------------------------------------------------------------
// checks if the table is build already
function getDatesTable() {
    if (myChart != null) {
        deleteChart()
    };
    buildTable()
};


// creates the Table as a data to scroll through
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

// limits the date picking to today in oppose to future
$(function() {
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate() - 1;
    let year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    let minDate = year + '-' + month + '-' + day;

    $('#endDate').attr('max', minDate);
    $('#startDate').attr('max', minDate);
});

//----------------------------------------------------------

//scroll to Top of the page section

// scrolls to Top.
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// activating the scroll to top function