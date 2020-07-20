let searchBtn = document.getElementById("searchBtn");
let searchText = document.getElementById("searchText");
let searchList = document.getElementById("searchList");
let cityName = document.getElementById("cityName");
let cityTemp = document.getElementById("cityTemp");
let cityHumidity = document.getElementById("cityHumidity");
let cityWind = document.getElementById("cityWind");
let cityUV = document.getElementById("cityUV");
let cityForecast = document.getElementById("forecast");
const key = "73dabd1a8d2803884f5955e9d62f1b8e";

weatherAjax = city =>{
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
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
        cityUV.textContent = response.value
    })
}

forecastAjax = (lat,lon) =>{
    const queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely&units=metric&appid=${key}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);
        // let result = [];
        // for(let i=0;i<5;i++){
        //     result.push(response.daily[i]);
        // }
        // console.log(result)
        for(let i=0; i<5; i++){
            cityForecast.innerHTML += `<div class="card details"><span>${moment.unix(response.daily[i].dt).format("(MM/D/Y)")}</span><br></div>`
            response.daily[i].weather.forEach(element => cityForecast.lastElementChild.innerHTML += `<img src="http://openweathermap.org/img/wn/${element.icon}.png">`)
            
            cityForecast.lastElementChild.innerHTML += `<br><span>Temp: ${((response.daily[i].temp.max-response.daily[i].temp.min)/2).toFixed(2)}\xB0C<br></span>
            <span>Humidity: ${response.daily[i].humidity}%</span>`
            
        }
    })
}

addHistory = ()=>{
    let list = document.createElement("li");
    let listText = document.createTextNode(searchText.value);
    list.appendChild(listText);
    list.classList.add("list-group-item");
    searchList.appendChild(list);
}

searchBtn.addEventListener("click", addHistory)
searchBtn.addEventListener("click", function(){weatherAjax(searchText.value)});
// searchBtn.addEventListener("click", function(){forecastAjax(searchText.value)});
