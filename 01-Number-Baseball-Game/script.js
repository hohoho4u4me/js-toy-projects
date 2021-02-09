"use-strict";

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
      for (let i = 0; i < 3; i++) {
        previousRecordRow[round].childNodes[3].childNodes[2 * i + 1].innerText =
          ballValue[i];
        inputRowInput[i].innerText = "";
      }
      ballIndex = 0;
      round++;
      if (round == 9) {
        alert("game over");
      } else {
        previousRecordRow[round].classList.remove("hidden");
      }
    }
  }
};

for (let i = 0; i < 10; i++) {
  numberBoardBtn[i].addEventListener("click", enterNumber);
}
inputRowBtn[0].addEventListener("click", deleteNumber);
inputRowBtn[1].addEventListener("click", submitNumber);
