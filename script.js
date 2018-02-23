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
	best_wpm,
	wpm = [],
	labels = [],
	avr = 0,
	final = 0;
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
		$('body').css("background-color", "#e6e6e6");
	} else if (ranlen == 1) {
		$('body').css("background-color", "#ff9b5e");
	} else if (ranlen == 2) {
		$('body').css("background-color", "#e55454");
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
	$("#stats").on('click', function() {
		alert("Best WPM: " + best_wpm + "\nAverage WPM: " + avr + "\nFinal WPM w/ Errors: " + (precisionRound(final - (errors * 5), 2)));
	});
	$("#close").on('click', function() {
		document.getElementById("finish_popup").style.display = "none";
		rt = 0;
	});
});

function start_loop() {
	setTimeout(function() {
		if (!($("#text-box").text() === "")) {
			rt = timer();
			$("#wpm").text("WPM: " + (precisionRound((($("#text-box").text().length / 5) / rt), 2)));
			updateWPM();
			$("#time-cps").text("Session Time: " + (precisionRound(60 - session_timer(), 2)));
		} else {
			currentDate = Date.now();
			currentDateS = Date.now();
			$("#wpm").text("WPM: ");
			$("#time-cps").text("Session Time: 60.00");
		}
		start_loop();
	}, 10);
}

function timer() {
	time = (Date.now() - currentDate) / 60000
	time = precisionRound(time, 2);
	return time;
}

function session_timer() {
	timeS = (Date.now() - currentDateS) / 1000
	timeS = precisionRound(timeS, 2);
	return timeS;
}

function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}

function word_bank_shuffle() {
	text = "";
	stripped_text = [];
	proper_length = ($("#word-box").height() - $("#word-title").height()) / 22;
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
		if (stripped_text[y].toLowerCase() == textBoxData[textBoxData.length - 1].toLowerCase()) {
			remove = true;
			index_to_remove = y;
		}
	}
	if (remove) {
		if (Math.floor(($("#word-box").height() - $("#word-title").height()) / 22) + 1 < stripped_text_left.length) {
			console.warn("WARNING: stripped_text_left exceeds maximum length\n\nIf you are seeing this error, it is because of an issue with resolution changes.\n\nReshuffling words to fix.\n\n");
			word_bank_shuffle();
			return;
		}
		text = "";
		stripped_text_left.splice(index_to_remove, 1);
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
	current_wpm = precisionRound(($("#text-box").text().length / 5) / rt, 2);
	if (rt * 60 >= 5) {
		if (wpm[wpm.length - 1] != current_wpm) {
			wpm.push(current_wpm);
		}
		if (current_wpm >= best_wpm || best_wpm === undefined) {
			best_wpm = current_wpm;
			$("#characters").text("Best WPM: " + best_wpm);
		}
	}
	if (rt >= 1) {
		$("#text-box").text("");
		wpm.push(current_wpm);
		var wpmFormat = []
		for (var i = 0; i < 60; i++) {
			if (wpm[Math.ceil(i * wpm.length / 60)] != wpmFormat[wpmFormat.length - 1]) {
				wpmFormat.push(wpm[Math.ceil(i * wpm.length / 60)]);
			}
		}
			while (wpmFormat.length <= 61) {
				if (wpmFormat.length == 61) {
					break;
				}
			wpmFormat.push(wpm[wpm.length - (61-wpmFormat.length)]);
		}
		var sum = 0;
		for (var i = 0; i < wpm.length; i++) {
			sum += wpm[i];
		}
		final = wpm[wpm.length - 1];
		avr = precisionRound(sum / wpm.length, 2);
		sum = 0;
		document.getElementById("finish_popup").style.display = "block";
		var ctx = document.getElementById("chart").getContext('2d');
		var config = {
			type: 'line',
			data: {
				labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
				datasets: [{
					label: "WPM",
					backgroundColor: $('body').css("background-color"),
					borderColor: $('body').css("background-color"),
					data: wpmFormat,
					fill: false,
				}]
			},
			options: {
				elements: {
					point: {
						radius: 0
					}
				},
				title: {
					display: true,
					text: "WPM Throughout Time"
				},
				tooltips: {
					display: false
				},
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Time (s)'
						},
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'WPM'
						},
					}]
				}
			}
		}
		var the_chart = new Chart(ctx, config);
		labels = [];
		wpm = [];
	}
}

function update_height() {
	setTimeout(function() {
		if ($("#word-box").height() != pastHeight) {
			word_bank_shuffle();
			pastHeight = $("#word-box").height();
		}
		update_height();
	}, 100);
}
window.onclick = function(event) {
	if (event.target == document.getElementById("finish_popup")) {
		rt = 0;
		document.getElementById("finish_popup").style.display = "none";
	}
}
