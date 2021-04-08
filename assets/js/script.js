//display current date
var now = moment();
$('#currentDay').text(now.format('dddd Do MMMM, YYYY HH:mm'));

var currentTime = parseInt(now.format('H'));

$(document).ready(function(){

    for (let i = 9; i <= 17; i++) {
        if (i === currentTime) {
            console.log("This is i", i)
            $('#' + i).css("background-color", "#eaaec1");
        } else if (i > currentTime) {
            $('#' + i).css("background-color", "#97d8a1");
        } 
    }

});

$("button").click(function() {
    var userEntry = $(this).siblings(".user-entry").val();
    console.log(userEntry);
});

