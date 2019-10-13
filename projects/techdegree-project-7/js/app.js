//alert
const alertPop = document.getElementById("alert");
// create the html for the banner
alertPop.innerHTML =
`
<div class="alert-banner">
<p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks
to complete</p>
<p class="alert-banner-close close" style="font-size:1em;">x</p>
</div>
`;

alertPop.addEventListener('click', e => {
const element = e.target;
if (element.classList.contains("alert-banner-close")) {
alertPop.style.display = "none"
}
});

//buttons



const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

send.addEventListener("click", e => {
  if (user.value === "" && message.value === "") {
    alert("Please enter a user name and message.");
    e.preventDefault();
  } else if (user.value === "") {
    alert("Please enter a user name.");
    e.preventDefault();
  } else if (message.value === "") {
    alert("Please enter a message");
    e.preventDefault();
  } else {
    alert("Your message has been sent.");
  }
});




//chart.js

const traffic = document.getElementById("trafficChart");

//Traffic
let age = ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-33"];
let hourly = [200, 1500, 400, 800, 1000, 2000, 900, 1250, 2500, 600, 1500];
let daily = [300, 1000, 500, 900, 1000, 2500, 600, 50, 2200, 650, 1500];
let weekly = [250, 1700, 300, 700, 1100, 2000, 600, 2250, 1500, 400, 900];
let monthly = [1500, 600, 400, 900, 1350, 2200, 900, 150, 200, 1600, 1300];

const myChart = new Chart(traffic, {
  type: 'line',
  data: {
    labels: age,
    datasets: [

      {data: weekly, borderColor: "#7477bf", lineTension: 0,
      backgroundColor: "rgba(77, 76, 114, 0.3)", pointRadius: 5, borderWidth: 2,
      pointBorderWidth: 3, pointBackgroundColor: "#fff"},
    ]
  },
  options: {
    legend: { display: false },
    responsive: true,
     maintainAspectRatio: false,
     tooltips: {enabled: false}
  }
});

//buttons for segments


//daily

new Chart(document.getElementById("dailyChart"), {
    type: 'bar',
    data: {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
        {
          data: [50,75,150,100,200,175,75], backgroundColor: "#7477bf", scale: {barPercentage: .2}
        }
      ]
    },
    options: {
      legend: { display: false },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {enabled: false},
      scales :{
        xAxes: [{barPercentage: 0.6}],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            sugestedMin: 50,
            suggestedMax: 250
          }
        }]
      }
    }
});

//donut

new Chart(document.getElementById("mobileUsers"), {
    type: 'doughnut',
    data: {
      labels: ["Phones", "Tablets", "Desktop"],
      datasets: [
        {
          backgroundColor: ["#007db6", "#62bb46", "#7477bf"],
          borderWidth: 0,
          data: [20,10,70],
                boxWidth: 20
        }
      ]
    },
    options: {
      responsive: true,
    maintainAspectRatio: false,
    tooltips: {enabled: false},
    legend: {
      position: "right",
      labels: {
          padding: 10,
          boxWidth: 15
      }
    }
   }
});
