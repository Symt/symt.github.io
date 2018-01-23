var currentDate,
    pastDate,
    time,
    rt,
    total_characters,
    currentDateL,
    pastDateL,
    pastDateR,
    currentDateR;
var timeR = 0;
var textbox = "";
var clicks = 0;
var timeL = 0;
$(document).ready(function() {
  currentDate = Date.now();
  start_loop();
  cps();
  $("#click-box").on("click", function() {
    clicks++;
    currentDateR = Date.now();
  });

});


function start_loop() {
  setTimeout(function() {
    if (!($("#text-box").text() === "")) {
      rt = timer();
      $("#wpm").text("WPM: " + (precisionRound(($("#text-box").text().length/5)/rt,2)));
    } else {
      currentDate = Date.now();
    }
    start_loop();
  },10);
}

function timer() {
  time = (Date.now() - currentDate)/60000
  pastDate = Date.now();
  time = precisionRound(time,2);
  return time;
}

function time_loop() {
  timeL = (Date.now() - currentDateL)/1000;
  pastDateL = Date.now();
  timeL = precisionRound(timeL,2);
  return timeL;
}

function cps_reset_time_loop() {
  timeR = (Date.now() - currentDateR)/1000;
  pastDateR = Date.now();
  timeR = precisionRound(timeR,2);
  return timeR;
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}


function cps() {
  setTimeout(function() {
  timeL = time_loop();
  if (clicks >= 1) {
    $("#text-box").text("");
    $("#cps").text("Clicks Per Second: " + precisionRound(clicks/timeL,2));
    timeR = cps_reset_time_loop()
    if (timeR >= 5) {
      clicks = 0;
    }
  } else if (clicks === 0){
    currentDateL = Date.now();
    $("#cps").text("Clicks Per Second: ");
  }
  cps();
  }, 10);
}
