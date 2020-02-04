let score = 0;
let questionNumber = 0;
//MAIN Functions
//Quiz Start//Generate question//sellect answer//user feedback for correct and wrong// finall page
//SUPORTING Functions
//Add to score//Add question//Next button//Restartbutton//Submit button//Run functions//
//Global Vars: score, question number

//Note: the value of questionNumber is set to 0 only for the array. By default the text will display at 1;

function startQuiz (){
  $('.startButton').on('click', (event)=>{
  $('.quizStart').css('display','none');
  $('.questionForm').css('display','block');
  $('footer ul').css('display','block');
  createQuestion();
  selectAnswer()
  });
}

//Goes into object QUESTIONS, grab [array number] and sellect .question to display in h2
//value uses' infromation stored for that answer, the span holds the text 
//QUESTIONS[questionNumber].answers.length is grabbing the number of answers for question
function createQuestion(){
  if (questionNumber<QUESTIONS.length){
    let newHTML = '';
    for (let i = 0; i < QUESTIONS[questionNumber].answers.length; i ++){
      newHTML += `<label class='answerOption'>
                    <input type='radio' value='${QUESTIONS[questionNumber].answers[i]}' name='answer' required>
                    <span>${QUESTIONS[questionNumber].answers[i]}</span>
                  </label>`
    }

    $('.questionForm').html(`<div class='question'>
    <h2>${QUESTIONS[questionNumber].question}</h2>
    <form>
    <fieldset>
    ${newHTML}
    <button type='submit' class='submitButton'>Submit</button>
    </fieldset>
    </form>
    </div>`);
} else {
    results();
    resetPage();
    $('.questionNumber').text(10)
  }
}

function selectAnswer(){
  $('form').on('submit',(event)=>{
    event.preventDefault();
    let answer = $('input:checked').val();
    let correctAnswer = `${QUESTIONS[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      //add to array then text
      score ++;
      $('.score').text(score);
      displayCorrect();
    }
    else {
      displayWrong();
    }
  });
}

//html will delete previous text with new
function displayCorrect(){
let correctAnswer = `${QUESTIONS[questionNumber].correctAnswer}`;
$('.questionForm').html(`<div class="correctFeedback"><div class="icon"><p><b>CORRECT!</b></p><img src="${QUESTIONS[questionNumber].giff}" alt="${QUESTIONS[questionNumber].alt}"/></div><p><span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function displayWrong(){
let correctAnswer = `${QUESTIONS[questionNumber].correctAnswer}`;
$('.questionForm').html(`<div class="correctFeedback"><div class="icon"><p><b>Wrong!</b></p><img src="${QUESTIONS[questionNumber].giff}" alt="${QUESTIONS[questionNumber].alt}"/></div><p>The corect answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function nextQuestion(){
  $('main').on('click','.nextButton',(event)=>{
    //represents array value
    questionNumber ++;
    //represents text value which is 1 behind because it started at 0
    $('.questionNumber').text(questionNumber+1);
    createQuestion();
    selectAnswer();
  });
}

function results(){
if (score >=8){
  $('.questionForm').html(`<div class="correctFeedback"><h3>Phenomenal work! </h3>
  <img src="https://media.giphy.com/media/3z4Wju1DmiRoI/giphy.gif" alt="Batman Eating"/>
  <p>You got ${score} /10</p><p>May your friends and Mom proudly call you Batman!</p>
  <button class="restartButton">Restart Quiz</button></div>`);
  } else if (score<8 && score>=5){
  $('.questionForm').html(`<div class="correctFeedback">
  <h3>I dont know about Batman</h3>
  <img src="https://i.imgur.com/N1qnHsO.png" alt="Robin is Wowed"/>
  <p>You got ${score} /10</p><p>But you sure would make a good Robin!</p>
  <button class="restartButton">Restart Quiz</button></div>`);
  } else {
  $('.questionForm').html(`<div class=" correctFeedback"><h3>Yikes!</h3>
  <img src="https://media.giphy.com/media/fHxgDPtfCpd5u/giphy.gif" alt="Batman shooting gun"/>
  <p>You only got ${score} /10</p><p>I think you need help.</p>
  <button class="restartButton">Restart Quiz</button></div>`);
  }
}
// Better then using location.reload();???
function resetPage(){
  $('.restartButton').on('click',(event)=>{
  $('.quizStart').css('display','block');
  $('.questionForm').css('display','none');
  $('footer ul').css('display','none');
  createQuestion();
  selectAnswer()
  score = 0;
  $('.score').text(0);
  questionNumber = 0;
  $('.questionNumber').text(1);
  });
}

// Better of worse to have functions activate at start of page or Manually chained by each other
// Better to make add point and add question a function?
function quizApp(){
$(startQuiz);
$(nextQuestion);
$(createQuestion);
$(selectAnswer);
}
$(quizApp);

