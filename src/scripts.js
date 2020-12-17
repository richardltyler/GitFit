//query selectors
const displayDate = document.querySelector('#date');
const greeting = document.querySelector('#greeting');
const displayedUserName = document.querySelector('#user-name');
const displayedUserStepGoal = document.querySelector('#user-step-goal');
const displayedUserStepGoalComparison = document.querySelector('#user-step-goal_comparison');
const displayedUserFriendsList = document.querySelector('#user-friends-list');
const weeklyHydrationChart = document.querySelector('#hydration-data-week_chart').getContext('2d');
const lastNightsSleepHoursValue = document.querySelector('#sleep-data-last-night-hours_number');
const lastNightsSleepQualityChart = document.querySelector('#sleep-data-last-night-quality_chart');
const lastNightsSleepQualityValue = document.querySelector('#sleep-data-last-night-quality_value');
const allTimeSleepHoursValue = document.querySelector('#sleep-data-all-time-hours_number');
const allTimeSleepQualityChart = document.querySelector('#sleep-data-all-time-quality_chart');
const allTimeSleepQualityValue = document.querySelector('#sleep-data-all-time-quality_value');
const weekOfSleepChart = document.querySelector('#sleep-data-week_chart');
const todaysActivityMinutes = document.querySelector('#activity-data_today-minutes');
const todaysStepCount = document.querySelector('#activity-data_today-steps');
const todaysDistanceWalked = document.querySelector('#activity-data_today-distance');
const weekOfActivityChart = document.querySelector('#activity-data-week_chart');
const minutesRanking = document.querySelector('#activity-data_rank-minutes');
const distanceRanking = document.querySelector('#activity-data_rank-distance');
const stepsRanking = document.querySelector('#activity-data_rank-steps');
const todaysHydration = document.querySelector('#hydration-data_today_chart');
const todaysHydrationValue = document.querySelector('#hydration-data_today_number');

//eventhandlers and helpers
window.onload = openSite();

function openSite() {
  const userRepo = new UserRepository(userData);
  const activityRepo = new ActivityRepository(activityData);
  const currentUser = userRepo.users[getRandomIndex(userRepo.users)];
  const currentUser.getWellnessLog(hydrationData, sleepData, activityData);
  displayUserDashboard(currentUser, '2019/09/22');
};

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayUserDashboard(user, date) {
  displayUserInfo(user);
  greetUser(user, date);
  displayUserRankings(minutesRanking, user, date, 'minutesActive');
  displayUserRankings(stepsRanking, user, date, 'numSteps');
  displayUserRankings(distanceRanking, currentUser, date, 'flightsOfStairs');
  displayUserData(todaysActivityMinutes, user, date, 'activity', 'minutesActive');
  displayUserData(todaysStepCount, user, date, 'activity', 'numSteps');
  displayUserData(todaysDistanceWalked, user, date, 'activity', 'distance');
  displayUserData(lastNightsSleepHoursValue, user, date, 'sleep', 'hoursSlept');
  allTimeSleepHoursValue.innerText = user.wellnessLog.calculateAllTimeAverage('sleep', 'hoursSlept');
  createCharts(user, date);
}

function displayUserInfo(user) {
  displayedUserName.innerText = `${user.name}`;
  const averageStepGoal = userRepo.calculateAverageStepGoal();
  displayedUserStepGoalComparison.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;
  displayedUserStepGoal.innerText = `${user.dailyStepGoal}`;
  displayedUserFriendsList.innerText = `${getFriendNames(user)}`;
}

function greetUser(user, date) {
  greeting.innerText = `Hello, ${user.getFirstName()}!`;
  displayDate.innerText = date;
};

function displayUserRankings(location, user, date, category) {
  location.innerText = `#${activityRepo.getActivityRank(user, date, category)}`;
}

function displayUserData(location, user, date, category, section) {
  location.innerText = user.wellnessLog.getTodaysStat(date, category, section, userRepo.users);
}

function createCharts(user, date) {
  const sleepQuality = user.wellnessLog.getTodaysStat(date, 'sleep', 'sleepQuality');
  const averageSleepQuality = user.wellnessLog.calculateAllTimeAverage('sleep', 'sleepQuality');
  allTimeSleepQualityValue.innerText = `${averageSleepQuality} out  of 5`;
  lastNightsSleepQualityValue.innerText = `${sleepQuality} out  of 5`;
  createSleepDonutChart(user, date, sleepQuality, 'quality', lastNightsSleepQualityChart);
  createSleepDonutChart(user, date, averageSleepQuality, 'average quality', allTimeSleepQualityChart);
  createHydrationChart(user, date);
  createWeekOfSleepChart(user, date);
  createWeekOfActivityChart(user, date);
  createWeekOfHydrationChart(user, date);
  todaysHydrationValue.innerText = `${(user.wellnessLog.getTodaysStat(date, 'hydration', 'numOunces') / 8).toFixed(1)} out of 10 cups`;
}

function getFriendNames(user) {
  const friendNameList = user.friends.map((friendID) => {
    let friend = userRepo.users.find((user) => user.id === friendID);
    return friend.getFirstName();
  });
  return friendNameList.join(', ');
};
