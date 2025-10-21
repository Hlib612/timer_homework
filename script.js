function pad(value) {
  return String(value).padStart(2, "0");
}

function getTimeFromSeconds(startSeconds) {
  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE; // 3600
  const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR; // 86400

  const totalSeconds = Math.floor(startSeconds);

  const days = Math.floor(totalSeconds / SECONDS_IN_DAY);
  const remSeconds = totalSeconds % SECONDS_IN_DAY;

  const hours = pad(Math.floor(remSeconds / SECONDS_IN_HOUR));
  const minutes = pad(
    Math.floor((remSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
  );
  const secs = pad(remSeconds % SECONDS_IN_MINUTE);

  return { days, hours, minutes, secs };
}

let startSeconds = 3600;
let timerId = null;
let timerIsActive = false;

// const onHalfTimePastFunction = () => {
//  if (startSeconds === 5){
//     alert("Залишилося менше половини часу!")
//  }
// }

const output = document.querySelector(".js-clockface");
const startBtn = document.querySelector('[data-action="start"]');
const stopBtn = document.querySelector('[data-action="stop"]');
const resetBtn = document.querySelector('[data-action="reset"]');
const secondTimerButton = document.querySelector(".second-timer-btn");

const onTimerPasedZero = (event) => {
  startBtn.style.backgroundColor = "green";
  stopBtn.style.backgroundColor = "red";
  resetBtn.style.backgroundColor = "yellow";
  clearInterval(timerId);
  timerIsActive = false;
  output.textContent = "00:00:00";
};

const onStartBtnClick = (event) => {
  // console.log("start")
  if (timerIsActive) {
    return;
  }
  // console.log("start")
  timerId = setInterval(() => {
    startSeconds -= 1;
    if (startSeconds === 1800) {
      alert("Залишилося менше половини часу!");
    }
    if (startSeconds === 3595) {
      onTimerPasedZero();
    }
    //    console.log("start")
    const { hours, minutes, secs } = getTimeFromSeconds(startSeconds);
    output.textContent = `${hours}:${minutes}:${secs}`;
  }, 1000);
  timerIsActive = true;
};

const onSecondBtnClick = (event) => {
  startSeconds = 1800;
  clearInterval(timerId);
  output.textContent = "00:30:00";
  timerId = setInterval(() => {
    startSeconds -= 0.22;
    startBtn.style.display = "none";
    stopBtn.style.display = "none";
    secondTimerButton.style.display = "none";

    if (startSeconds === 10) {
      resetBtn.style.backgroundColor = "pink";
    }
    if (startSeconds < 0) {
      onTimerPasedZero();
      startBtn.style.display = "inline-block";
      stopBtn.style.display = "inline-block";
    }
    //    console.log("start")
    const { hours, minutes, secs } = getTimeFromSeconds(startSeconds);
    output.textContent = `${hours}:${minutes}:${secs}`;
  }, 1);
  timerIsActive = true;
};

const onResetBtnClick = (event) => {
  startSeconds = 3600;
  clearInterval(timerId);
  output.textContent = "01:00:00";
  timerIsActive = false;
  startBtn.style.backgroundColor = "buttonface";
  stopBtn.style.backgroundColor = "buttonface";
  resetBtn.style.backgroundColor = "buttonface";
   startBtn.style.display = "inline-block";
      stopBtn.style.display = "inline-block";
      secondTimerButton.style.display = "inline-block";
};

const onStopBtnClick = (event) => {
  clearInterval(timerId);
  timerIsActive = false;
};

startBtn.addEventListener("click", onStartBtnClick);
resetBtn.addEventListener("click", onResetBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);
secondTimerButton.addEventListener("click", onSecondBtnClick);
