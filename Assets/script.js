let searchForm = document.getElementById("searchForm");
let searchText = document.getElementById("searchText");
let searchList = document.getElementById("searchList");
let cityName = document.getElementById("cityName");
let cityTemp = document.getElementById("cityTemp");
let cityHumidity = document.getElementById("cityHumidity");
let cityWind = document.getElementById("cityWind");
let cityUV = document.getElementById("cityUV");
let cityForecastHeader = document.getElementById("forecastHeader");
let cityForecast = document.getElementById("forecast");
let cityError = document.getElementById("errorMsg")
const key = "73dabd1a8d2803884f5955e9d62f1b8e";
let cityList = [];

// Main Ajax call to openweathermap
weatherAjax = city =>{
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET",

        // Upon Ajax call failure
        error: function(){
            // console.log("error")
            cityError.textContent = "City not found. Please refine your search!"
        }
    })
    .then(function(response){
        // console.log(response);
        
        // Clear any error messages present
        cityError.textContent = "";

        // Add City Name to City List array
        if(!(cityList.includes(response.name))){
            // console.log("new")
            cityList.push(response.name.trim());
            saveHistory();
        }
        // Use City List to populate a Search History
        displayHistory();
        // Seperate Ajax call to get UV index
        uvAjax(response.coord.lat,response.coord.lon)
        // Seperate Ajax call to get forecasts
        forecastAjax(response.coord.lat,response.coord.lon)

        // Response results shown as text for Current Weather
        cityName.innerHTML = ` ${response.name} ${moment().format("(MM/D/Y)")}`;
        response.weather.forEach(element => cityName.innerHTML += `<img src="http://openweathermap.org/img/wn/${element.icon}.png" data-toggle="tooltip" data-placement="right" title="${element.description}">` )
        cityTemp.textContent = ` ${response.main.temp}\xB0C`;
        cityHumidity.textContent = ` ${response.main.humidity}%`;
        cityWind.textContent = ` ${response.wind.speed}m/s`;
    })
}

// Seperate Ajax call to get UV index
uvAjax = (lat,lon)=>{
    const queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET",
        // Upon Ajax call failure
        error: function(){
            // console.log("error")
            cityUV.textContent = "Info not available. Please try again later";
        }
    }).then(function(response){
        // console.log(response.value);
        cityUV.textContent = response.value;
        // Value compared to UV Index and styled accordingly with a tooltip
        if(response.value <=2){
            cityUV.style.backgroundColor = "#3ea72d"
            cityUV.style.color = "white"
            cityUV.setAttribute("title","Low")
        }else if(response.value<=5){
             cityUV.style.backgroundColor = "#fff300"; 
             cityUV.style.color = "black" 
             cityUV.setAttribute("title","Moderate")
        }else if(response.value<=7){
            cityUV.style.backgroundColor = "#f18b00";
            cityUV.style.color = "white"
            cityUV.setAttribute("title","High")
        }else if(response.value<=10){
            cityUV.setAttribute("style", "background-color:#e53210");
            cityUV.style.color = "white"
            cityUV.setAttribute("title","Very High")
        }else{
            cityUV.style.backgroundColor = "#b567a4";
            cityUV.style.color = "white"
            cityUV.setAttribute("title","Extreme")
        }
    })
}

// Ajax call to forecast weather
forecastAjax = (lat,lon) =>{
    const queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely&units=metric&appid=${key}`
    $.ajax({
        url: queryURL,
        method: "GET",
        // Upon Ajax call failure
        error: function(){
            // console.log("error")
            cityForecastHeader.textContent = "Info not available. Please try again later";
        }
    }).then(function(response){
        // console.log(response);
        cityForecastHeader.textContent = "5-Day Forecast"
        // Delete any forecasted weather from previous result
        $("#forecast").empty();
        // Grab response details for up to 5 days. Index 0 is treated as current weather
        for(let i=1; i<6; i++){
            // Create card with details for each day and append it to Forecast section
            cityForecast.innerHTML += `<div class="card details"><span data-toggle="tooltip" data-placement="right" title="${i} Days from Today">${moment.unix(response.daily[i].dt).format("(MM/D/Y)")}</span><br></div>`
            response.daily[i].weather.forEach(element => cityForecast.lastElementChild.innerHTML += `<img class="imgFore" src="http://openweathermap.org/img/wn/${element.icon}@2x.png" data-toggle="tooltip" data-placement="right" title="${element.description}">`)
            cityForecast.lastElementChild.innerHTML += `<br><span data-toggle="tooltip" data-placement="right" title="Temperature in Celsius">Temp: ${((response.daily[i].temp.max+response.daily[i].temp.min)/2).toFixed(2)}\xB0C<br></span>
            <span data-toggle="tooltip" data-placement="right" title="Humidity">Humidity: ${response.daily[i].humidity}%</span>`
        }
    })
}

// Search History visualized
displayHistory = ()=>{
    searchList.innerHTML = "";
    console.log(cityList);
    // Take City List array and create a list item for each and append it to History section
    cityList.forEach((element,index)=>{
        let list = document.createElement("li");
        list.textContent = element;
        list.innerHTML = `${element} <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`
        list.setAttribute("data-index", index)
        list.classList.add("list-group-item");
        searchList.appendChild(list);
    })
}    

// Save City List to localstorage
saveHistory = ()=>{
    localStorage.setItem("list",JSON.stringify(cityList))
}

// Get City List from localstorage and display it for page load
loadHistory = ()=>{
    cityList = JSON.parse(localStorage.getItem("list"));
    if(cityList===null){
        cityList = [];
    }
    displayHistory();
}   

// Event listener for input field and fires on button click or enter or when the form is submitted
searchForm.addEventListener("submit", function(event){
    event.preventDefault();
    // console.log("works")
    weatherAjax(searchText.value.trim());
});

// Event listener for Search History allowing User to search for the city
searchList.addEventListener("click",function(event){
    event.stopPropagation();
    // if(event.target.tagName === "LI"){
    if(event.target.matches("li")){
    $("li").removeClass("selected");
    event.target.classList.add("selected");
    console.log(event.target.childNodes[0].textContent)
    weatherAjax(event.target.childNodes[0].textContent.trim()); 
    searchText.value = event.target.childNodes[0].textContent.trim();
    }else{
        cityList.splice(event.target.parentElement.parentElement.getAttribute("data-index"), 1);
        saveHistory();
        displayHistory();
    }
})

// Run on page load
loadHistory();