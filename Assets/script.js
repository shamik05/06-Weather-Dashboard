let searchForm = document.getElementById("searchForm");
let searchText = document.getElementById("searchText");
let searchList = document.getElementById("searchList");
let cityName = document.getElementById("cityName");
let cityTemp = document.getElementById("cityTemp");
let cityHumidity = document.getElementById("cityHumidity");
let cityWind = document.getElementById("cityWind");
let cityUV = document.getElementById("cityUV");
let cityForecast = document.getElementById("forecast");
const key = "73dabd1a8d2803884f5955e9d62f1b8e";
let cityList = [];

weatherAjax = city =>{
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function(){
            console.log("error")
        }
    })
    .then(function(response){
        // console.log(response);

        displayHistory();
        uvAjax(response.coord.lat,response.coord.lon)
        forecastAjax(response.coord.lat,response.coord.lon)
        cityName.innerHTML = ` ${response.name} ${moment().format("(MM/D/Y)")}`;
        response.weather.forEach(element => cityName.innerHTML += `<img src="http://openweathermap.org/img/wn/${element.icon}.png">` )
        cityTemp.textContent = ` ${response.main.temp}\xB0C`;
        cityHumidity.textContent = ` ${response.main.humidity}%`;
        cityWind.textContent = ` ${response.wind.speed}m/s`;
    })
}

uvAjax = (lat,lon)=>{
    const queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response.value);
        cityUV.textContent = response.value;
        if(response.value <=2){
            cityUV.style.backgroundColor = "#3ea72d"
        }else if(response.value<=5){
             cityUV.style.backgroundColor = "#fff300";  
        }else if(response.value<=7){
            cityUV.style.backgroundColor = "#f18b00";
        }else if(response.value<=10){
            cityUV.setAttribute("style", "background-color:#e53210");
        }else{
            cityUV.style.backgroundColor = "#b567a4";
        }
    })
}

forecastAjax = (lat,lon) =>{
    const queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely&units=metric&appid=${key}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);
        $("#forecast").empty();
        for(let i=1; i<7; i++){
            cityForecast.innerHTML += `<div class="card details"><span>${moment.unix(response.daily[i].dt).format("(MM/D/Y)")}</span><br></div>`
            response.daily[i].weather.forEach(element => cityForecast.lastElementChild.innerHTML += `<img src="http://openweathermap.org/img/wn/${element.icon}.png">`)
            cityForecast.lastElementChild.innerHTML += `<br><span>Temp: ${((response.daily[i].temp.max+response.daily[i].temp.min)/2).toFixed(2)}\xB0C<br></span>
            <span>Humidity: ${response.daily[i].humidity}%</span>`
        }
    })
}

displayHistory = ()=>{
    searchList.innerHTML = "";
    cityList.forEach(element=>{
        let list = document.createElement("li");
        list.textContent = element;
        list.classList.add("list-group-item");
        searchList.appendChild(list);
    })
    console.log(cityList);
}    

saveHistory = ()=>{
    localStorage.setItem("list",JSON.stringify(cityList))
}

loadHistory = ()=>{
    cityList = JSON.parse(localStorage.getItem("list"));
    if(cityList !== null){
        displayHistory();
    }
    console.log(cityList)
}

searchForm.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("works")
    cityList.push(searchText.value.trim());
    saveHistory();
    weatherAjax(searchText.value.trim());
});

// loadHistory();
// console.log(cityList);