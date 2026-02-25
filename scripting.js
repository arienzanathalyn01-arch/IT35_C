// Quiz Data - 10 Questions per Category
const quizData = {
    math: [
        { question: "What is 15 + 27?", options: ["40", "42", "44", "46"], correct: 1 },
        { question: "What is 8 × 7?", options: ["54", "56", "58", "60"], correct: 1 },
        { question: "What is 144 ÷ 12?", options: ["10", "11", "12", "14"], correct: 2 },
        { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], correct: 2 },
        { question: "What is 2³?", options: ["6", "8", "9", "12"], correct: 1 },
        { question: "What is 100 - 37?", options: ["63", "62", "61", "64"], correct: 0 },
        { question: "What is 3/4 as a decimal?", options: ["0.25", "0.50", "0.75", "0.80"], correct: 2 },
        { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
        { question: "What is the next prime after 7?", options: ["9", "10", "11", "13"], correct: 2 },
        { question: "What is 5² + 3²?", options: ["34", "36", "38", "40"], correct: 0 }
    ],
    english: [
        { question: "Which word is a synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
        { question: "Which is the correct plural of 'child'?", options: ["Childs", "Children", "Childrens", "Childern"], correct: 1 },
        { question: "Which sentence is correct?", options: ["She don't know", "She doesn't know", "She not know", "She no know"], correct: 1 },
        { question: "What is the antonym of 'ancient'?", options: ["Old", "Historic", "Modern", "Classic"], correct: 2 },
        { question: "Which word is a noun?", options: ["Run", "Beautiful", "Happiness", "Quickly"], correct: 2 },
        { question: "What is the past tense of 'go'?", options: ["Goes", "Went", "Gone", "Going"], correct: 1 },
        { question: "Which is a proper noun?", options: ["city", "Paris", "river", "country"], correct: 1 },
        { question: "What type of sentence is 'Stop!'?", options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"], correct: 2 },
        { question: "Which word means 'to make something better'?", options: ["Worsen", "Improve", "Destroy", "Ignore"], correct: 1 },
        { question: "What is the possessive form of 'dog'?", options: ["Dogs", "Dog's", "Dogz", "Doges"], correct: 1 }
    ],
    java: [
        { question: "Which keyword is used to define a class in Java?", options: ["struct", "class", "define", "object"], correct: 1 },
        { question: "What is the correct way to print in Java?", options: ["print()", "System.out.println()", "echo()", "printf()"], correct: 1 },
        { question: "Which data type is used for whole numbers?", options: ["double", "int", "float", "char"], correct: 1 },
        { question: "How do you start a single-line comment?", options: ["//", "/*", "**", "#"], correct: 0 },
        { question: "Which operator is used for equality comparison?", options: ["=", "==", "!=", "==="], correct: 1 },
        { question: "What is the output of System.out.println(2 + 2)?", options: ["2+2", "4", "22", "Error"], correct: 1 },
        { question: "Which keyword creates a new object?", options: ["new", "create", "make", "build"], correct: 0 },
        { question: "What is the default value of an int variable?", options: ["0", "1", "null", "undefined"], correct: 0 },
        { question: "Which loop checks condition first?", options: ["do-while", "for", "while", "foreach"], correct: 2 },
        { question: "What is a method?", options: ["A variable", "A function", "A class", "A comment"], correct: 1 }
    ]
};

// Quiz State
let currentQuiz = null;
let currentQuestion = 0;
let score = 0;

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'none';
    });
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
    
    // Reset quiz when entering a category
    if (sectionId === 'math' || sectionId === 'english' || sectionId === 'java') {
        initQuiz(sectionId);
    }
}

function initQuiz(category) {
    currentQuiz = category;
    currentQuestion = 0;
    score = 0;
    
    const quizContainer = document.getElementById('quiz-container');
    const quizContent = document.getElementById('quiz-content');
    const resultContainer = document.getElementById('result-container');
    
    if (quizContainer && quizContent && resultContainer) {
        quizContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        showQuestion();
    }
}

function showQuestion() {
    const questions = quizData[currentQuiz];
    const quizContent = document.getElementById('quiz-content');
    
    if (!quizContent || currentQuestion >= questions.length) {
        showResults();
        return;
    }
    
    const q = questions[currentQuestion];
    const questionNum = document.getElementById('question-num');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    
    if (questionNum) questionNum.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    if (questionText) questionText.textContent = q.question;
    
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.onclick = () => selectAnswer(index);
            optionsContainer.appendChild(btn);
        });
    }
}

function selectAnswer(selectedIndex) {
    const questions = quizData[currentQuiz];
    const correctIndex = questions[currentQuestion].correct;
    
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correctIndex) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            btn.classList.add('wrong');
        }
    });
    
    if (selectedIndex === correctIndex) {
        score++;
    }
    
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1000);
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const scoreText = document.getElementById('score-text');
    const finalScore = document.getElementById('final-score');
    
    if (quizContainer && resultContainer) {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        
        if (scoreText) {
            const percentage = (score / 10) * 100;
            if (percentage >= 80) {
                scoreText.textContent = "Excellent! 🎉";
            } else if (percentage >= 60) {
                scoreText.textContent = "Good Job! 👍";
            } else {
                scoreText.textContent = "Keep Practicing! 💪";
            }
        }
        
        if (finalScore) {
            finalScore.textContent = `You scored ${score} out of 10`;
        }
    }
}

function restartQuiz() {
    initQuiz(currentQuiz);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    function showSection(sectionId) {
        document.querySelectorAll('section').forEach(sec => {
            sec.style.display = 'none';
        });
        const section = document.getElementById(sectionId);
        if (section) section.style.display = 'block';
        
        // Reset quiz when entering a category
        if (sectionId === 'math' || sectionId === 'english' || sectionId === 'java') {
            initQuiz(sectionId);
        }
    }
    showSection('home');
    
    document.querySelectorAll('.side-menu a, .home-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            const id = this.getAttribute('href').replace('#', '');
            if (document.getElementById(id)) {
                e.preventDefault();
                showSection(id);
                document.getElementById('sideMenu').classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    openMenu.onclick = function() {
        sideMenu.classList.add('open');
        document.body.classList.add('menu-open');
    };
    closeMenu.onclick = function() {
        sideMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
    };
    document.addEventListener('click', function(e) {
        if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && e.target !== openMenu) {
            sideMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });
});
