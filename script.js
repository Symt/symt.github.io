var currentDate,
    time,
    rt,
    total_characters,
    currentDateL,
    currentDateW,
    currentDateR,
    randInt;
var timeR = 0;
var timeW = 0;
var textbox = "";
var clicks = 0;
var timeL = 0;
var currentTop = 0;
var text = "";

// WORD BANKS
var word_bank = ['the', 'of', 'to', 'and', 'a', 'in', 'is', 'it', 'you', 'that', 'he', 'was', 'for', 'on', 'are', 'with', 'as', 'I', 'his']
var word_bank2 = ['they', 'be', 'at', 'one', 'have', 'this', 'from', 'or', 'had', 'by', 'hot', 'word', 'but', 'what', 'some', 'we', 'can', 'out', 'other']
var word_bank3 = ['were', 'all', 'there', 'when', 'up', 'use', 'your', 'how', 'said', 'an', 'each', 'she', 'which', 'do', 'their', 'time', 'if', 'will', 'way']
var word_bank4 = ['about', 'many', 'then', 'them', 'write', 'would', 'like', 'so', 'these', 'her', 'long', 'make', 'thing', 'see', 'him', 'two', 'has', 'look', 'more']
var word_bank5 = ['day', 'could', 'go', 'come', 'did', 'number', 'sound', 'no', 'most', 'people', 'my', 'over', 'know', 'water', 'than', 'call', 'first', 'who', 'may']
var word_bank6 = ['down', 'side', 'been', 'now', 'find', 'any', 'new', 'work', 'part', 'take', 'get', 'place', 'made', 'live', 'where', 'after', 'back', 'little', 'only']
var word_bank7 = ['round', 'man', 'year', 'came', 'show', 'every', 'good', 'me', 'give', 'our', 'under', 'name', 'very', 'through', 'just', 'form', 'sentence', 'great', 'think']
var word_bank8 = ['say', 'help', 'low', 'line', 'differ', 'turn', 'cause', 'much', 'mean', 'before', 'move', 'right', 'boy', 'old', 'too', 'same', 'tell', 'does', 'set']
var word_bank9 = ['three', 'want', 'air', 'well', 'also', 'play', 'small', 'end', 'put', 'home', 'read', 'hand', 'port', 'large', 'spell', 'add', 'even', 'land', 'here']
var word_bank10 = ['must', 'big', 'high', 'such', 'follow', 'act', 'why', 'ask', 'men', 'change', 'went', 'light', 'kind', 'off', 'need', 'house', 'picture', 'try', 'us']
var word_bank11 = ['again', 'animal', 'point', 'mother', 'world', 'near', 'build', 'self', 'earth', 'father', 'head', 'stand', 'own', 'page', 'should', 'country', 'found', 'answer', 'school']
var word_bank12 = ['grow', 'study', 'still', 'learn', 'plant', 'cover', 'food', 'sun', 'four', 'between', 'state', 'keep', 'eye', 'never', 'last', 'let', 'thought', 'city', 'tree']
var word_bank13 = ['cross', 'farm', 'hard', 'start', 'might', 'story', 'saw', 'far', 'sea', 'draw', 'left', 'late', 'run', 'don\'t', 'while', 'press', 'close', 'night', 'real']
var word_bank14 = ['life', 'few', 'north', 'open', 'seem', 'together', 'next', 'white', 'children', 'begin', 'got', 'walk', 'example', 'ease', 'paper', 'group', 'always', 'music', 'those']
var word_bank15 = ['both', 'mark', 'often', 'letter', 'until', 'mile', 'river', 'car', 'feet', 'care', 'second', 'book', 'carry', 'took', 'science', 'eat', 'room', 'friend', 'began']
var word_bank16 = ['idea', 'fish', 'mountain', 'stop', 'once', 'base', 'hear', 'horse', 'cut', 'sure', 'watch', 'color', 'face', 'wood', 'main', 'enough', 'plain', 'girl', 'usual']
var word_bank17 = ['young', 'ready', 'above', 'ever', 'red', 'list', 'though', 'feel', 'talk', 'bird', 'soon', 'body', 'dog', 'family', 'direct', 'pose', 'leave', 'song', 'measure']
var word_bank18 = ['door', 'product', 'black', 'short', 'numeral', 'class', 'wind', 'question', 'happen', 'complete', 'ship', 'area', 'half', 'rock', 'order', 'fire', 'south', 'problem', 'piece']
var word_bank19 = ['told', 'knew', 'pass', 'since', 'top', 'whole', 'king', 'space', 'heard', 'best', 'hour', 'better', 'true', 'during', 'hundred', 'five', 'remember', 'step', 'early']
var word_bank20 = ['hold', 'west', 'ground', 'interest', 'reach', 'fast', 'verb', 'sing', 'listen', 'six', 'table', 'travel', 'less', 'morning', 'ten', 'simple', 'several', 'vowel', 'toward']
var word_bank21 = ['war', 'lay', 'against', 'pattern', 'slow', 'center', 'love', 'person', 'money', 'serve', 'appear', 'road', 'map', 'rain', 'rule', 'govern', 'pull', 'cold', 'notice']
var word_bank22 = ['voice', 'unit', 'power', 'town', 'fine', 'certain', 'fly', 'fall', 'lead', 'cry', 'dark', 'machine', 'note', 'wait', 'plan', 'figure', 'star', 'box', 'noun']
var word_bank23 = ['field', 'rest', 'correct', 'able', 'pound', 'done', 'beauty', 'drive', 'stood', 'contain', 'front', 'teach', 'week', 'final', 'gave', 'green', 'oh', 'quick', 'develop']
var word_bank24 = ['ocean', 'warm', 'free', 'minute', 'strong', 'special', 'mind', 'behind', 'clear', 'tail', 'produce', 'fact', 'street', 'inch', 'multiply', 'nothing', 'course', 'stay', 'wheel']
var word_bank25 = ['full', 'force', 'blue', 'object', 'decide', 'surface', 'deep', 'moon', 'island', 'foot', 'system', 'busy', 'test', 'record', 'boat', 'common', 'gold', 'possible', 'plane']
var word_bank26 = ['stead', 'dry', 'wonder', 'laugh', 'thousand', 'ago', 'ran', 'check', 'game', 'shape', 'equate', 'hot', 'miss', 'brought', 'heat', 'snow', 'tire', 'bring', 'yes']
var word_bank27 = ['distant', 'fill', 'east', 'paint', 'language', 'among', 'grand', 'ball', 'yet', 'wave', 'drop', 'heart', 'am', 'present', 'heavy', 'dance', 'engine', 'position', 'arm']
var word_bank28 = ['wide', 'sail', 'material', 'size', 'vary', 'settle', 'speak', 'weight', 'general', 'ice', 'matter', 'circle', 'pair', 'include', 'divide', 'syllable', 'felt', 'perhaps', 'pick']
var word_bank29 = ['sudden', 'count', 'square', 'reason', 'length', 'represent', 'art', 'subject', 'region', 'energy', 'hunt', 'probable', 'bed', 'brother', 'egg', 'ride', 'cell', 'believe', 'fraction']
var word_bank30 = ['forest', 'sit', 'race', 'window', 'store', 'summer', 'train', 'sleep', 'prove', 'lone', 'leg', 'exercise', 'wall', 'catch', 'mount', 'wish', 'sky', 'board', 'joy']
var fullbank;


