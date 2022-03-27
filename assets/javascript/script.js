// Establishing global variables

var startOfDay = moment("9:00am","h:mma")
var allForms = $(".container").children('form');
var textAreas = $(".container").children('form').children("textarea");
var hourBlocks = $(".container").children('form').children("label").children(".custom-hourBlock");

// Establishing current (live) date and time using moment(). It's in a function because later in the code a "setInterval" is established
let renderClock = function() {
    var today = moment().format("MMMM Do YYYY, h:mm:ssa");
    $("#currentDay").text(today);  
}

// Setting background color for each hour block depends on if hour block is past, present or future of current (live) momenent() hour
for (let i = 0; i < hourBlocks.length; i++) {
    // Using this for loop to also populate scheduler with hours in hour blocks  
    var currentHour = startOfDay.clone().add(i, "hour");
      
    $(hourBlocks[i]).text(currentHour.format("h:mma"));
    
    if (moment(currentHour, "hh").isBefore(moment(),"hour")) {
        $(textAreas[i]).addClass("past");
    }
    if (moment(currentHour, "hh").isSame(moment(), "hour")) {
        $(textAreas[i]).addClass("present");
    } 
    if (moment(currentHour, "hh").isAfter(moment(), "hour")) {
        $(textAreas[i]).addClass("future");
    }
}

// Function for saving input events to local storage when user clicks on a save button
function saveToLocalStorage(event) {
    event.preventDefault();
    var textAreasSavedEl = [];
    
    allTextAreas = $("textarea[name='inputEvent']")
    // Collecting any input events from user on scheduler and saving them to textAreasSavedEl
    allTextAreas.each(function(){
        textAreasSavedEl.push(this.value)
    })
    // Saving to local storage with JSON.stringify
    localStorage.setItem("events", JSON.stringify(textAreasSavedEl))
}

// Function for populating scheduler at page load with any previous saved events
function renderLastEvents(){
    // calling saved data from local storage
    var lastEvents = JSON.parse(localStorage.getItem("events"))
    console.log(lastEvents);
     let allTextAreas = $("textarea[name='inputEvent']")
    // Using for loop to put saved events back to scheduler
    if (lastEvents == null){
        return
    } else{
        for(let i=0; i < lastEvents.length; i++){
        allTextAreas[i].value = lastEvents[i];
        };
    }
};

// Calling these functions at initial page load and setting a time interval of 1sec for moment() dynamically update on web page
renderClock();
setInterval(renderClock,1000);
renderLastEvents();

// Setting a event lister when user saves events
allForms.on("submit", saveToLocalStorage);