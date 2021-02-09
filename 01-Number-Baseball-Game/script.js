"use-strict";

let answerValue = [];
let ballValue = [];
let ballIndex = 0;
let round = 0;

const numberBoardBtn = document.querySelectorAll(".number-board__btn");
const inputRowInput = document.querySelectorAll(".input-row__input");
const inputRowBtn = document.querySelectorAll(".input-row__btn");
const previousRecordRow = document.querySelectorAll(".previous-record__row");
const soundClick = document.querySelector("#sound-click");
const soundPop = document.querySelector("#sound-pop");
const soundWin = document.querySelector("#sound-win");
const soundFail = document.querySelector("#sound-fail");

const enterNumber = function () {
  if (0 <= ballIndex && ballIndex <= 2) {
    ballValue[ballIndex] = Number(this.innerText);
    inputRowInput[ballIndex].innerText = ballValue[ballIndex];
    ballIndex++;
  }
};
const deleteNumber = function () {
  if (ballIndex > 0) {
    ballValue.pop();
    ballIndex--;
    inputRowInput[ballIndex].innerText = "";
  }
};
const submitNumber = function () {
  if (round < 9) {
    if (ballIndex == 3) {
      let strike = 0;
      let ball = 0;
      //update ballValue to previous record
      for (let i = 0; i < 3; i++) {
        previousRecordRow[round].childNodes[3].childNodes[2 * i + 1].innerText =
          ballValue[i];
        inputRowInput[i].innerText = "";
      }
      //check strike, remove ball
      for (let i = 0; i < 3; i++) {
        if (answerValue[i] === ballValue[i]) {
          strike++;
          for (let j = 0; j < 3; j++) {
            if (i === j) continue;
            if (ballValue[i] === ballValue[j]) ballValue[j] = "";
          }
          ballValue[i] = "";
        }
      }
      //check ball
      for (let i = 0; i < 3; i++) {
        if (answerValue.includes(ballValue[i])) {
          ball++;
          for (let j = 0; i < 3; i++) {
            if (i == j) continue;
            if (ballValue[i] === ballValue[j]) ballValue[j] = "";
          }
          ballValue[i] = "";
        }
      }
      //print strike/ball number
      previousRecordRow[round].childNodes[5].childNodes[1].innerText = strike;
      previousRecordRow[round].childNodes[5].childNodes[5].innerText = ball;
      //win condition
      if (strike == 3) {
        alert("win!!");
        soundWin.play();
        round = 10;
      }
      //lose condition
      if (round == 8 && strike != 3) {
        alert("game over");
        soundFail.play();
      }
      //ready for next round
      ballValue = [];
      ballIndex = 0;
      round++;
      if (round < 9) {
        previousRecordRow[round].classList.remove("hidden");
      }
    }
  }
};
const eraseNumber = function (round) {
  for (let i = 0; i < 3; i++) {
    previousRecordRow[round].childNodes[3].childNodes[2 * i + 1].innerText = "";
  }
  previousRecordRow[round].childNodes[5].childNodes[1].innerText = "";
  previousRecordRow[round].childNodes[5].childNodes[5].innerText = "";
  if (round != 0) {
    previousRecordRow[round].classList.add("hidden");
  }
};
const setAnswerValue = function () {
  for (let i = 0; i < 3; i++)
    answerValue[i] = Math.trunc(Math.random() * (10 - i));
  if (answerValue[0] <= answerValue[1]) answerValue[1]++;
  if (Math.min(answerValue[0], answerValue[1]) <= answerValue[2])
    answerValue[2]++;
  if (Math.max(answerValue[0], answerValue[1]) <= answerValue[2])
    answerValue[2]++;
};

const replay = function () {
  for (let i = 0; i < 3; i++) deleteNumber();
  for (let i = 0; i < 9; i++) eraseNumber(i);
  ballValue = [];
  ballIndex = 0;
  round = 0;
  setAnswerValue();
};
const playSound = function (audioName) {
  if (audioName === "click") {
    soundClick.play();
  }
  if (audioName == "pop") {
    soundPop.play();
  }
};

for (let i = 0; i < 10; i++) {
  numberBoardBtn[i].addEventListener("click", enterNumber);
  numberBoardBtn[i].addEventListener("click", function () {
    playSound("click");
  });
}
for (let i = 0; i < 3; i++) {
  inputRowBtn[i].addEventListener("click", function () {
    playSound("pop");
  });
}
inputRowBtn[0].addEventListener("click", deleteNumber);
inputRowBtn[1].addEventListener("click", submitNumber);
inputRowBtn[2].addEventListener("click", replay);
setAnswerValue();
