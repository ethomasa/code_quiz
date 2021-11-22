window.onload = function() {
  console.log("starting");
};

//Global ariables for index, countdown, score

//Index is equal to the question number
var index = 0;
//Main countdown clock
var countDown = 75;
//User score
var score = 75;
//User highschore
var highScore = 0;
//Variable for quiz time
var quizTime;

//Iniate the quiz on click of the start button and remove the hidden class from the first group of divs

document.getElementById("start-button").addEventListener("click", event => {
  console.log("hello");
  document.getElementById("start-quiz").classList.add("d-none");
  document.getElementById("quiz-questions").classList.remove("d-none");
  setTime();
  renderQuestions();
  quizTime = setInterval(setTime, 1000);
});

//This fucntion renders the questions
function renderQuestions() {
  var questionsIndexLength = questions.length - 1;
  if (index <= questionsIndexLength) {
    document.getElementById("question").innerHTML = questions[index].title;
    renderQuestionChoices();
  }
  quizOver();
}

//This function renders the multiple-choice options on the HTML page as buttons
function renderQuestionChoices() {
  var question = questions[index].choices;
  console.log(question);
  for (var option = 0; option < question.length; option++) {
    var questionOptionsDiv = document.getElementById("question-choices");
    var questionButtons = document.createElement("button");
    questionButtons.className =
      "btn btn-outline-primary btn-lg d-flex justify-content-around";
    questionButtons.innerHTML = question[option];

    //This fires the check answer function when the user clicks a question choices button
    questionButtons.setAttribute(
      "onclick",
      "checkAnswer(" + index + "," + option + ");"
    );
    questionOptionsDiv.append(questionButtons);
  }
  quizOver();
}

//This function clears the divs in preperation for rendering the next question
function clearQuestionDiv() {
  console.log("About to clear html");
  document.getElementById("question-choices").innerHTML = "";
  quizOver();
}

//This function checks if the user selected the correct answer
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
  //Whether they get the right or wrong answer, the program continues to the next question and deducts 15 seconds from the quiz clock
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

//This function starts the countdown for the time left clock quiz timer when the user clicks the start button

function setTime() {
  document.getElementById("quiz-time").innerHTML = countDown + "sec left";
  countDown--;
  if (countDown == -1) {
    clearInterval(quizTime);
  }
  quizOver();
}

//This is a function that checks to see if these conditions are being met in other functions within the program
function quizOver() {
  if (index >= 4 || countDown <= 0) {
    document.getElementById("quiz-questions").classList.add("d-none");
    document.getElementById("all-done").classList.remove("d-none");
    document.getElementById("quiz-time").innerHTML = countDown + "sec left";
    document.getElementById("final-score").innerHTML = countDown;

    clearInterval(quizTime);
  }
}

//Event listener to fire the function that allows the user to save their initial and high score
document.getElementById("initials-button").addEventListener("click", saveScore);

//Function for saving high score and initial
function saveScore() {
  var userInitials = document.querySelector("#initial-input").value;
  var finalScore = countDown;

  //Object stores intitials and high scores
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
