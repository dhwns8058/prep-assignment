const userAnswerform = document.querySelector(".userAnswerform");
const userAnswer = document.querySelector(".userAnswer");
const result = document.querySelector(".result");
const remainCount = document.querySelector(".remainCount");
const gameStartBtn = document.querySelector(".gameStartBtn");
const gameRestarBtn = document.querySelector(".gameRestartBtn");

const gameNum = [];
let failCount = 0;

function restart() {
    userAnswer.value = "";
    result.innerHTML = "";
    remainCount.innerHTML = "";
    gameNum.length = 0;
    failCount = 0;
    gameStart();
}

function fail() {
    failCount++;
    if (failCount === 10) {
        alert(`10회 초과 실패! 답은 ${gameNum} 입니다. \n재시작 버튼을 눌러 다시 게임을 시작하세요.`);
    }
}

function playGame(event) {
    event.preventDefault();

    const gameNumStr = gameNum.join("");
    let answerUser = userAnswer.value;

    if (isNaN(answerUser) || answerUser.length !== 3) {
        alert("세자리 숫자를 입력하시오.");
        userAnswer.value = "";
    } else if (answerUser === gameNumStr) { // 답을 맞췄을 때
        result.innerHTML = "성공";
    } else { // 답이 틀렸을 때 
        fail(); // 10번 초과 함수
        const splitedAnswer = answerUser.split("");
        let strike = 0;
        let ball = 0;
        remainCount.innerHTML = `잔여횟수는 ${10 - failCount}번 남았습니다.`;

        for (let i = 0; i < 3; i++) {
            if (Number(splitedAnswer[i]) === gameNum[i]) {// stirke 
                strike++;
            } else if (gameNum.indexOf(Number(splitedAnswer[i])) !== -1)
                ball++;
            userAnswer.value = "";
        }
        result.innerHTML = `${strike}스트라이크 ${ball}볼`;
        answerUser = "";
    }
}

function gameStart() {
    for (let i = 0; i < 3; i++) {
        gameNum.push(getRandomNumber(i));
    }
}

function getRandomNumber(keyNumber) {
    const allNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return allNum.splice(Math.floor(Math.random() * (9 - keyNumber)), 1)[0];
}

gameStartBtn.addEventListener("click", gameStart);
userAnswerform.addEventListener("submit", playGame);
gameRestarBtn.addEventListener("click", restart);
