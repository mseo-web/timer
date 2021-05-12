var timers_amount = null;
var seconds_amount = null;

var timer_items = [];
var time_and_boxes = [];

function getTimeNow() {
	var date_now = new Date();
	var hours_now = date_now.getHours();
	if (hours_now < 10) hours_now = "0" + hours_now;
	var minutes_now = date_now.getMinutes();
	if (minutes_now < 10) minutes_now = "0" + minutes_now;
	var seconds_now = date_now.getSeconds();
	if (seconds_now < 10) seconds_now = "0" + seconds_now;
	var milliseconds_now = date_now.getMilliseconds();
	if (milliseconds_now < 10) milliseconds_now = "0" + milliseconds_now;

	var time_now = hours_now + ':' + minutes_now + ':' + seconds_now + ':' + milliseconds_now;

	return time_now;
}

var timers_box = document.getElementById('timers');

function createTimers() {
	document.getElementById('createTimersBtn').setAttribute('disabled', true);
	timers_amount = document.getElementsByName("input_amount")[0].value;
	console.log("timers_amount: " + timers_amount);
	seconds_amount = document.getElementsByName("input_seconds")[0].value;
	console.log("seconds_amount: " + seconds_amount);
	template_seconds = seconds_amount;
	if (template_seconds < 10) template_seconds = "0" + template_seconds;

	for(var i = 0; i < timers_amount; i++) {

		timers_box.innerHTML += '<div class="timer-item d-flex">'+
					'<table class="table">'+
					  '<thead>'+
					    '<tr>'+
					      '<th scope="col">Таймер</th>'+
					      '<th scope="col">Время окончания</th>'+
					    '</tr>'+
					  '</thead>'+
					  '<tbody>'+
					    '<tr>'+
					      '<th scope="row" name="timer" id="timer'+i+'">'+template_seconds+'.000</th>'+
					      '<td name="time_and" id="time_and'+i+'"></td>'+
					    '</tr>'+
					  '</tbody>'+
					'</table>'+
					'<button class="btn btn-outline-primary btn-sm m-1" id="startTimerBtn'+i+'" name="startTimer" onclick="startTimer('+i+');">Старт</button>'+
				'</div>';
	}
}

function startTimer(i) {
	document.getElementById('startTimersBtn').setAttribute('disabled', true);
	document.getElementById(`startTimerBtn${i}`).setAttribute('disabled', true);
	console.log("i: " + i);
	document.getElementById(`time_and${i}`).innerHTML = '';
	function now() {
  	return window.performance ? window.performance.now() : Date.now();
	}
    
  var count = seconds_amount * 1000;
	console.log("seconds_amount: " + seconds_amount);
	var delay = 20;
  
  var initTick = 0;
  var timer_item = document.getElementById(`timer${i}`);
  function tick() {
		var remaining = (count - (now() - initTick)) / 1000;  
		// console.log(remaining);
		remaining = remaining >= 0 ? remaining : 0;
		var seconds = remaining.toFixed(3);
		if (seconds < 10) seconds = "0" + seconds;
		timer_item.innerHTML = seconds;
		if (remaining) {
			setTimeout(tick, delay);
		}else {
			finishHandler(i, seconds_amount);
		}
  }
  
  initTick = now();
  // console.log(now());
  setTimeout(tick, delay);
}

function startTimers() {
	var start_buttons = document.getElementsByName('startTimer');
	for(var i = 0; i < start_buttons.length; i++) {
		start_buttons[i].setAttribute('disabled', true);
	}
	timer_items = document.getElementsByName('timer');

	for(var i = 0; i < timer_items.length; i++) {
		startTimer(i);
	}
}

function finishHandler(i, timer_seconds) {
	console.log('timer'+i+' is finished');
	var tm_sec = timer_seconds;
	if (tm_sec < 10) tm_sec = "0" + tm_sec;
	document.getElementById(`time_and${i}`).innerHTML = getTimeNow();
	document.getElementById(`timer${i}`).innerHTML = tm_sec + '.000';
	document.getElementById(`startTimerBtn${i}`).removeAttribute('disabled');
}

function reloadTimers() {
	timers_box.innerHTML = '';
	document.getElementById("timerForm").reset();
	document.getElementById('createTimersBtn').removeAttribute('disabled');
	document.getElementById('startTimersBtn').removeAttribute('disabled');
}
