//display current date
var now = moment();

function displayDateAndTime(){
    now = moment();
    $('#currentDay').text(now.format('dddd Do MMMM, YYYY HH:mm a'));
}

//update time every 1000ms (1s)
setInterval(displayDateAndTime, 1000)

//now.format('H') is a string. Use parseInt to convert to a number
var currentTime = parseInt(now.format('H'));

//function to run only when the DOM is safe to manipulate
$(document).ready(function(){

    displayDateAndTime();
    displaySchedule();

    //set colour to pink for the current timeslot and green for timeslots in the future
    for (let i = 9; i <= 17; i++) {
        if (i === currentTime) {
            $('#' + i).css("background-color", "#eaaec1");
        } else if (i > currentTime) {
            $('#' + i).css("background-color", "#97d8a1");
        } 
    }

});

//create a new array of length 9
//if you create an empty array without specifying the length, splice doesn't work properly
var schedule = new Array(9);

//when a save button is clicked, append 
$("button").click(function() {

    getSchedule();

    //assign the value of the clicked button's silbing textarea element (identified by class) to a variable
    var userEntry = $(this).siblings(".user-entry").val();

    //assign the id of the button's sibling textarea element to a variable
    var idOfUserEntry = $(this).siblings(".user-entry").attr("id");

    //store both variables in an object
    //idOfUserEntry is a string, so use parseInt to convert it to a number
    var scheduleItem = {
        time: parseInt(idOfUserEntry),
        entry: userEntry 
    }

    //splice the created into the array called schedule at the specific index
    // index should be the value of "time" (which represents which hour block the content is from) minus 9, such that index 0 = 9AM content and so on
    schedule.splice((scheduleItem.time - 9), 1, scheduleItem);
    
    //convert array into string and store in local storage
    localStorage.setItem("schedule", JSON.stringify(schedule));

});

function getSchedule() {
    var storedSchedule = localStorage.getItem("schedule");
    if (storedSchedule !== null) {
    schedule = JSON.parse(storedSchedule);
    }
}

function displaySchedule() {
    getSchedule();
    console.log(schedule);
    for (let i = 0; i < schedule.length; i++) {
        var scheduleItem = schedule[i];
        console.log(scheduleItem);
    }
}