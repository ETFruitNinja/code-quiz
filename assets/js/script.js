// when I click the start button
    // start timer
    // hide start button: change text content so start screen disappears
    // show question: change data-state from hidden to visible
// when a question is answered
    // show the next question
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
        question: 'Which of the following is the least aggressive grade for prostate cancer?',
        option1: 'Gleason 1+1=2',
        option2: 'Gleason 3+3=6',
        option3: 'Gleason 3+4=7',
        option4: 'Gleason 5+4=9',
        answer: 2
    },

    // question 2
    {
        question: 'Which treatment option for prostate cancer has the lowest side effect profile?',
        option1: 'Prostatectomy',
        option2: 'High Intensity Focused Ultrasound',
        option3: 'External Beam Therapy',
        option4: 'Brachytherapy',
        answer: 2
    },

    // question 3
    {
        question: 'Which medication is NOT used to treat erectile dysfunction?',
        option1: 'Tamsulosin',
        option2: 'Sildenafil',
        option3: 'Cialis',
        option4: 'Trimix',
        answer: 1
    },

    // question 4
    {
        question: 'Which of the following is least likely to cause hematuria (blood in urine)?',
        option1: 'Bladder cancer',
        option2: 'Prostatitis',
        option3: 'Kidney stones',
        option4: 'Kidney cancer',
        answer: 4
    },

    // question 5
    {
        question: 'Which of the following is the gold standard treatment for recurrent high-grade non-muscle invasive bladder cancer?',
        option1: 'Active surveillance',
        option2: 'Induction BCG',
        option3: 'Radical cystectomy',
        option4: 'Adjuvant chemotherapy followed by radical cystectomy',
        answer: 3
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
        question: 'Which of the following is NOT a tumor marker that is monitored in patients with testicular cancer?',
        option1: 'LDH',
        option2: 'PSA',
        option3: 'AFP',
        option4: 'b-HCG',
        answer: 2
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
        question: 'Which of the following is not a lower urinary tract symptom caused by benign prostatic hyperplasia?',
        option1: 'Urgency',
        option2: 'Nocturia (waking up at night to urinate)',
        option3: 'Retrograde ejaculation',
        option4: 'Straining to void',
        answer: 3
    },
];

// leaderboard
var leaderboard = [];

// HTML elements
var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var quizScreen = document.querySelector("#quiz-content");
var timerEl = document.querySelector("#timer");
var feedbackEl = document.querySelector("#feedback");
var endScreen = document.querySelector("#end-screen");
var scoreScreen = document.querySelector("#score-screen")

var questionEl = document.createElement("h2");
var optionList = document.createElement("section");

var option1El = document.createElement("button");
var option2El = document.createElement("button");
var option3El = document.createElement("button");
var option4El = document.createElement("button");

var scoreEl = document.createElement("h2");
var submitInfo = document.createElement("h3");
var submissionEl = document.createElement("form");
var initialsEl = document.createElement("textarea");
var scoreSubmitBtn = document.createElement("button");

var leaderboardEl = document.createElement("ul");
var clearBtn = document.createElement("button");

// initialize time and score
var timeInterval;
var timeLeft = 60;
var score = 0;

// initialize question number
var questionNumber = -1;

function endQuiz() {
    // clear timer, set quiz screen elements to blank
    clearInterval(timeInterval);
    quizScreen.textContent = "";
    timerEl.textContent = "";
    feedbackEl.textContent = "";
    endScreen.appendChild(scoreEl);
    scoreEl.textContent = "Your score was: " + score;

    // leaderboard:
    // prompt user for initials
    // input initials into local storage
    // show leaderboard
    submitInfo.textContent = "Type your initials to save your score.";
    endScreen.appendChild(submitInfo);
    endScreen.appendChild(submissionEl);
    submissionEl.appendChild(initialsEl);
    scoreSubmitBtn.textContent = "Submit";
    submissionEl.appendChild(scoreSubmitBtn);

    // code for saving score to local storage
    scoreSubmitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        
        var userInfo = {
            initials: initialsEl.value.trim(),
            score: score
        };

        console.log(userInfo);
        // retrieve leaderboard from local storage
        leaderboard = localStorage.getItem("leaderboard");
        leaderboard = JSON.parse(leaderboard);

        // add new score to retrieved list + sort
        leaderboard.push(userInfo);
        
        // add new list to local storage
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        // display leaderboard page
        showLeaderboard();
    });
}

