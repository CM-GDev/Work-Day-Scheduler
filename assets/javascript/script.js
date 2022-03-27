
var startOfDay = moment("9:00am","h:mma")

let renderClock = function() {
  var today = moment().format("MMMM Do YYYY, h:mm:ssa");

    $("#currentDay").text(today);  
}


var allForms = $(".container").children('form');

var textAreas = $(".container").children('form').children("textarea");


var hourBlocks = $(".container").children('form').children("label").children(".custom-hourBlock");



for (let i = 0; i < hourBlocks.length; i++) {
      
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

function saveToLocalStorage(event) {
    event.preventDefault();
    var textAreasSavedEl = [];
    
    allTextAreas = $("textarea[name='inputEvent']")
    console.log(allTextAreas[0].value)

    allTextAreas.each(function(){
        textAreasSavedEl.push(this.value)
        console.log(textAreasSavedEl)
        console.log(typeof(textAreasSavedEl))
    })

    localStorage.setItem("events", JSON.stringify(textAreasSavedEl))
}

function renderLastEvents(){
    var lastEvents = JSON.parse(localStorage.getItem("events"))
 console.log(lastEvents);
   let allTextAreas = $("textarea[name='inputEvent']")
 
    for(let i=0; i < lastEvents.length; i++){
        allTextAreas[i].value = lastEvents[i];
    }

}

function init() {
    renderLastEvents();
};

init();
renderClock();
setInterval(renderClock,1000);

allForms.on("submit", saveToLocalStorage);