$(document).ready(function() {
  full_bank = word_bank.concat(word_bank2,word_bank3,word_bank4,word_bank5,word_bank6,word_bank7,word_bank8,word_bank9,word_bank10,word_bank11,word_bank12,word_bank13,word_bank14,word_bank15,word_bank16,word_bank17,word_bank18,word_bank19,word_bank20,word_bank21,word_bank22,word_bank23,word_bank24,word_bank25,word_bank26,word_bank27,word_bank28,word_bank29,word_bank30);
  var element = document.getElementById("text-box");
  element.spellcheck = false;
  element.focus();
  element.blur();
  currentDate = Date.now();
  currentDateW = Date.now();
  word_bank_shuffle();
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
      $("#characters").text("# of Characters Typed: " + $("#text-box").text().length);
      timeW = word_loop();
      if (timeW >= 6) {
        timeW = 0;
        currentDateW = Date.now();
        word_bank_shuffle();
      }
    } else {
      currentDate = Date.now();
      currentDateW = Date.now();
      $("#wpm").text("WPM: ");
      $("#characters").text("# of Characters Typed: ");
    }
    start_loop();
  },10);
}

function timer() {
  time = (Date.now() - currentDate)/60000
  time = precisionRound(time,2);
  return time;
}

function time_loop() {
  timeL = (Date.now() - currentDateL)/1000;
  timeL = precisionRound(timeL,2);
  return timeL;
}

function word_loop() {
  timeW = (Date.now() - currentDateW)/1000;
  timeW = precisionRound(timeW,2);
  return timeW;
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
    $("#characters").text("# of Characters Typed: ");
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
  text += full_bank[randInt] + "<br/>";
}
$("#words").html(text);
}

function randomGenerator() {
  return Math.floor(Math.random() * full_bank.length);
}
