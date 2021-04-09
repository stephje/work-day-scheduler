var now = moment();

//function that is invoked when the DOM is safe to manipulate
$(document).ready(function(){

    updateTimeSensitiveFeatures();
    displaySchedule();

});

//function to invoke every 1000ms (1s)
setInterval(updateTimeSensitiveFeatures, 1000)

//Updates date/time and page colours
function updateTimeSensitiveFeatures() {
    displayDateAndTime();
    setColours();
}

//display current date and time
function displayDateAndTime(){
    now = moment();
    $('#currentDay').text(now.format('dddd Do MMMM, YYYY HH:mm a'));
}

//set colour to pink for the current timeslot and green for timeslots in the future
function setColours() {
    //now.format('H') is a string. Use parseInt to convert to a number
    var currentTime = parseInt(now.format('H'));
    for (let i = 9; i <= 17; i++) {
        if (i === currentTime) {
            $('#' + i).css("background-color", "#eaaec1");
        } else if (i > currentTime) {
            $('#' + i).css("background-color", "#97d8a1");
        } else {
            $('#' + i).css("background-color", "#f3f5f7");
        }
    }
}

//If there is a schedule in local storage, get it and parse it into a javascript object
function getSchedule() {
    var storedSchedule = localStorage.getItem("schedule");
    if (storedSchedule) {
        schedule = JSON.parse(storedSchedule);
    }
}

//Display the schedule on the page
function displaySchedule() {
    getSchedule();
    for (let i = 0; i < schedule.length; i++) {
        var scheduleItem = schedule[i];
        var textArea = $('#' + (i + 9));
        if (scheduleItem) {
            var x = scheduleItem.entry;
            textArea.val(x)
        }
    }
}

//create a new array of length 9. If an empty array is created without specifying the length, the splice method will not work as desired
var schedule = new Array(9);

//Function to execute when a save button is clicked - creates new object and splices into schedule array
$("button").click(function() {

    getSchedule();

    //assign content of the clicked button's sibling textarea to a variable
    var userEntry = $(this).siblings(".user-entry").val();

    //assign ID of the clicked button's sibling textarea to a variable
    var idOfUserEntry = $(this).siblings(".user-entry").attr("id");

    //store both variables in an object. idOfUserEntry is a string, so use parseInt to convert it to a number
    var scheduleItem = {
        time: parseInt(idOfUserEntry),
        entry: userEntry
    }

    //splice the created object into the "schedule" array at a specific index
    //index should be the value of "time" (which represents which hour block the content is from) minus 9, such that index 0 = 9AM content and so on
    schedule.splice((scheduleItem.time - 9), 1, scheduleItem);
    
    //convert array into string and store in local storage
    localStorage.setItem("schedule", JSON.stringify(schedule));

});

