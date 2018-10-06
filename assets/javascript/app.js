$(document).ready(function () {

  // initialize firebase
  var config = {
    apiKey: "AIzaSyCMKhliavttsLO_AaIEO_nqwZWjgW4TY0M",
    authDomain: "trainscheduler-f4393.firebaseapp.com",
    databaseURL: "https://trainscheduler-f4393.firebaseio.com",
    projectId: "trainscheduler-f4393",
    storageBucket: "",
    messagingSenderId: "511771441479"
  };
  firebase.initializeApp(config);

  // set the var database to firebase
  var database = firebase.database();

  // on click function to grab information input from user
  $("#addTrainBtn").on("click", function () {
    event.preventDefault();
    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#trainTimeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
    var firstTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTime), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("hh:mm");
    var newRow = `
      <tr>
        <td>${trainName}</td>
        <td>${destination}</td>
        <td>${frequency}</td>
        <td>${nextTrainTime}</td>
        <td>${minutesTillTrain}</td>
      </tr>
    `
    console.log(trainName);
    console.log(destination);
    console.log(frequency);

    // append saved data to the table
    $("#trainSchedule").append(newRow);
    // clear the fields for next search
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");

    // send info to the firebase database
    database.ref().set({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      nextTrainTime: nextTrainTime,
      minutesTillTrain: minutesTillTrain,
    })
  })
})