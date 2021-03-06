
Chart.defaults.global.defaultFontFamily = 'Josefin Sans', 'sans-serif';

function createHydrationChart(user, date) {
  let chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'hydration', 'numOunces')),
      datasets: [{
        label: 'ounces',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'hydration', 'numOunces')),
        backgroundColor: '#7398C4',
        borderColor: "#061223",
        borderWidth: 1,
      }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      responsive: true,
      title: {
        fontSize: 16,
        fontColor: '#081D36',
        display: true,
        text: 'This Week\'s Hydration'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'ounces'
          },
          ticks: {"beginAtZero": true, maxTicksLimit: 8}
        }],
      },
    },
  };
  return new Chart(weeklyHydrationChart, chartData);
}

function createSleepDonutChart(user, date, value, label, canvas) {
  let highestPossibleQuality = 5;
  let chartData = {
    type: 'doughnut',
    data: {
      labels: [label],
      datasets: [{
        label: false,
        data: [value, highestPossibleQuality - value],
        backgroundColor: ['#791289', '#E7E5DF'],
        borderWidth: 0
      }]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Quality'
      },
      responsive: true,
      maintainAspectRatio: false,
      circumference: Math.PI,
      events: [],
      rotation: Math.PI
    },
  };
  return new Chart(canvas, chartData);
}


function createWeekOfSleepChart(user, date) {
  let chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'sleep', 'sleepQuality')),
      datasets: [{
        label: 'quality',

        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'sleepQuality')),
        yAxisID: 'yAxis2',
        backgroundColor: '#791289',
        borderColor: "#061223",
        borderWidth: 1
      },
      {
        label: 'duration',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'hoursSlept')),
        backgroundColor: '#AD94CD',
        borderColor: "#061223",
        borderWidth: 1
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        fontColor: '#081D36',
        fontSize: 16,
        display: true,
        text: 'Weekly Sleep'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'hours'
          },
          ticks: {"beginAtZero": true, maxTicksLimit: 8}
        },
        {
          scaleLabel: {
            display: true,
            labelString: 'quality'
          },
          id: 'yAxis2',
          position: 'right',
          ticks: {"beginAtZero": true, maxTicksLimit: 8, suggestedMax: 5},
          // callback: (value) => value * 5},
          gridLines: {'display': false}
        }],
      },
    },
  };
  return new Chart(weekOfSleepChart, chartData);
}

function createWeekOfActivityChart(user, date) {
  let chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'activity', 'numSteps')),
      datasets: [{
        label: 'minutes active',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'minutesActive')),
        backgroundColor: '#D45E5E',
        borderColor: "#061223",
        borderWidth: 1
      },
      {
        label: 'stairs climbed',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'flightsOfStairs')).map(value => value * 10),
        backgroundColor: '#EDC610',
        borderColor: "#061223",
        borderWidth: 1
      },
      {
        label: 'steps',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'numSteps')),
        yAxisID: 'yAxis2',
        backgroundColor: '#F79D03',
        borderColor: "#061223",
        borderWidth: 1
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        fontColor: '#081D36',
        fontSize: 16,
        display: true,
        text: 'Weekly Activity'
      },
      scales: {
        yAxes: [{
          ticks: {"beginAtZero": true, maxTicksLimit: 8},
          scaleLabel: {
            display: true,
            labelString: 'stairs / active minutes'
          },
          position: 'left',
          gridLines: {'display': false}
        },
        {
          ticks: {"beginAtZero": true, maxTicksLimit: 8},
          scaleLabel: {
            display: true,
            labelString: 'number of steps'
          },
          id: 'yAxis2',
          position: 'right',
          gridLines: {'display': false}
        }],
      },
    },
  };
  return new Chart(weekOfActivityChart, chartData);
}

function createWeekOfHydrationChart(user, date) {
  let ouncesValue = user.wellnessLog.getTodaysStat(date, 'hydration', 'numOunces');
  let upperLimit = 80;
  let chartData = {
    type: 'doughnut',
    data: {
      labels: ['Ounces', 'Ounces to Go'],
      datasets: [{
        label: {display: false},
        data: [ouncesValue, upperLimit - ouncesValue >= 0 ? upperLimit - ouncesValue : 0],
        backgroundColor: ['#7398C4', '#E7E5DF'],
        borderWidth: 0
      }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      responsive: true,
      title: {
        fontColor: '#081D36',
        fontSize: 16,
        display: true,
        text: 'Today\'s Hydration'
      },
      circumference: 2 * Math.PI,
      rotation: Math.PI
    },
  };
  return new Chart(todaysHydration, chartData);
}
