"use-strict";

let answerValue = [];
let ballValue = [];
let ballIndex = 0;
let round = 0;

const numberBoardBtn = document.querySelectorAll(".number-board__btn");
const inputRowInput = document.querySelectorAll(".input-row__input");
const inputRowBtn = document.querySelectorAll(".input-row__btn");
const previousRecordRow = document.querySelectorAll(".previous-record__row");

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
      for (let i = 0; i < 3; i++) {
        previousRecordRow[round].childNodes[3].childNodes[2 * i + 1].innerText =
          ballValue[i];
        inputRowInput[i].innerText = "";
        if (answerValue[i] == ballValue[i]) strike++;
        else if (answerValue.includes(ballValue[i])) ball++;
        ballValue[i] = "";
      }
      previousRecordRow[round].childNodes[5].childNodes[1].innerText = strike;
      previousRecordRow[round].childNodes[5].childNodes[5].innerText = ball;
      if (strike == 3) {
        alert("win!!");
        round = 9;
      }
      ballIndex = 0;
      round++;
      if (round == 9) {
        alert("game over");
      } else if (round < 9) {
        previousRecordRow[round].classList.remove("hidden");
      }
    }
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

for (let i = 0; i < 10; i++)
  numberBoardBtn[i].addEventListener("click", enterNumber);
inputRowBtn[0].addEventListener("click", deleteNumber);
inputRowBtn[1].addEventListener("click", submitNumber);
setAnswerValue();
