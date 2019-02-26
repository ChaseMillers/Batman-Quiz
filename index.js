let questionNumber = 0;
let score = 0;

// MAKE THE QUESTION
function generateQuestion () {
  if (questionNumber < STORE.length) {
    $('.questionAnswerForm').html (`<div class="question">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`);
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

//increment score
function changeScore () {
  // tells score to add 1
  score ++;
  // updates actuall text 
  $('.score').text(score);
}

//Quiz starts// removes .quizStart// turns on .questionAnswerForm and footer// starts off at question number 1
function startQuiz () {
  $('.quizStart').on('click', '.startButton', (event) =>{
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('footer ul').css('display', 'block');
    $('.questionNumber').text(1);
});
}

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', (event) => {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      userAnswerFeedbackCorrect();
      changeScore();
    } else {
      userAnswerFeedbackWrong();
    }
  });
}

//user feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><p><b>CORRECT!</b></p><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  // let iconImage = `${STORE[questionNumber].icon}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><p><b>WRONG!</b></p><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p>The correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

//when quiz is over this is the html for the page
function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="correctFeedback"><h3>Phenomenal work! </h3><img src="https://media.giphy.com/media/3z4Wju1DmiRoI/giphy.gif" alt="Batman Eating"/><p>You got ${score} /10</p><p>May your friends and Mom proudly call you Batman!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="correctFeedback"><h3>I dont know about Batman</h3><img src="https://media.giphy.com/media/MoBklgH66BKxi/giphy.gif" alt="Robin is Wowed"/><p>You got ${score} /10</p><p>But you sure would make a good Robin!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class=" correctFeedback"><h3>Yikes!</h3><img src="https://media.giphy.com/media/fHxgDPtfCpd5u/giphy.gif" alt="Batman shooting gun"/><p>You only got ${score} /10</p><p>I think you need help.</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

//what happens when the user clicks next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', (event)=>{
    // reprents actuall value
    questionNumber ++;
    // represents text
    $('.questionNumber').text(questionNumber+1);
    generateQuestion();
    userSelectAnswer();
  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', (event)=>{
    location.reload();
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
  generateQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
