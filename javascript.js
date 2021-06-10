

let allWeatherData = [];
async function getData(city) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3f666231b0c740d28a1204333210105&q=${city}&days=3`);
    let responseData = await response.json();
    let weatherDay1 = {
        dayName: getDayName(responseData.forecast.forecastday[0].date),
        date: getNumbersOfMonth(responseData.forecast.forecastday[0].date) + " " + getMonthName(responseData.forecast.forecastday[0].date),
        name: responseData.location.name,
        temp: responseData.current.temp_c,
        desc: responseData.current.condition.text,
        currentState: responseData.current.condition.icon,
        humidity: responseData.current.humidity,
        windSpeed: responseData.current.wind_kph,
        windDir: responseData.current.wind_dir
    };
    let weatherDay2 = {
        dayName: getDayName(responseData.forecast.forecastday[1].date),
        icon: responseData.forecast.forecastday[1].day.condition.icon,
        maxTemp: responseData.forecast.forecastday[1].day.maxtemp_c,
        minTemp: responseData.forecast.forecastday[1].day.mintemp_c,
        disc: responseData.forecast.forecastday[1].day.condition.text,
    }
    let weatherDay3 = {
        dayName: getDayName(responseData.forecast.forecastday[2].date),
        icon: responseData.forecast.forecastday[2].day.condition.icon,
        maxTemp: responseData.forecast.forecastday[2].day.maxtemp_c,
        minTemp: responseData.forecast.forecastday[2].day.mintemp_c,
        disc: responseData.forecast.forecastday[2].day.condition.text,
    }
    allWeatherData.push(weatherDay1);
    allWeatherData.push(weatherDay2);
    allWeatherData.push(weatherDay3);
    displayWeather();
}
getData("cairo");

function getDayName(date) {
    let theDate = new Date(date);
    let day = theDate.getDay();
    let dayName = " ";
    switch (day) {
        case 0:
            dayName = "Sunday";
            break;
        case 1:
            dayName = "Monday";
            break;
        case 2:
            dayName = "Tuesday";
            break;
        case 3:
            dayName = "Wednesday";
            break;
        case 4:
            dayName = "Thursday";
            break;
        case 5:
            dayName = "Friday";
            break;
        case 6:
            dayName = "Saturday";
            break;
    }
    return dayName;
}

function getNumbersOfMonth(date){
    let theDate=new Date(date);
    let Numbers=theDate.getDate();
    return Numbers;
}
function getMonthName(date){
    const namesOfMonth=["january","February",'March',"April","May","June","July","August","September","October","November","December"];
let theDate=new Date(date);
let month=theDate.getMonth();
return namesOfMonth[month];

}
let search=document.getElementById("search");
search.addEventListener("keyup",function(){
if(search.value.length>=3){
    getData(search.value);
}
});
let searchButton=document.getElementById("searchButton");
searchButton.addEventListener("click",function(){
    if(search.value.length>=3){
        getData(search.value);
}
})

function displayWeather(){
    let cartoona=``;
cartoona=`    <div class=" col-md-4 weather-content1 p-0">
<div class="weather-today">
  <div class="header-caption d-flex justify-content-between align-items-center ">
    <div class="day">${allWeatherData[0].dayName}</div>
    <div class="date">${allWeatherData[0].date}</div>
  </div>
  <div class="py-4 pl-3">
    <h4>${allWeatherData[0].name}</h4>
    <div class="d-flex justify-content-between align-items-center text-white">
      <div class="degree py-3">
        <h2>${allWeatherData[0].temp}<sup>o</sup>c</h2>
      </div>
      <div class="icon-today">
        <img src="https:${allWeatherData[0].currentState}" alt="">
      </div>
    </div>
    <div class="custom mb-3">${allWeatherData[0].desc}</div>
    <span class="pr-4"><img class="pr-2" src="images/icon-umberella.png" alt="">${allWeatherData[0].humidity}%</span>
    <span class="pr-4"><img class="pr-2" src="images/icon-wind.png" alt="">${allWeatherData[0].windSpeed}km/h</span>
    <span><img class="pr-2" src="images/icon-compass.png" alt="">${allWeatherData[0].windDir}</span>
  </div>
</div>
</div>
<div class=" col-md-4 weather-content2 p-0">
<div class="weather-tomorrow text-white">
  <div class="text-center header-caption ">
    <div class="day">${allWeatherData[1].dayName}</div>
  </div>
  <div class="weather-data pt-3 text-center">
    <div class="icon-tomorrow">
      <img src="https:${allWeatherData[1].icon}" alt="">
    </div>
    <div class="degree2">
      <h2>${allWeatherData[1].maxTemp}<sup>o</sup>c</h2>
    </div>
    <p class="pt-0">${allWeatherData[1].minTemp}<sup>o</sup></p>
  </div>
  <div class="custom text-center">${allWeatherData[1].disc}</div>
</div>
</div>
<div class=" col-md-4 weather-content3 p-0">
<div class="weather-tomorrow text-white">
  <div class="text-center header-caption ">
    <div class="day">${allWeatherData[2].dayName}</div>
  </div>
  <div class="weather-data pt-3 text-center">
    <div class="icon-tomorrow">
      <img src="https:${allWeatherData[2].icon}" alt="">
    </div>
    <div class="degree2">
      <h2>${allWeatherData[2].maxTemp}<sup>o</sup>c</h2>
    </div>
    <p class="pt-0">${allWeatherData[2].minTemp}<sup>o</sup></p>
  </div>
  <div class="custom text-center">${allWeatherData[2].disc}</div>
</div>
</div>`

document.getElementById("contain").innerHTML=cartoona;
allWeatherData.length=0;
}


