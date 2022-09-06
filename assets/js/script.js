//1. User search for city
    //a. City is saved to local storage: DONE
    //b. Cities searched are displayed as buttons
//2. Current day forcast is displayed with city name, date, temp, wind, humidity, & UV Index
//3. Display 5 Day forcast for current city
//4. Display 5 day forcast for each city searced and saved (use loop)



//var username = document.querySelector("#username");
//username.addEventListener("click", function() {
  //  alert("")
//})

//Save city to local storage
var cityInput = document.querySelector("#city");
var citySearch = document.querySelector("#citySearchBtn");


cityInput.value = localStorage.getItem("cityName");

citySearch.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("cityName", cityInput.value.trim());

//Display searched cities
stuff = document.createElement("div");
stuff.innerHTML = citySearch.value;

var list = document.querySelector("#searchedCities");
list.appendChild(stuff);

})








