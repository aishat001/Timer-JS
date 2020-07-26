// --------DOM MANIPULATION---------
var btns = document.querySelectorAll(".btn");
var timeLeftContent = document.getElementById("time-left");

var timerSound = new Audio('assets/06_Urban_Beat.mp3');
timerSound.volume = 0.3;

var sessionResult = document.querySelector(".session-result");
var sessionCount = "25";
sessionResult.textContent = sessionCount; 

var breakResult = document.querySelector(".break-result");
var breakCount = "5";
breakResult.textContent = breakCount;  


var minutes, seconds, timeInterval, newTime;

var timeLimit = sessionCount * 60;
var timePassed = 0;
timeLeft = timeLimit;
timeLeftContent.textContent = getTimeLeft(timeLeft);

// --------GET MINUTES AND SECONDS---------
function getTimeLeft(time) {
    minutes = Math.floor(time / 60);
    seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}

function getTimeLeftContent() {
    timeLimit = sessionCount * 60;
    timePassed = timePassed += 1;
    timeLeft = timeLimit - timePassed;
    timeLeftContent.textContent = getTimeLeft(timeLeft);
}
function getLeft() {
    if (timeLeft > 0) {
        getTimeLeftContent();
    } 
    else if (timeLeft === 0 && breakCount) {
        document.getElementById("timer-label").innerHTML = "Break Time";
            breakCount--;
            timeLeftContent.textContent = breakCount;   
            playSound();
    } else if (breakCount === 0) {
        document.getElementById("timer-label").innerHTML = "Session";
        timeLeftContent.textContent = getTimeLeft(timeLimit);
    }

  }

  function playSound() {
      if (breakCount === 0) {
          timerSound.play();
          alert("SESSION OVER");
          timerSound.pause();
          timerSound.currentTime = 0;
      }
    }
    playSound();

btns.forEach(btn => {
// --------SESSION LENGTH---------
    function sessionLength() {
        if (btn.className.includes("session-increment")) {
            sessionCount++;
        } 
        if (btn.className.includes("session-decrement")) {
            sessionCount--;
        } 
        if (sessionCount < 1) {
            sessionCount = 1;
        }
        if (breakCount > 60) {
            breakCount = 60;
        }
        sessionResult.textContent = sessionCount; 
        
// --------UPDATING SESSION-LENGTH INTO MINUTES---------
        if (sessionCount >= 0) {
            timeLeft = sessionCount * 60;
            timeLeftContent.textContent = getTimeLeft(timeLeft);
        }
    }

 // --------BREAK-LENGTH---------
    function breakLength() {
        if (btn.className.includes("break-increment")) {
            breakCount++;
        } 
        if (btn.className.includes("break-decrement")) {
            breakCount--;
        }
        if (breakCount < 1) {
            breakCount = 1;
        }
        if (breakCount > 60) {
            breakCount = 60;
        }
        breakResult.textContent = breakCount;  
    }

 // --------START TIMER BTN CLICK---------
    function startTimer() {
        if (btn.className.includes("start")) {
            timeInterval = setInterval(() => {
            getLeft();
            }, 1000);
            getLeft();
        }
    }

// ---------STOP TIMER BTN CLICK-------
    function stopTimer() {
        if (btn.className.includes("stop")) {
            getTimeLeftContent();
            window.clearInterval(timeInterval);
       }
    }
       
 // ---------RESET TIMER BTN CLICK-------
    function resetTimer() {
        if (btn.className.includes("reset")) {
            window.clearInterval(timeInterval);
            location.reload();
            // sessionCount = 25
            // sessionResult.textContent = sessionCount; 
        }
    }

if (startTimer === true) {
    var increa = btn.className.includes("break-increment");
    increa.setAttribute("disabled", true);
}
    btn.addEventListener("click", sessionLength);
    btn.addEventListener("click", breakLength);
    btn.addEventListener("click", startTimer);
    btn.addEventListener("click", stopTimer);
    btn.addEventListener("click", resetTimer);
});

