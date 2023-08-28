const searchField = document.querySelector(".searchArea");

const temperatureField = document.querySelector(".temp h1");
const iconField = document.querySelector(".temp span");
const locationField = document.querySelector(".time_location h4");
const dateandTimeField = document.querySelector(".date_time h4");
const conditionField = document.querySelector(".condition h4");
const humidityField = document.querySelector(".humidity h4");

const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let target;

const fetchResults = async (targetLocation) => {
  if (targetLocation == "") {
    alert("you must write something ");
  } else {
    let url = `http://api.weatherapi.com/v1/current.json?key=23fe20adde6e42c999182606232708&q=${targetLocation}&aqi=no`;
    const response = await fetch(url);

    const data = await response.json();

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let icon = data.current.condition.icon;
    let humidity = data.current.humidity;

    updateDetails(temp, locationName, time, condition, icon, humidity);
  }
};

function updateDetails(temp, locationName, time, condition, icon, humidity) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];
  let currentDay = getDayName(new Date(splitDate).getUTCDay());

  temperatureField.innerHTML = `${temp}   <span>&deg;C</span>`;
  locationField.innerText = ` Location :${locationName}`;
  dateandTimeField.innerHTML = ` Date :  ${splitDate}  <br/> Day : ${currentDay}<br/>Time : ${splitTime}`;
  conditionField.innerText = ` Condition : ${condition}`;
  iconField.innerHTML = `<img src="https://${icon}" alt="Weather Icon" class="weather-icon">`;
  humidityField.innerHTML = `Humidity :  ${humidity}  `;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
}

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
