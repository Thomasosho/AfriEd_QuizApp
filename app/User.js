import Quiz from './Quiz.js';

class User {
    constructor() {
        this.quizInstance = new Quiz();
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.score = 0;
        this.quizCompleted = false;

        this.showResults();
        this.renderCurrentQuestion();
        this.startTimer(30);
    }

    // renderCurrentQuestion() {
    //     const questionElement = document.getElementById('question');
    //     const currentQuestion = this.quizInstance.questions[this.currentQuestionIndex];

    //     let questionHtml = `
    //         <p>${currentQuestion.question}</p>
    //         <form id="answerForm">
    //     `;

    //     for (const option in currentQuestion.options) {
    //         questionHtml += `
    //             <label>
    //                 <input type="radio" name="answer" value="${option}">
    //                 ${currentQuestion.options[option]}
    //             </label>
    //         `;
    //     }

    //     if (this.currentQuestionIndex < this.quizInstance.questions.length) {
    //         questionHtml += `
    //             <br/>
    //             <button class="button" type="submit">Submit</button>
    //             </form>
    //             <div id="timer">30</div>
    //         `;
    //     }

    //     questionElement.innerHTML = questionHtml;

    //     const answerForm = document.getElementById('answerForm');
    //     answerForm.addEventListener('submit', this.submitAnswer.bind(this));

    //     this.showResults();

    //     if (this.currentQuestionIndex < this.quizInstance.questions.length) {
    //         this.startTimer(30); // Start the timer for 30 seconds
    //     }
    // }

    renderCurrentQuestion() {
        const questionElement = document.getElementById('question');
        const currentQuestion = this.quizInstance.questions[this.currentQuestionIndex];
    
        let questionHtml = `
            <p>${currentQuestion.question}</p>
            <form id="answerForm">
        `;
    
        for (const option in currentQuestion.options) {
            questionHtml += `
                <label>
                    <input type="radio" name="answer" value="${option}">
                    ${currentQuestion.options[option]}
                </label>
            `;
        }
    
        if (this.currentQuestionIndex < this.quizInstance.questions.length) {
            questionHtml += `
                <br/>
                <button class="button" type="submit">Submit</button>
                </form>
                <div id="timer">30</div>
            `;
        }
    
        questionElement.innerHTML = questionHtml;
    
        const answerForm = document.getElementById('answerForm');
        answerForm.addEventListener('submit', this.submitAnswer.bind(this));
    
        this.showResults();
    
        if (this.currentQuestionIndex < this.quizInstance.questions.length) {
            this.startTimer(30);
        } else {
            clearInterval(this.timer);
        }
    }
    

    // startTimer(seconds) {
    //     const timerElement = document.getElementById('timer');
    //     let remainingSeconds = seconds;

    //     this.timer = setInterval(() => {
    //         if (remainingSeconds > 0) {
    //             timerElement.textContent = remainingSeconds;
    //             remainingSeconds--;
    //         } else {
    //             clearInterval(this.timer);
    //             this.handleTimerCompletion();
    //         }
    //     }, 1000);
    // }
    startTimer(seconds) {
        const timerElement = document.getElementById('timer');
        let remainingSeconds = seconds;
    
        this.timer = setInterval(() => {
            if (remainingSeconds > 0) {
                timerElement.textContent = remainingSeconds;
                remainingSeconds--;
            } else {
                clearInterval(this.timer);
                if (!this.quizCompleted) {
                    this.handleTimerCompletion();
                }
            }
        }, 1000);
    }
    

    handleTimerCompletion() {
        this.submitAnswer(null);
    }

    submitAnswer(e) {
        if (e) {
            e.preventDefault();
        }

        const answerForm = document.getElementById('answerForm');
        const selectAnswer = answerForm.querySelector('input[name="answer"]:checked');

        if (selectAnswer || e === null) {
            const answerKey = selectAnswer ? selectAnswer.value : 'timeout';
            const currentQuestion = this.quizInstance.questions[this.currentQuestionIndex];
            const correctAnswer = currentQuestion.correct;

            if (answerKey === correctAnswer) {
                this.score += 20;
                window.alert('Correct answer! Well done! 🤗');
            } else if (answerKey !== 'timeout') {
                window.alert('Wrong answer... 😢');
            }
            
            this.userAnswers[this.currentQuestionIndex] = answerKey;
            this.currentQuestionIndex++;
            

            if (this.currentQuestionIndex < this.quizInstance.questions.length) {
                this.renderCurrentQuestion();
            } else {
                this.quizCompleted = true;
                this.showRestart();
            }
        }
    }

    // submitAnswer(e) {
    //     e.preventDefault();
    //     const answerForm = e.target;
    //     const selectAnswer = answerForm.querySelector('input[name="answer"]:checked');

    //     if (selectAnswer) {
    //         const answerKey = selectAnswer.value;
    //         const currentQuestion = this.quizInstance.questions[this.currentQuestionIndex];
    //         const correctAnswer = currentQuestion.correct;

    //         if (answerKey === correctAnswer) {
    //             this.score += 20;
    //             window.alert('Correct answer! Well done! 🤗');
    //         } else {
    //             window.alert('Wrong answer... 😢');
    //         }
            
    //         this.userAnswers[this.currentQuestionIndex] = answerKey;
    //         this.currentQuestionIndex++;
            

    //         if (this.currentQuestionIndex < this.quizInstance.questions.length) {
    //             this.renderCurrentQuestion();
    //         } else {
    //             // this.showResults();
    //             this.showRestart();
    //         }
    //     }
    // }

    // showResults() {
    //     const questionElement = document.getElementById('question');
    //     const resultsElement = document.getElementById('results');

    //     resultsElement.innerHTML = `YOUR SCORE: ${this.score}`;
    // };
    showResults() {
        const questionElement = document.getElementById('question');
        const resultsElement = document.getElementById('results');
    
        resultsElement.innerHTML = `YOUR SCORE: ${this.score}`;
    
        // Hide submit button if this was the last question
        const submitButton = questionElement.querySelector('button[type="submit"]');
        if (submitButton && this.currentQuestionIndex >= this.quizInstance.questions.length) {
            submitButton.style.display = 'none';
        }
    }

    showRestart() {
        const questionElement = document.getElementById('question'); // Declare questionElement
        const resultsElement = document.getElementById('results'); // Declare resultsElement

        resultsElement.innerHTML = `YOUR SCORE: ${this.score}`;

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Quiz';
        restartButton.addEventListener('click', this.restartQuiz.bind(this));
        questionElement.appendChild(restartButton);
    }

    // showRestart() {
    //     const questionElement = document.getElementById('question');
    //     const resultsElement = document.getElementById('results');
    //     const restartButton = document.createElement('button');
    
    //     resultsElement.innerHTML = `YOUR SCORE: ${this.score}`;
    
    //     restartButton.textContent = 'Restart Quiz';
    //     restartButton.id = 'restartButton';
    //     restartButton.addEventListener('click', this.restartQuiz.bind(this));
    
    //     questionElement.appendChild(restartButton);
    // }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.score = 0;
        this.renderCurrentQuestion();
        document.getElementById('show').innerHTML = '';
    }
}

export default User;
