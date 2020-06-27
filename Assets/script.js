$(document).ready(function(){
    $("#searchBtn").on("click",function(){
        $("result").text("test");
        console.log("test");
    })
   

    // var city = "Toronto"
    // var key = "73dabd1a8d2803884f5955e9d62f1b8e";
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
    
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response){
    //     console.log(response);
    //     $(".result").html("<h1>" + response.name + Date.now)
    //     $(".result").t

    // })

})