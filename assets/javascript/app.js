$(document).ready(function() {

var config = {
    apiKey: "AIzaSyCMKhliavttsLO_AaIEO_nqwZWjgW4TY0M",
    authDomain: "trainscheduler-f4393.firebaseapp.com",
    databaseURL: "https://trainscheduler-f4393.firebaseio.com",
    projectId: "trainscheduler-f4393",
    storageBucket: "",
    messagingSenderId: "511771441479"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrainBtn").on("click", function() {
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
		var firstTime = moment(firstTrain, "hh:mm").subtract(1, "years")
		var currentTime = moment();
		var diffTime = moment().diff(moment(firstTime), "minutes");
		var tRemainder = diffTime % frequency;
		var minutesTillTrain = frequency - tRemainder;
		var nextTrain = moment().add(minutesTillTrain, "minutes");
		var nextTrainTime = moment(nextTrain).format("hh:mm");
    var newRow = [
    <tr>
      <td>${trainNameInput}</td>
      <td>${destinationInput}</td>
      <td>${frequencyInput}</td>
      <td>${nextTrainTime}</td>
      <td>${minutesTillTrain}</td>
    </tr>
    ]

    $("#trainSchedule").append(newRow);
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#trainTimeInput").val("");
      $("#frequencyInput").val("");

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