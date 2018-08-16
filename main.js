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
 b) it should be possible when the application is already running
  - there should be an HTML element that will show the settings page when clicked
  - there should be an onclick event attached to the element
 c) it should be possible to change the time limit value through a slider
  - there should be an HTML slider element
  - time limit value should be decreased/increased when user will be moving the slider's position

3. User should be able to control the left time with the progress bar under the displayed time
 a) 


*/

// TIMER CONTROLLER

const TimerCtrl = (function () {
  // Private data and functions

  // Timer object
  const _timer = {
    timeLimitSeconds: 128
  };

  let testSingletonObj = {
    test: 0
  }
  //Application state
  let _currentTimeLimitSeconds = 128;

  // Public functions
  const decrementTimeLeft = (function () {
    let timeLeft;

    return function (timeLeftInput) {
      timeLeft = timeLeftInput;
      timeLeft -= 1; 
      return timeLeft;
    }
  })();
  const getCurrentTimeLimitSeconds = function () {
    return _currentTimeLimitSeconds;
  }
  const getSingleton = function () {
    return testSingletonObj;
  }

  return {
    decrementTimeLeft: decrementTimeLeft,
    getCurrentTimeLimitSeconds: getCurrentTimeLimitSeconds,
    getSingleton: getSingleton
  }
})();


// UI CONTROLLER

const UICtrl = (function () {
  // Private data and functions

  // UI Selectors
  const UISelectors = {
    timer: ".timer-current",
    startAppButton: "#start-timer"
  };

  const _convertTimeLeft = function (timeLeft) {
    let timeLeftMinutes = Math.floor(timeLeft / 60).toString(),
        timeLeftSeconds = Number(((timeLeft / 60) - Math.floor(timeLeft / 60)) * 60).toFixed(0).toString();
    (timeLeftMinutes.length === 1) ? timeLeftMinutes = ("0" + timeLeftMinutes) : '';
    (timeLeftSeconds.length === 1) ? timeLeftSeconds = ("0" + timeLeftSeconds) : '';

    return `${timeLeftMinutes} : ${timeLeftSeconds}`;
  };

  //Public functions
  const showTimeLeft = function (timeLeftInput) {
    const timeLeft = _convertTimeLeft(timeLeftInput);

    document.querySelector(UISelectors.timer).textContent = timeLeft;
  }
  const getUISelectors = function () {
    return UISelectors;
  }

  return {
    showTimeLeft: showTimeLeft,
    getUISelectors: getUISelectors
  }

})();


// APPLICATION CONTROLLER

const AppCtrl = (function (TimerCtrl, UICtrl) {
  //Private data and functions

  //Get UI Selectors
  const UISelectors = UICtrl.getUISelectors();

  const _countTimeLeft = function (timeLimit) {
    timeLimit = (timeLimit === undefined) ? TimerCtrl.getCurrentTimeLimitSeconds() : timeLimit;
    if (timeLimit > 0) {
      window.setTimeout(function () {
        timeLimit = TimerCtrl.decrementTimeLeft(timeLimit);
        //Update UI
        UICtrl.showTimeLeft(timeLimit);
        //Loop until "0"
        _countTimeLeft(timeLimit);
        }, 1000)
    }
  };
  
  //DOM Events handler functions
  const _activateCounter = function (e) {
    _countTimeLeft();
    e.preventDefault();
  };

  //Set Event Listeners for DOM objects
  const _setEventListeners = function () {
    //Start timer
    document.querySelector(UISelectors.startAppButton).addEventListener('click', _activateCounter);
  }

  // Public functions
  const init = function () {
    UICtrl.showTimeLeft(TimerCtrl.getCurrentTimeLimitSeconds());
    _setEventListeners();
  }

  const getSingleton = function () {
   return TimerCtrl.getSingleton();
  }

  return {
    init: init,
    getSingleton: getSingleton
  }

})(TimerCtrl, UICtrl)

AppCtrl.init();























/*
let timer = {
  timeLimitSeconds: 50,
  dec: function (timeLimit) {
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
*/