


var workHours = 8;
var startOfDay = moment("9:00am","h:mma")

var today = moment().format("MMMM Do YYYY, h:mm:ssa");
$("#currentDay").text(today);

// var todayHour = moment().format("h:mm a")
// console.log(todayHour)


var hourBlocks = $(".container").children('form').children("label").children(".custom-hourBlock");
// console.log(hourBlocks.length);

var textAreas = $(".container").children('form').children("textarea");
// console.log(textAreas.length);



for (let i = 0; i < hourBlocks.length; i++) {
      
    var currentHour = startOfDay.clone().add(i, "hour");
      
    $(hourBlocks[i]).text(currentHour.format("h:mma"));
    
       
    if (moment(currentHour, "hh").isBefore(moment(),"hour")) {
        
        $(textAreas[i]).addClass("past");
    }
    if (moment(currentHour, "hh").isSame(moment(), "hour")) {
        $(textAreas[i]).addClass("present");
        console.log(currentHour.format("hh"));
    } 
    if (moment(currentHour, "hh").isAfter(moment(), "hour")) {
        $(textAreas[i]).addClass("future");
    }
}
