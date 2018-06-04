  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB8OV4TyFEjIy3hIFgA8ol7RIHb7KTvt8U",
    authDomain: "train-schedule-2e17f.firebaseapp.com",
    databaseURL: "https://train-schedule-2e17f.firebaseio.com",
    storageBucket: "train-schedule-2e17f.appspot.com",
   
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  

  $("#add-train-btn").on("click", function(event){
    event.preventDefault();
    var name = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var trainFirst = $("#start-input").val().trim();
    var freq = $("#rate-input").val().trim();

    
    
    
    
    
    
    
    
    
    
    
    
    var newTrain = {
        train: name,
        destination: dest,
        firstTime: trainFirst,
        frequency: freq
  
  
      };

      

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    var trainFirstConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    console.log(trainFirstConverted); 



    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
//even being used ^^^
    var currentTime = moment();
      console.log(currentTime);
      console.log("CURRENT TIME: " + moment(trainFirstConverted).format("hh:mm"));
    var diffTime = moment().diff(moment(trainFirstConverted),"minutes");
      console.log("DIFFERENCE IN TIME:  " + diffTime);
    var timeRemain = diffTime % freq;
      console.log(timeRemain);
    var timeMinTillTrain = freq - timeRemain;
      console.log("MINUTES TILL TRAIN:  " + timeMinTillTrain);
    var nextTrain = moment().add(timeMinTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      //is it being used^^^
  })


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var name = childSnapshot.val().train;
    var dest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTime;
    var freq = childSnapshot.val().frequency;


    var trainFirstConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
      console.log(trainFirstConverted); 
    var currentTime = moment();
      console.log(currentTime.format("hh:mm"));
      console.log("CURRENT TIME: " + moment(trainFirstConverted).format("hh:mm"));
    var diffTime = moment().diff(moment(trainFirstConverted),"minutes");
      console.log("DIFFERENCE IN TIME:  " + diffTime);
    var timeRemain = diffTime % freq;
      console.log(timeRemain);
    var timeMinTillTrain = freq - timeRemain;
      console.log("MINUTES TILL TRAIN:  " + timeMinTillTrain);
    var nextTrain = moment().add(timeMinTillTrain, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm");

    var trainFirstPretty = moment.unix(trainFirst).format("HH:mm a");
    $("#train-table > tbody").append("<tr id='"+childSnapshot.key+"'><td>" + name + "</td><td>" + dest + "</td><td>" +
    freq + "</td><td>" + arrivalTime + "</td><td>" + timeMinTillTrain + "</td></tr>");
    



    var timer = setInterval(tableUpdate, moment.duration(1, "minutes"));
    function tableUpdate(){
       
        var trainFirstConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
      console.log(trainFirstConverted); 
    var currentTime = moment();
      console.log(currentTime.format("hh:mm"));
      console.log("CURRENT TIME: " + moment(trainFirstConverted).format("hh:mm"));
    var diffTime = moment().diff(moment(trainFirstConverted),"minutes");
      console.log("DIFFERENCE IN TIME:  " + diffTime);
    var timeRemain = diffTime % freq;
      console.log(timeRemain);
    var timeMinTillTrain = freq - timeRemain;
      console.log("MINUTES TILL TRAIN:  " + timeMinTillTrain);
    var nextTrain = moment().add(timeMinTillTrain, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm");

    var trainFirstPretty = moment.unix(trainFirst).format("HH:mm a");

        
        $("#"+childSnapshot.key).replaceWith("<tr id='"+childSnapshot.key+"'><td>" + name + "</td><td>" + dest + "</td><td>" +
    freq + "</td><td>" + arrivalTime + "</td><td>" + timeMinTillTrain + "</td></tr>");
    }
    
 

  
})
function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}  


    
   
  