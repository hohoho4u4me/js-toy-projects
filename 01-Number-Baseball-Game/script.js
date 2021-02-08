"use-strict";

let ballValue = [];
let ballIndex = 0;
let Round = 0;

const numberBoardBtn = document.querySelectorAll(".number-board__btn");
const inputRowBtn = document.querySelectorAll(".input-row__btn");

const enterNumber = function () {
  if (0 <= ballIndex && ballIndex <= 2) {
    ballValue[ballIndex] = Number(this.innerText);
    ballIndex++;
  }
};
const deleteNumber = function () {
  if (ballIndex > 0) {
    ballValue.pop();
    ballIndex--;
  }
};

for (let i = 0; i < 10; i++) {
  numberBoardBtn[i].addEventListener("click", enterNumber);
}
console.log(inputRowBtn);
inputRowBtn[0].addEventListener("click", deleteNumber);
