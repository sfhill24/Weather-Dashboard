//1. User search for city
//a. City is saved to local storage: DONE
//b. Cities searched are displayed as buttons: DONE
//2. Current day forcast is displayed with city name, date, temp, wind, humidity DONE
    //a. Display current UV Index and color change for favorable, moderate, or severe
//3. Display 5 Day forcast for current city
//4. Display 5 day forcast for each city searced and saved (use loop)

var currentCity = document.querySelector("#currentCity");
var temp = document.querySelector("#temperature");
var wind = document.querySelector("#windSpeed");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uvIndex");


//Get city from user and save to local storage
var cityInput = document.querySelector("#city");
var citySearch = document.querySelector("#citySearchBtn");

cityInput.value = localStorage.getItem("cityName");

citySearch.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.setItem("cityName", cityInput.value.trim());

  //Display searched cities
  currentCityButton = document.createElement("div");
  currentCityButton.innerHTML = "<button>" + cityInput.value + "</button>";

  var searchedCity = document.querySelector("#searchedCities");
  searchedCity.appendChild(currentCityButton);

  //Call to API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=cd53370402605bd4a1dcd1a71d3f1832`)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (data) {

      temp.innerHTML = convertFahrenheit(data.main.temp);
      humidity.innerHTML = data.main.humidity;
      wind.innerHTML = data.wind.speed;
      //uvIndex.innerHTML = data.uvIndex
    });
});

//Function to convert temp from kelvin to fahrenheit
function convertFahrenheit(kelvin) {

  var fahrenheit = ((kelvin - 273.15) * 9 / 5 + 32);
  return fahrenheit.toFixed()

}









