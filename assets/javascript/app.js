



var authorization = "https://accounts.spotify.com/authorize/?client_id=fd26699e51ae4236bf113ad5baf74682&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09";
//var queryURL = "https://api.spotify.com/v1/" +
    

$.ajax({
    url: authorization,
    method: "GET"
}).then(function(response) {        
    var results = response.data;
    console.log(results); 
})
