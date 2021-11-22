window.onload = function() {
  console.log("starting");
};

var index = 0;
//Main countdown clock
var countDown = 75;
//User score
var score = 75;
//User highschore
var highScore = 0;
//Variable for quiz time
var quizTime;



document.getElementById("start-button").addEventListener("click", event => {
  console.log("hello");
  document.getElementById("start-quiz").classList.add("d-none");
  document.getElementById("quiz-questions").classList.remove("d-none");
  setTime();
  renderQuestions();
  quizTime = setInterval(setTime, 1000);
});


function renderQuestions() {
  var questionsIndexLength = questions.length - 1;
  if (index <= questionsIndexLength) {
    document.getElementById("question").innerHTML = questions[index].title;
    renderQuestionChoices();
  }
  quizOver();
}

function renderQuestionChoices() {
  var question = questions[index].choices;
  console.log(question);
  for (var option = 0; option < question.length; option++) {
    var questionOptionsDiv = document.getElementById("question-choices");
    var questionButtons = document.createElement("button");
    questionButtons.className =
      "btn btn-outline-primary btn-lg d-flex justify-content-around";
    questionButtons.innerHTML = question[option];

    questionButtons.setAttribute(
      "onclick",
      "checkAnswer(" + index + "," + option + ");"
    );
    questionOptionsDiv.append(questionButtons);
  }
  quizOver();
}

function clearQuestionDiv() {
  console.log("About to clear html");
  document.getElementById("question-choices").innerHTML = "";
  quizOver();
}

function checkAnswer(question, answer) {
  console.log("question: ", question);
  console.log("asnwer: ", answer);
  let correctAnswer = questions[question].answer;
  let userAnswer = questions[question].choices[answer];
  if (userAnswer == correctAnswer) {
    index = index + 1;
    console.log(score);
    console.log("Correct");
  }

  else {
    index = index + 1;
    countDown = countDown - 15;
    score = score - 15;
    console.log(score);
    console.log("Next question: ", index);
    console.log("Incorrect");
  }
  clearQuestionDiv();
  renderQuestions();
  quizOver();
}


function setTime() {
  document.getElementById("quiz-time").innerHTML = countDown + "sec left";
  countDown--;
  if (countDown == -1) {
    clearInterval(quizTime);
  }
  quizOver();
}

function quizOver() {
  if (index >= 4 || countDown <= 0) {
    document.getElementById("quiz-questions").classList.add("d-none");
    document.getElementById("all-done").classList.remove("d-none");
    document.getElementById("quiz-time").innerHTML = countDown + "sec left";
    document.getElementById("final-score").innerHTML = countDown;

    clearInterval(quizTime);
  }
}


document.getElementById("initials-button").addEventListener("click", saveScore);


function saveScore() {
  var userInitials = document.querySelector("#initial-input").value;
  var finalScore = countDown;


  var scoreObject = { initials: userInitials, score: finalScore };

  var highScores = localStorage.getItem("highScoreList");

  if (highScores == null) {
    localStorage.setItem("highScoreList", JSON.stringify([scoreObject]));
    console.log(highScores);
  } else {
    highScoreList = JSON.parse(highScores);
    console.log(typeof highScoreList);
    highScoreList.push(scoreObject);
    localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
  }
}
