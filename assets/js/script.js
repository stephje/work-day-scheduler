//display current date
var now = moment();
$('#currentDay').text(now.format('dddd Do MMMM, YYYY HH:mm'));

// var currentTime = now.format('H')
var currentTime = 9;

$(document).ready(function(){

    for (let i = 9; i <= 17; i++) {
        if (i === currentTime) {
            $(`#${i}-input`).css("background-color","red");
        } else if (i > currentTime) {
            $(`#${i}-input`).css("background-color","green");
        } 
    }

});

$("button").click(function() {
    var userEntry = $(this).siblings(".user-entry").val();
    console.log(userEntry);
});

