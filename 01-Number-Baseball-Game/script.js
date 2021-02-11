"use-strict";

let answerValue = [];
let ballValue = [];
let ballIndex = 0;
let round = 0;
let description = 1;

const numberBoardBtn = document.querySelectorAll(".number-board__btn");
const inputRowInput = document.querySelectorAll(".input-row__input");
const inputRowBtn = document.querySelectorAll(".input-row__btn");
const previousRecordRow = document.querySelectorAll(".previous-record__row");
const previousRecordRoundsLeft = document.querySelector(
  ".previous-record__rounds-left"
);
const soundClick = document.querySelector("#sound-click");
const soundPop = document.querySelector("#sound-pop");
const soundWin = document.querySelector("#sound-win");
const soundFail = document.querySelector("#sound-fail");
const message = document.querySelector(".message");
const messageBtn = document.querySelectorAll(".message__btn");
const messageTitle = document.querySelector(".message__title");
const messageContent = document.querySelector(".message__content");
const messageExit = document.querySelector(".message__exit");

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
const hideMessage = function () {
  message.classList.add("hidden");
};
const showMessage = function (name) {
  switch (name) {
    case "win":
      messageTitle.innerText = "🎉You Won!🎉";
      messageContent.innerText = `Answer was ${answerValue[0]}, ${answerValue[1]}, ${answerValue[2]}`;
      messageBtn[0].innerText = "REPLAY";
      messageBtn[1].innerText = "EXIT";
      messageBtn[0].classList.remove("hidden");
      messageBtn[1].classList.remove("hidden");
      break;
    case "lose":
      messageTitle.innerText = "😭You Lose...😭";
      messageContent.innerText = `Answer was ${answerValue[0]}, ${answerValue[1]}, ${answerValue[2]}..`;
      messageBtn[0].innerText = "REPLAY";
      messageBtn[1].innerText = "EXIT";
      messageBtn[0].classList.remove("hidden");
      messageBtn[1].classList.remove("hidden");
      break;
    case "reset":
      messageTitle.innerText = "🤔Do you want to reset?🤔";
      messageContent.innerText = "This will remove everything";
      messageBtn[0].innerText = "YES";
      messageBtn[1].innerText = "NO";
      messageBtn[0].classList.remove("hidden");
      messageBtn[1].classList.remove("hidden");
      break;
    /*how to play*/
    case 1:
      messageTitle.innerText = "How To Play";
      messageContent.innerHTML =
        "Computer will choose three different numbers from 0 to 9.<br /> You need to find what it is. <br /><br /> (ex) 9, 4, 6";
      messageBtn[1].innerText = "NEXT";
      messageBtn[0].classList.add("hidden");
      messageBtn[1].classList.remove("hidden");
      break;
    case 2:
      messageTitle.innerText = "How To Play";
      messageContent.innerHTML =
        "There are 9 rounds per game. <br />Each round you can guess the three numbers.";
      messageBtn[0].innerText = "PREV";
      messageBtn[1].innerText = "NEXT";
      messageBtn[0].classList.remove("hidden");
      messageBtn[1].classList.remove("hidden");
      break;
    case 3:
      messageTitle.innerText = "How To Play";
      messageContent.innerHTML =
        "If your guess has the same number in the same location, it's 1 strike that is represented as red. <br /><br />(ex) 9, 4, 5 for answer 9, 4, 7 is <br />2 strike (2 🔴)";
      messageBtn[0].innerText = "PREV";
      messageBtn[1].innerText = "NEXT";
      messageBtn[0].classList.remove("hidden");
      messageBtn[1].classList.remove("hidden");
      break;
    case 4:
      messageTitle.innerText = "How To Play";
      messageContent.innerHTML =
        "If your guess has the same number in the different location, it's 1 ball that is represented as yellow. <br /><br />(ex)  4, 9, 5 for answer 9, 4, 7 is <br /> 2 ball (2 🟡)";
      messageBtn[0].innerText = "PREV";
      messageBtn[1].innerText = "NEXT";
      messageBtn[0].classList.remove("hidden");
      messageBtn[1].classList.remove("hidden");
      break;
    case 5:
      messageTitle.innerText = "How To Play";
      messageContent.innerHTML =
        "If you find the answer within 9 rounds, you will win. <br /> If you don't, you will lose. Good Luck.";
      messageBtn[0].innerText = "PREV";
      messageBtn[1].innerText = "START";
      messageBtn[0].classList.remove("hidden");
      messageBtn[1].classList.remove("hidden");
      break;
  }
  message.classList.remove("hidden");
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
          for (let j = 0; j < 3; j++) {
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
        showMessage("win");
        soundWin.play();
        round = 10;
      }
      //lose condition
      if (round == 8 && strike != 3) {
        showMessage("lose");
        soundFail.play();
      }
      //ready for next round
      ballValue = [];
      ballIndex = 0;
      round++;
      if (round < 6)
        previousRecordRoundsLeft.innerText = `${9 - round} rounds left`;
      else if (round < 8)
        previousRecordRoundsLeft.innerText = `${9 - round} rounds left. Hurry!`;
      else
        previousRecordRoundsLeft.innerText = `${9 - round} round left. Hurry!`;
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
  if (audioName === "pop") {
    soundPop.play();
  }
};
for (let i = 0; i < 10; i++) {
  numberBoardBtn[i].addEventListener("click", enterNumber);
  numberBoardBtn[i].addEventListener("click", () => playSound("click"));
}

for (let i = 0; i < 3; i++) {
  inputRowBtn[i].addEventListener("click", function () {
    playSound("pop");
  });
}
inputRowBtn[0].addEventListener("click", deleteNumber);
inputRowBtn[1].addEventListener("click", submitNumber);
inputRowBtn[2].addEventListener("click", function () {
  showMessage("reset");
});
messageExit.addEventListener("click", function () {
  hideMessage();
  playSound("click");
});
messageBtn[0].addEventListener("click", function () {
  if (this.innerText === "PREV") {
    description--;
    hideMessage();
    showMessage(description);
  } else {
    hideMessage();
    replay();
  }
  playSound("click");
});
messageBtn[1].addEventListener("click", function () {
  if (this.innerText === "START") playSound("pop");
  else playSound("click");
  if (this.innerText === "NEXT") {
    description++;
    hideMessage();
    showMessage(description);
  } else {
    hideMessage();
  }
});
//start the game with making answer values
setAnswerValue();
