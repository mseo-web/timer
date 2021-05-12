// var timers_amount = null;
var seconds_amount = null;

var timersArr = [];

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
	seconds_amount = document.getElementsByName("input_seconds")[0].value;
	console.log("seconds_amount: " + seconds_amount);
	template_seconds = seconds_amount;
	if (template_seconds < 10) template_seconds = "0" + template_seconds;

	timersArr.push({name: 'new-timer', timer_finished: seconds_amount});

	var last_timer = timersArr[timersArr.length - 1];
	var last_timer_index = timersArr.length - 1;
	var last_timer_seconds = last_timer.timer_finished;

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
				      '<th scope="row" name="timer" id="timer'+last_timer_index+'">'+template_seconds+'.000</th>'+
				      '<td name="time_and" id="time_and'+last_timer_index+'"></td>'+
				    '</tr>'+
				  '</tbody>'+
				'</table>'+
				'<button class="btn btn-outline-primary btn-sm m-1" id="startTimerBtn'+last_timer_index+'" name="startTimer" onclick="startTimer('+last_timer_index+', '+last_timer_seconds+');">Старт</button>'+
			'</div>';

	document.getElementById("timerForm").reset();
}

function startTimer(timer_index, timer_seconds) {
	console.log("timer_index: " + timer_index);
	document.getElementById(`startTimerBtn${timer_index}`).setAttribute('disabled', true);
	document.getElementById(`time_and${timer_index}`).innerHTML = '';
	function now() {
  	return window.performance ? window.performance.now() : Date.now();
	}
    
  var count = timer_seconds * 1000;
	console.log("timer_seconds: " + timer_seconds);
	var delay = 20;
  
  var initTick = 0;
  var timer_item = document.getElementById(`timer${timer_index}`);
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
			finishHandler(timer_index, timer_seconds);
		}
  }
  
  initTick = now();
  // console.log(now());
  setTimeout(tick, delay);
}

function finishHandler(timer_index, timer_seconds) {
	console.log('timer'+timer_index+' is finished');
	var tm_sec = timer_seconds;
	if (tm_sec < 10) tm_sec = "0" + tm_sec;
	document.getElementById(`time_and${timer_index}`).innerHTML = getTimeNow();
	document.getElementById(`timer${timer_index}`).innerHTML = tm_sec + '.000';
	document.getElementById(`startTimerBtn${timer_index}`).removeAttribute('disabled');
}

function reloadTimers() {
	timersArr = [];
	timers_box.innerHTML = '';
	document.getElementById("timerForm").reset();
}
