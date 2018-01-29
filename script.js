var currentDate,
    time,
    rt,
    total_characters,
    currentDateS,
    currentDateL,
    currentDateR,
    randInt,
    id_name,
    textBoxData,
    index_to_remove,
    ranlen,
    current_wpm,
    best_wpm;
var timeR = 0;
var remove = false;
var textbox = "";
var clicks = 0;
var timeL = 0;
var currentTop = 0;
var text = "";
var timeS = 0;
var stripped_text = [];
var stripped_text_left = [];
var fullbank = [];
var correct_words = 0;


$(document).ready(function() {
  ranlen = randomAll(3)
  if (ranlen == 0) {
    $('body').css("background-color","#aef99f");
  } else if (ranlen == 1) {
    $('body').css("background-color","#96beff");
  } else if (ranlen == 2) {
    $('body').css("background-color","#e55454");
  }
  var element = document.getElementById("text-box");
  element.spellcheck = false;
  element.focus();
  element.blur();
  currentDate = Date.now();
  currentDateS = Date.now();
  word_bank_shuffle();
  start_loop();
  cps();
  $("#click-box").on("click", function() {
    clicks++;
    currentDateR = Date.now();
  });
  $("body").on("keypress", (evt) => {
    if (evt.which == 32) {
      remove_words();
    }
  });

});


function start_loop() {
  setTimeout(function() {
    if (!($("#text-box").text() === "")) {
      rt = timer();
      $("#wpm").text("WPM: " + (precisionRound((($("#text-box").text().length/5)/rt),2)));
      updateWPM();
      $("#time-cps").text("Session Time: " + (precisionRound(60-session_timer(),2)));
    } else {
      currentDate = Date.now();
      currentDateS = Date.now();
      $("#wpm").text("WPM: ");
      $("#time-cps").text("Session Time: ");
    }
    start_loop();
  },10);
}

function timer() {
  time = (Date.now() - currentDate)/60000
  time = precisionRound(time,2);
  return time;
}

function session_timer() {
  timeS = (Date.now() - currentDateS)/1000
  timeS = precisionRound(timeS,2);
  return timeS;
}

function time_loop() {
  timeL = (Date.now() - currentDateL)/1000;
  timeL = precisionRound(timeL,2);
  return timeL;
}


function cps_reset_time_loop() {
  timeR = (Date.now() - currentDateR)/1000;
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
    $("#wpm").text("WPM: ");
    $("#cps").text("Clicks Per Second: " + precisionRound(clicks/timeL,2));
    $("#top-cps").text("Total Clicks: " + clicks);
    $("#time-cps").text("Session Time: " + precisionRound(timeL, 2));
    timeR = cps_reset_time_loop()
    if (timeR >= 3) {
      clicks = 0;
      $("#time-cps").text("Session Time: ")
      $("#top-cps").text("Total Clicks: ");
    }
    if (currentTop <  precisionRound(clicks/timeL,2)) {
      update_click();
    }
  } else if (clicks === 0){
    currentDateL = Date.now();
    $("#cps").text("Clicks Per Second: ");
  }
  cps();
  }, 10);
}

function update_click() {
  $("#top-cps").text("Total Clicks: " + clicks);
}

function word_bank_shuffle() {
text = "";
for (var i = 0; i < 20; i++) {
  randInt = randomGenerator();
  if (stripped_text.indexOf(full_bank[randInt]) == -1 || undefined) {
    stripped_text[i] = full_bank[randInt];
    stripped_text_left = stripped_text;
    id_name = "word" + i;
    text += "<span id=\"" + id_name + "\">" + full_bank[randInt] + "</span><br/>";
  } else {
    i--;
  }
}
$("#words").html(text);
}

function remove_words() {
  text = "";
  id_name = "";
  textBoxData = $("#text-box").text().split(" ");
  for (var y = 0; y < stripped_text.length; y++) {
      if (stripped_text[y].toLowerCase() == textBoxData[textBoxData.length-1].toLowerCase()) {
        remove = true;
        index_to_remove = y;
    }
      }
  if (remove) {
    correct_words+=1
    text = "";
    stripped_text_left.splice(index_to_remove,1);
    remove = false;
    randInt = randomGenerator();
    while (true) {

      if (stripped_text_left.indexOf(full_bank[randInt]) == -1 || undefined) {
        stripped_text_left[stripped_text_left.length] = full_bank[randInt];
        break;
      } else {
        randInt = randomGenerator();
    }

  }

    for (var p = 0; p < stripped_text_left.length; p++) {
      text += "<span id=\"word" + p + "\">" + stripped_text_left[p] + "</span><br/>";
    }
    $("#words").html(text);
  }
}

function randomGenerator() {
  return Math.floor(Math.random() * full_bank.length);
}
function randomAll(len) {
  return Math.floor(Math.random() * len);
}

function updateWPM() {
  current_wpm = precisionRound(($("#text-box").text().length/5)/rt,2);
  if (rt*60 >= 5) {
    if (current_wpm >= best_wpm || best_wpm === undefined) {
      best_wpm = current_wpm;
      $("#characters").text("Best WPM: " + best_wpm);
    }
  }
  if (rt >= 1) {
    $("#text-box").text("");
    alert("Congrats! \nYou finished with " + current_wpm + " wpm\nAt your best, you typed " + best_wpm + " wpm");
  }
}
