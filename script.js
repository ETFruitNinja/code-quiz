// when I click the start button
    // start timer
    // hide start button: change text content so start screen disappears
    // show question: change data-state from hidden to visible
// when a question is answered
    // show the next question (using for loop)
// if a question is answered incorrectly
    // subtract time from the clock
// when all questions are answered or when the timer hits zero
    // end the game
// when the game is over
    // give option to save initials and score

// question list
var questionList = [
    // question 1
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 1
    },

    // question 2
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 2
    },

    // question 3
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 3
    },

    // question 4
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 4
    },

    // question 5
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 4
    },

    // question 6
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 4
    },

    // question 7
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 4
    },

    // question 8
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 4
    },

    // question 9
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 4
    },

    // question 10
    {
        question: 'question',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3',
        option4: 'option 4',
        answer: 4
    },
];

var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var quizScreen = document.querySelector("#quiz-content");
var timerEl = document.querySelector("#timer");

// var questionEl = document.querySelector("#question");
// var option1El = document.querySelector("#option-1");
// var option2El = document.querySelector("#option-2");
// var option3El = document.querySelector("#option-3");
// var option4El = document.querySelector("#option-4");

// quizScreen.hidden = true;

function runQuiz() {
    // hide the start screen content
    startScreen.textContent="";
    // quizScreen.hidden = false;

    // show first question
    var questionEl = document.createElement("h2");
    quizScreen.appendChild(questionEl);

    var optionList = document.createElement("ol");
    quizScreen.appendChild(optionList);

    var option1El = document.createElement("button");
    var option2El = document.createElement("button");
    var option3El = document.createElement("button");
    var option4El = document.createElement("button");
    optionList.appendChild(option1El);
    optionList.appendChild(option2El);
    optionList.appendChild(option3El);
    optionList.appendChild(option4El);

    // timer function
    var timeLeft = 60;

    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = "Time Remaining: " + timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = "Time's Up!";
            clearInterval(timeInterval);
            // function to show score screen
        }
    }, 1000);

    // for loop to show questions
    for (var i = 0; i < questionList.length; i++) {
        questionEl.textContent = questionList[i].question;
        option1El.textContent = questionList[i].option1;
        option2El.textContent = questionList[i].option2;
        option3El.textContent = questionList[i].option3;
        option4El.textContent = questionList[i].option4;
    }
}

startBtn.addEventListener("click", runQuiz);