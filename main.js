/* 
VER 1:

1. User should be able to view a timer and its progress:
 a) There should be a timer object:
  - it should have a "timeLimit" value
  - it should have a "remainingTime" value/method
 b) On every second, the displayed timer needs to be reduced by 1s:
  - "remainingTime" value/func should return smaller value each second
  - displayed remaining time should be updated on each change in "remainingTime"
 c) there should be a "timer" HTML object that will display remaining time
  - it should display the initial time limit after the page loads

2. User should be able to start the timer manually:
 a) It should have a button that will activate the app:
  - button should have an onlick event attached to it that will run the "startTimer" function

VER 2:

1. User should be able to view the remaining time in "Minutes : Seconds" format
 a) The remaining time of the value should be converted from seconds to "Minutes : Seconds" format
  - 

2. User needs to be able to control time limit value
 a) it should be possible at application start
  - it should have an HTML element that will pop up at the start up


*/

/* Application data */

let timer = {
  timeLimitSeconds: 50,
  countRemainingTime: function (timeLimit) {
    timeLimit = (timeLimit === undefined) ? this.timeLimitSeconds : timeLimit;
    if (timeLimit > 0) {
      let self = this;
      window.setTimeout(function () {
        timeLimit--;
        self.updateRemainingTime(timeLimit);
        self.countRemainingTime(timeLimit);
      }, 1000)
    }
  },
  updateRemainingTime: function (timeLimit) {
    renderRemainingTime(timeLimit);

  },
  
}

/* DOM objects */

let timerElement = document.getElementsByClassName("timer-current")[0],
    startAppButton = document.getElementById("start-timer");

/* DOM view functions */

function renderInitialRemainingTime () {
  timerElement.textContent = timer.timeLimitSeconds;
}

function renderRemainingTime (timeLimit) {
  timerElement.textContent = timeLimit;
}

/* DOM events functions */

function activateTimeCounter () {
  timer.countRemainingTime();
}

/* Application init */

function init () {
  renderInitialRemainingTime();
  startAppButton.addEventListener('click', activateTimeCounter);
}
init();