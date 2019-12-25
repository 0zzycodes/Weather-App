let name = document.querySelector(".name");
let date = document.querySelector(".date");
let output = document.querySelector("#output");
let desc = document.querySelector(".desc");
let temp = document.querySelector(".temp");
let hum = document.querySelector(".hum");
let pres = document.querySelector(".pressure");
let oz = document.querySelector(".ozone");
let speed = document.querySelector(".wind-speed");
const todayD = new Date().toLocaleDateString();
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat, long);
    const api = '701c955448e09bde13555965f059341b';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `${proxy}https://api.darksky.net/forecast/${api}/${lat},${long}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('Data', JSON.stringify(data))
      })
  })
}
(function () {
  const getData = JSON.parse(localStorage.getItem('Data'))
  console.log(getData);
  name.innerHTML = getData.timezone.toUpperCase()
  const {
    humidity,
    ozone,
    pressure,
    summary,
    temperature,
    time,
    windSpeed
  } = getData.currently
  desc.innerHTML = summary
  hum.innerHTML = `${humidity * 100}%`
  speed.innerHTML = windSpeed
  oz.innerHTML = ozone
  const tem = (5 / 9) * (temperature - 32)
  temp.innerHTML = `${ tem.toFixed(0) }° <span><i class="wi wi-day-sunny"></i> </span>`
  getData.daily.data.forEach(dayForcast => {
    const {
      icon,
      humidity,
      ozone,
      pressure,
      summary,
      sunriseTime,
      sunsetTime,
      temperatureMax,
      temperatureMin,
      time,
      windSpeed
    } = dayForcast
    // console.log(icon);

    let weatherIcon,
      testIco = "rain"
    if (icon === "clear-day") {
      weatherIcon = `<i class="wi wi-day-sunny"></i>`;
    } else if (icon === "clear-night") {
      weatherIcon = `<i class="wi wi-night-clear"></i>`;
    } else if (icon === "rain") {
      weatherIcon = `<i class="wi wi-rain"></i>`;
    } else if (icon === "snow") {
      weatherIcon = `<i class="wi wi-snow"></i>`;
    } else if (icon === "sleet") {
      weatherIcon = `<i class="wi wi-sleet"></i>`;
    } else if (icon === "wind") {
      weatherIcon = `<i class="wi wi-windy"></i>`;
    } else if (icon === "fog") {
      weatherIcon = `<i class="wi wi-fog"></i>`;
    } else if (icon === "cloudy") {
      weatherIcon = `<i class="wi wi-cloudy"></i>`;
    } else if (icon === "partly-cloudy-day") {
      weatherIcon = `<i class="wi wi-day-cloudy-gusts"></i>`;
    } else if (icon === "partly-cloudy-night") {
      weatherIcon = `<i class="wi wi-night-alt-cloudy"></i>`;
    } else {
      weatherIcon = `<i class="wi wi-day-sunny"></i>`;
    }

    const convertedTime = timeConverter(time),
      convertedMaxTemp = (5 / 9) * (temperatureMax - 32),
      convertedMinTemp = (5 / 9) * (temperatureMin - 32)
    // console.log(dayForcast);
    output.innerHTML += `
    <div class="block details">
    <div class="box">
      <span>${convertedTime.dayName}</span>
      <br />
      <span>${convertedTime.time}</span>
    </div>
    <div class="box strong">
      <span><i class="wi "></i> Conditions: <span class="desc">${summary}</span></span> <br />

      <span><i class="wi "></i> Humidity: <span class="hum">${humidity * 100}%</span> </span>
    </div>
    <div class="box">
      ${weatherIcon}
    </div>
    <div class="box">
      <h6> <span>${convertedMinTemp.toFixed(0)}°</span> - ${convertedMaxTemp.toFixed(0)}°</h6>
    </div>
  </div>
    `

  })
}())

// fetch("https://geoip-db.com/json/")
//   .then(res => res.json())
//   .then(res => {
//     console.log(res.city, res.state);

//     name.innerHTML += `${res.city}, ${res.state}`;
//   });




// CONVERT UNIX TIME STAMP

function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'December'],
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    year = a.getFullYear(),
    month = months[a.getMonth()],
    date = a.getDate(),
    dayName = days[a.getDay()],
    time = date + ' ' + month + ' ' + year;
  return {
    dayName,
    time
  };
}