// leaderboard display function
function showLeaderboard() {
    endScreen.textContent = "";
    scoreScreen.appendChild(leaderboardEl);
    leaderboardEl.textContent = "High Scores";
    var scoresList = localStorage.getItem("leaderboard");
    scoresList = JSON.parse(scoresList);

    // for loop to add each score to list
    for (var i = 0; i < scoresList.length; i++) {
        var score = document.createElement("li");
        leaderboardEl.appendChild(score);
        score.textContent = scoresList[i].initials + ": " + scoresList[i].score;
    }

    // add clear button to list of scores
    scoreScreen.appendChild(clearBtn);
    clearBtn.textContent = "Clear scores";

    // function to clear leaderboard
    clearBtn.addEventListener("click", function(event) {
        event.preventDefault();
        
        //clears leaderboard content in local storage
        localStorage.setItem("leaderboard", []);

        // remove all items on displayed leaderboard
        leaderboardEl.textContent = "High Scores";
    });
}


// determines whether to add to score or remove seconds from clock after selecting an option
function calculateScore(userChoice) {
    // console.log("chosen " + userChoice)
    // if correct answer
        // add 1 to score
    // else 
        // subtract 5 seconds from clock
    if (userChoice === questionList[questionNumber].answer) {
        score++;
        feedbackEl.textContent = "Correct!";
    } else {
        timeLeft = timeLeft - 5;
        feedbackEl.textContent = "Incorrect.";
    }
}

function nextQuestion() {
    questionNumber = questionNumber + 1;
    console.log(questionNumber);
    if (questionNumber >= questionList.length) {
        // ends quiz when you've exhausted entire question list
        endQuiz();
    } else {
        // change to next question
        questionEl.textContent = questionList[questionNumber].question;
        option1El.textContent = questionList[questionNumber].option1;
        option2El.textContent = questionList[questionNumber].option2;
        option3El.textContent = questionList[questionNumber].option3;
        option4El.textContent = questionList[questionNumber].option4;
    }
}

// function that sets up the quiz
function runQuiz() {
    // hide the start screen content
    startScreen.textContent="";

    // show first question
    // var questionEl = document.createElement("h2");
    quizScreen.appendChild(questionEl);

    // var optionList = document.createElement("ol");
    quizScreen.appendChild(optionList);

    // show timer
    timerEl.textContent = "Time Remaining: " + timeLeft;

    // var option1El = document.createElement("button");
    // var option2El = document.createElement("button");
    // var option3El = document.createElement("button");
    // var option4El = document.createElement("button");
    optionList.appendChild(option1El);
    optionList.appendChild(option2El);
    optionList.appendChild(option3El);
    optionList.appendChild(option4El);

    // listens for clicks among any of the options
    optionList.addEventListener("click", function(event) {
        var element = event.target;
        console.log("answer clicekd")
        // calculate score/time from each answer choice
        if (element === option1El) {
            calculateScore(1);
        } else if (element === option2El) {
            calculateScore(2);
        } else if (element === option3El) {
            calculateScore(3);
        } else if (element === option4El) {
            calculateScore(4);
        }
        // add one to the question number and switch to next question
        nextQuestion();
    });

    // timer function
    timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = "Time Remaining: " + timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = "Time's Up!";
            // function to show score screen
            endQuiz();
        }
    }, 1000);

    // click button for next question event
    nextQuestion();
}

// quiz begins when you click on the start button
startBtn.addEventListener("click", runQuiz);