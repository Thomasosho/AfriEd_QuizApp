import Quiz from './Quiz.js';

class User {
    constructor() {
        this.quizInstance = new Quiz();
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.score = 0;
        this.quizCompleted = false;

        this.timer = null;

        this.showResults();
        this.renderCurrentQuestion();
    }

    startTimer(seconds) {
        const timerElement = document.getElementById('timer');
        let remainingSeconds = seconds;

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (remainingSeconds > 0) {
                timerElement.textContent = remainingSeconds;
                remainingSeconds--;
            } else {
                clearInterval(this.timer);
                this.handleTimerCompletion();
            }
        }, 1000);
    }

    renderCurrentQuestion() {
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const timerElement = document.getElementById('timer');

        questionElement.innerHTML = '';
        optionsElement.innerHTML = '';

        if (this.currentQuestionIndex < this.quizInstance.questions.length) {
            const currentQuestion = this.quizInstance.questions[this.currentQuestionIndex];

            questionElement.textContent = currentQuestion.question;

            for (const option in currentQuestion.options) {
                const optionButton = document.createElement('button');
                optionButton.textContent = currentQuestion.options[option];
                optionButton.setAttribute('data-answer', option);
                optionButton.addEventListener('click', this.handleOptionClick.bind(this));
                optionsElement.appendChild(optionButton);
            }

            if (!this.quizCompleted) {
                this.startTimer(30);
            }
        }
    }

    handleOptionClick(event) {
        const selectedAnswer = event.target.getAttribute('data-answer');
        this.submitAnswer(selectedAnswer);
    }

    submitAnswer(selectedAnswer) {
        const options = document.querySelectorAll('.option-button');
        options.forEach(option => {
            option.disabled = true;
        });
    
        if (this.currentQuestionIndex < this.quizInstance.questions.length) {
            const currentQuestion = this.quizInstance.questions[this.currentQuestionIndex];
            const correctAnswer = currentQuestion.correct;
    
            if (selectedAnswer === correctAnswer) {
                this.score += 20;
                this.showPopup(true);
            } else {
                this.showPopup(false);
            }
    
            this.userAnswers[this.currentQuestionIndex] = selectedAnswer;
            this.currentQuestionIndex++;
    
            setTimeout(() => {
                this.renderCurrentQuestion();
                if (!this.quizCompleted) {
                    options.forEach(option => {
                        option.disabled = false;
                    });
                }
            }, 2000);
        } else {
            this.quizCompleted = true;
            this.showResults();
        }
    }    

    // submitAnswer(selectedAnswer) {
    //     const options = document.querySelectorAll('.option-button');
    //     options.forEach(option => {
    //         option.disabled = true;
    //     });

    //     if (this.currentQuestionIndex < this.quizInstance.questions.length) {
    //         const currentQuestion = this.quizInstance.questions[this.currentQuestionIndex];
    //         const correctAnswer = currentQuestion.correct;

    //         if (selectedAnswer === correctAnswer) {
    //             this.score += 20;
    //             this.showPopup(true);
    //         } else {
    //             this.showPopup(false);
    //         }

    //         this.userAnswers[this.currentQuestionIndex] = selectedAnswer;
    //         this.currentQuestionIndex++;

    //         setTimeout(() => {
    //             this.renderCurrentQuestion();
    //             if (!this.quizCompleted) {
    //                 options.forEach(option => {
    //                     option.disabled = false;
    //                 });
    //             }
    //         }, 2000);
    //     } else {
    //         this.quizCompleted = true;
    //         this.showResults();
    //         this.showRestart();
    //     }
    // }

    handleTimerCompletion() {
        this.submitAnswer(null);
    }

    showResults() {
        const resultsElement = document.getElementById('results');
        resultsElement.innerHTML = `YOUR SCORE: ${this.score}`;
    
        // if (this.quizCompleted) {
        //     const restartButton = document.createElement('button');
        //     restartButton.textContent = 'Restart Quiz';
        //     restartButton.addEventListener('click', this.restartQuiz.bind(this));
        //     resultsElement.appendChild(restartButton);
        // }
    }

    showPopup(isCorrect) {
        const popupElement = document.createElement('div');
        popupElement.className = isCorrect ? 'popup-correct' : 'popup-incorrect';
        popupElement.textContent = isCorrect ? 'Correct answer! Well done! 🤗' : 'Wrong answer... 😢';
        document.body.appendChild(popupElement);

        setTimeout(() => {
            document.body.removeChild(popupElement);
        }, 2000);
    }

    showRestart() {
        const questionElement = document.getElementById('question');
        const restartButton = document.createElement('button');

        restartButton.textContent = 'Restart Quiz';
        restartButton.addEventListener('click', this.restartQuiz.bind(this));

        questionElement.innerHTML = '';
        questionElement.appendChild(restartButton);
    }

    restartQuiz() {
        clearInterval(this.timer);
        this.timer = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.score = 0;
        this.quizCompleted = false;
        this.showResults();
        this.renderCurrentQuestion();
    }
}

export default User;
