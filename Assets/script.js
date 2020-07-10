let searchBtn = document.getElementById("searchBtn")
let searchText = document.getElementById("searchText")


weatherAjax = ()=>{
const key = "73dabd1a8d2803884f5955e9d62f1b8e";
const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchBtn.value + "&appid=" + key;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    $(".result").html("<h1>" + response.name + Date.now)
    $(".result").t

})
}

searchBtn.addEventListener("click", weatherAjax)
