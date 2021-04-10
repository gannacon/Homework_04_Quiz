//---------------------------------------------------------------------------
//DECLARING VARIABLES
var startButton = document.getElementById('start');
const nextButton = document.getElementById("next");
var timerEl = document.getElementById('time');
var userInitials = document.querySelector("#user-init");
var userScore = document.querySelector("#user-score");


//call the last registered user score on refresh
renderLastRegistered();

//---------------------------------------------------------------------------
//FUNCTION TO START TIMER
startButton.addEventListener('click', function(event) {
  var timeLeft = 5;
  event.preventDefault;
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      alert('Times Up!');
      showResults();
    }
  }, 1000);
});

//---------------------------------------------------------------------------
//FUNCTION TO START THE SLIDESHOW OF QUESTIONS
function homePage(){
  nextButton.style.display = 'none';
  submitButton.style.display = 'none';
  startButton.addEventListener('click', startSlide);

  function startSlide(event){
    event.preventDefault;
    startButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
    showSlide(currentSlide);
  }
}

//---------------------------------------------------------------------------
//FUNCTION TO GENERATE QUESTIONS AND ANSWERS
function buildQuiz(){
  // create variable to store the output
  const output = [];

  // for each question
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }
      output.push(
        `<div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}


//---------------------------------------------------------------------------
//FUNCTION TO SHOW RESULTS PAGE
function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;
    }

  });

  // show number of correct answers out of total
  localStorage.setItem('score', numCorrect);
  console.log(numCorrect);
  var person = prompt("Please enter your initials");
  localStorage.setItem('initials', person);
  if (person != null) {
    document.getElementById("initials").innerHTML =
    `${person} scored ${numCorrect} out of ${myQuestions.length}`;
  }
}

function renderLastRegistered() {
  // TODO: Retrieve the last email and password and render it to the page
  var initials = localStorage.getItem("initials");
  var score = localStorage.getItem("score");

  userInitials.textContent = initials;
  userScore.textContent = score;
}



//---------------------------------------------------------------------------
//FUNCTION TO SHOW SLIDES
function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;

  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

//---------------------------------------------------------------------------
//MAKE THE BUTTONS WORK WITH CLICKS OF NEXT AND SUBMIT
function showNextSlide() {
  showSlide(currentSlide + 1);
}



//---------------------------------------------------------------------------
//VARIABLES
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

//---------------------------------------------------------------------------
//QUIZ QUESTIONS
const myQuestions = [
  {
    question: "How do you call a function?",
    answers: {
      a: "run.function{};",
      b: "function();",
      c: "Brushing his teeth!"
    },
    correctAnswer: "b"
  },
  {
    question: "What is used to write to local storage in javascript",
    answers: {
      a: "setItem",
      b: "getItem",
      c: "Brushing his teeth.."
    },
    correctAnswer: "a"
  },
  {
    question: "What is used to prevent the default browser action when a button is clicked?",
    answers: {
      a: "preventAction",
      b: "stopdefault",
      c: "preventDefault",
      d: "brushingHisTeeth"
    },
    correctAnswer: "c"
  }
];

// display quiz right away
buildQuiz();

// reloads the page immediately
homePage();

//Pagination
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;


//---------------------------------------------------------------------------
//Event Listeners
submitButton.addEventListener('click', showResults);
nextButton.addEventListener("click", showNextSlide);
