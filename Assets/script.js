$(document).ready(function(){
    $("#searchBtn").on("click",function(){
        $("result").text("test");
        console.log("test");
    })
   
    // function loadJSON(callback) {   

    //     var xobj = new XMLHttpRequest();
    //         xobj.overrideMimeType("application/json");
    //     xobj.open('GET', '../../../city.list.json', true); // Replace 'my_data' with the path to your file
    //     xobj.onreadystatechange = function () {
    //           if (xobj.readyState == 4 && xobj.status == "200") {
    //             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
    //             callback(xobj.responseText);
    //           }
    //     };
    //     xobj.send(null);  
    //  }

    //  function init() {
    //     loadJSON(function(response) {
    //      // Parse JSON string into object
    //        var actual_JSON = JSON.parse(response);
    //        console.log(actual_JSON);
    //     });
    //     }

    // init();

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