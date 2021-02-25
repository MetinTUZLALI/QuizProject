const questionCounterText = document.getElementById("questionCounter")
const scoreText = document.getElementById("score")
const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"));
const timeText = document.getElementById("timeText");

let timeCounter = 10;
let availableQuesions = [];
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let score = 0;


const CORRECT_BONUS = 100/questions.length;
const MAX_QUESTIONS = questions.length;

timePrinter = () => {
    setInterval (()=>{
        timeCounter--
        timeText.innerHTML = `${timeCounter}`
        if (timeCounter==0) {
            getNewQuestion();
            timeCounter=11;
        }
        },1000 );

} 
timePrinter();


startgame = () => {
    score = 0;
    questionCounter = 0;
    availableQuesions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (questionCounter >= MAX_QUESTIONS || availableQuesions.length === 0) {
        return window.location.assign("./index.html")
    }   
    

    questionCounter++;
    questionCounterText.innerText = questionCounter+"/"+MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length)
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];
    })
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;


}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers)
            return;
            timeCounter=11;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"]
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
            
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 700);

    })
})

incrementScore = num => {
    score+=num
    scoreText.innerHTML=score;
}







startgame();

