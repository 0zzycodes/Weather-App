if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function (position) {

    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat, long);
    const api = 'db4ee6f10dae0094dcb2b28afdd951f2';
    fetch(`https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=san%20francisco%252Cus&lat=${lat}&lon=${long}&cnt=10&units=metric%20or%20imperial`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": `${api}`
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  })
}