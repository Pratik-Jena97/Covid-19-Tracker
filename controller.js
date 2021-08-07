var myObj;
var chartDataArray;
var myChart;
var ctx;
var chartData;
var active = document.querySelector(".active .no");
var infected = document.querySelector(".infected .no");
var recovered = document.querySelector(".recovered .no");
var deaths = document.querySelector(".deaths .no");

var activeDate = document.querySelector(".active .date");
var infectedDate = document.querySelector(".infected .date");
var recoveredDate = document.querySelector(".recovered .date");
var deathsDate = document.querySelector(".deaths .date");

var getJSON = function(url,callback)
{
 var https = new XMLHttpRequest();
 https.open('GET',url,true);
 https.onload = function(){
     var status = https.status;
     if(status === 200)
     {
         callback(null,https.response);
     }
     else
     {
         callback(status,https.response);
     }
 };
 https.send();
};

var url = "https://api.covid19india.org/data.json";
getJSON(url,function(err,data)
{

    if(err != null)
    {
        alert("Something went wrong! please reload the page");
    }
    else
    {
         myObj = JSON.parse(data);
         stateData(myObj,'Total');
    }
});

function stateData(countryData,selectedState)
{
    for(let i=0;i<countryData.statewise.length;i++)
    {

        if(selectedState === countryData.statewise[i].state)
        {
            active.innerHTML = countryData.statewise[i].active;
            infected.innerHTML = countryData.statewise[i].confirmed;
            recovered.innerHTML = countryData.statewise[i].recovered;
            deaths.innerHTML = countryData.statewise[i].deaths;

            activeDate.innerHTML = countryData.statewise[i].lastupdatedtime;
            infectedDate.innerHTML = countryData.statewise[i].lastupdatedtime;
            recoveredDate.innerHTML = countryData.statewise[i].lastupdatedtime;
            deathsDate.innerHTML = countryData.statewise[i].lastupdatedtime;

            chartDataArray = [parseInt(countryData.statewise[i].active), parseInt(countryData.statewise[i].confirmed), parseInt(countryData.statewise[i].recovered), parseInt(countryData.statewise[i].deaths)];
            console.log(chartDataArray[0]);
            createChart();
        }
    }
}

const selected = document.querySelector(".category .selected");
const optionsContainer = document.querySelector(".category .options-container");

const optionsList = document.querySelectorAll(".category .option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");

});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
    currentState = selected.textContent;
    stateData(myObj,currentState);
  });
});


const chartTypeSelected = document.querySelector(".chartselected");
const chartOptionsContainer = document.querySelector(".chart-options-container");
const chartOptionsList = document.querySelectorAll(".chart-options-container .option");
var currentChart;
var selectedChart = 'bar';

chartTypeSelected.addEventListener("click", () => {
    chartOptionsContainer.classList.toggle("active");
  
  });

  chartOptionsList.forEach(o => {
    o.addEventListener("click", () => {
    chartTypeSelected.innerHTML = o.querySelector("label").innerHTML;
    chartOptionsContainer.classList.remove("active");
      currentChart = o.querySelector("label").innerHTML;
      switch(currentChart){
          case 'Line Chart':
            selectedChart = 'line';
            updateChartType(selectedChart);
            break;
            case 'Bar Chart':
            selectedChart = 'bar';
            updateChartType(selectedChart);
            break; 
            case 'Horizontal':
            selectedChart = 'horizontal';
            updateChartType(selectedChart);
            break;  
            case 'Pie Chart':
            selectedChart = 'pie';
            updateChartType(selectedChart);
            break;   
      }
    });
  });
  
  

function createChart(){
    chartData = {
        labels: ['Active', 'Infected', 'Recovered', 'Deaths'],
        datasets: [{
            label: '# of Cases',
            data: [chartDataArray[0],chartDataArray[1],chartDataArray[2],chartDataArray[3]],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    console.log("chartDataArray is"+typeof chartDataArray[0]);
    ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'polarArea',
        data: chartData,
    });
    
    
    
}


function updateChartType(chartType) {
    myChart.destroy();
    myChart = new Chart(ctx, {
      type: chartType,
      data: chartData,
    });
  };