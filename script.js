var currentDate,
    time,
    rt,
    total_characters,
    currentDateS,
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
var removed_words = [];
var proper_length = 20;
var pastHeight;
var pastWidth;
var errors = 0;


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
  pastHeight = $("#word-box").height();
  pastWidth = $("#info-box").width();
  update_height();
  $("body").on("keypress", (evt) => {
    if ($("#finish_popup").css("display") == "block") {
      return false;
    }
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
      $("#time-cps").text("Session Time: 60.00");
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

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}



function word_bank_shuffle() {
text = "";
stripped_text = [];
proper_length = ($("#word-box").height()-$("#word-title").height()) / 22;
for (var i = 0; i < proper_length; i++) {
  randInt = randomGenerator();
  if (stripped_text.indexOf(full_bank[randInt]) == -1 || undefined) {
    stripped_text[i] = full_bank[randInt];
    stripped_text_left = stripped_text;
    id_name = "word" + i;
    text += "<span id=\"" + id_name + "\">" + full_bank[randInt] + "</span><br/>";
    if (stripped_text.length >= Math.floor(proper_length)) {
      break;
    }
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
    if (Math.floor(($("#word-box").height()-$("#word-title").height()) / 22)+1 < stripped_text_left.length) {
      console.warn("WARNING: stripped_text_left exceeds maximum length\n\nIf you are seeing this error, it is because of an issue with resolution changes.\n\nReshuffling words to fix.\n\n");
      word_bank_shuffle();
      return;
    }
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
  } else {
    errors += 1;
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
    $("#best").text("Best WPM: " + best_wpm);
    $("#raw").text("Raw WPM: " + current_wpm);
    $("#errors").text("Total Errors: " + errors);
    $("#final").text("Final WPM: " + (current_wpm - (errors*5)));
    document.getElementById("finish_popup").style.display = "block";
  }
}


function update_height() {
  setTimeout(function() {
    if ($("#word-box").height() != pastHeight) {
      word_bank_shuffle();
      pastHeight = $("#word-box").height();
    }
    update_height();
  },100);
}
window.onclick = function(event) {
    if (event.target == document.getElementById("finish_popup")) {
      rt = 0;
        document.getElementById("finish_popup").style.display = "none";
    }
}
