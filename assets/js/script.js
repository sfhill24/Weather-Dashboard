//1. User search for city: DONE
//a. City is saved to local storage: DONE
//b. Cities searched are displayed as buttons: DONE
//2. Current day forcast is displayed with city name, date, temp, wind, humidity DONE
//3. Display 5 Day forcast for current city: DONE
//4. Display 5 day forcast for each city searced and saved (use loop): DONE
//5: Display Icon: DONE
//6. Turn recent searches into buttons: DONE
//7. Clear search textbox after each search: DONE
//8. Style Page
//9. Code clean up
//10. Display City Name: DONE
//11. Read Me

var currentCity = document.querySelector("#currentCity");
var currentDate = document.querySelector("#currentDate");
var icon = document.querySelector("#icon");
var temp = document.getElementById("temperature"); //fix
var wind = document.querySelector("#windSpeed");
var humidity = document.querySelector("#humidity");
var futureDate = document.querySelector("#futureDate");
var futureTemp = document.querySelector("#futureTemperature");
var futureWind = document.querySelector("#futureWindSpeed");
var futureHumidity = document.querySelector("#futureHumidity");
var futureCast = document.querySelector("#FiveDayForecast");

//Get city from user and save to local storage
var cityInput = document.querySelector("#city");
var citySearch = document.querySelector("#citySearchBtn");

cityInput.value = localStorage.getItem("cityName");

citySearch.addEventListener("click", function (event) {
  event.preventDefault();
  var cityName = cityInput.value.trim();

  if (cityName == null || cityName == "") {
    return null;
  }

  localStorage.setItem("cityName", cityName);

  //Display searched cities
  var currentCityDiv = document.createElement("div");
  var currentCityButton = document.createElement("button");
  currentCityButton.className = "city-btn btn btn-secondary";
  currentCityButton.textContent = cityName;
  currentCityDiv.appendChild(currentCityButton);
  currentCityButton.addEventListener("click", function (event) {
    event.preventDefault();
    calculateWeather(cityName);
  });

  var searchedCity = document.querySelector("#searchedCities");
  searchedCity.appendChild(currentCityDiv);

  calculateWeather(cityName);

  //clear search button
  cityInput.value = null;
});

//Call to API
function calculateWeather(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=7bc26c835db2d1e9d0b38760855c189a`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      currentCity.innerHTML = data.city.name;
      currentDate.innerHTML = moment
        .unix(data.list[0].dt)
        .format("MMM D, YYYY");
      temp.innerHTML = convertFahrenheit(data.list[0].main.temp);
      icon.innerHTML = `<img src= "http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" class="mainIcon" alt="icon">`;
      wind.innerHTML = data.list[0].wind.speed;
      humidity.innerHTML = data.list[0].main.humidity;

      var noonWeatherData = data.list.filter((x) =>
        x.dt_txt.includes("18:00:00")
      );

      futureCast.innerHTML = null;

      // filter down to 5 records (time)
      for (let i = 0; i < noonWeatherData.length; i++) {
        var cardDiv = document.createElement("div");
        cardDiv.className = "card text-bg-dark mb-3 cardBody";

        var futureDate = document.createElement("span");
        futureDate.textContent = moment
          .unix(noonWeatherData[i].dt)
          .format("MMM D, YYYY");
        cardDiv.append(futureDate);

        var futureTemp = document.createElement("p");
        futureTemp.innerHTML = `${convertFahrenheit(
          noonWeatherData[i].main.temp
        )}<span>&#8457;</span>`;
        cardDiv.append(futureTemp);
        console.log(convertFahrenheit(noonWeatherData[0].main.temp));

        var futureIconPic = document.createElement("p");
        futureIconPic.innerHTML = `<img src= "http://openweathermap.org/img/wn/${noonWeatherData[i].weather[0].icon}@2x.png"  alt="icon">`;
        cardDiv.append(futureIconPic);

        var futureWind = document.createElement("p");
        futureWind.textContent = noonWeatherData[i].wind.speed + " MPH";
        cardDiv.append(futureWind);

        var futureHumidity = document.createElement("p");
        futureHumidity.textContent = noonWeatherData[i].main.humidity + "%";
        cardDiv.append(futureHumidity);

        futureCast.appendChild(cardDiv);
      }
    });
}

//Function to convert temp from kelvin to fahrenheit
function convertFahrenheit(kelvin) {
  var fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
  return fahrenheit.toFixed();
}
