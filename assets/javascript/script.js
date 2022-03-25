


var workHours = 8;
var startOfDay = moment("9:00","h:mm a")


var today = moment().format("MMMM Do YYYY, h:mm:ss a");
$("#currentDay").text(today);


var hourBlocks = $(".container").children('form').children("label").children(".custom-hourBlock");

for (let i = 0; i < hourBlocks.length; i++) {
    
    var currentHour = startOfDay.clone().add(i, "hour")
    console.log(currentHour._d)
    
    $(hourBlocks[i]).text(currentHour.format("h:mm a"));
}
