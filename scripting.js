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
let shuffledQuestions = [];

// Shuffle array function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'none';
    });
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
    
    // Reset and show start screen when entering a category
    if (sectionId === 'math' || sectionId === 'english' || sectionId === 'java') {
        showStartScreen(sectionId);
    }
}

function showStartScreen(category) {
    currentQuiz = category;
    currentQuestion = 0;
    score = 0;
    
    const section = document.getElementById(category);
    const startContainer = section.querySelector('.start-container');
    const quizContainer = section.querySelector('.quiz-container');
    const resultContainer = section.querySelector('.result-container');
    
    if (startContainer) startContainer.style.display = 'block';
    if (quizContainer) quizContainer.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
}

function startQuiz(category) {
    if (category) {
        currentQuiz = category;
    }
    
    // Shuffle questions randomly
    shuffledQuestions = shuffleArray(quizData[currentQuiz]);
    
    currentQuestion = 0;
    score = 0;
    
    const section = document.getElementById(currentQuiz);
    const startContainer = section.querySelector('.start-container');
    const quizContainer = section.querySelector('.quiz-container');
    const resultContainer = section.querySelector('.result-container');
    
    if (startContainer) startContainer.style.display = 'none';
    if (quizContainer) quizContainer.style.display = 'block';
    if (resultContainer) resultContainer.style.display = 'none';
    
    showQuestion();
}

function showQuestion() {
    const questions = shuffledQuestions;
    const section = document.getElementById(currentQuiz);
    const quizContainer = section.querySelector('.quiz-container');
    
    if (!quizContainer || currentQuestion >= questions.length) {
        showResults();
        return;
    }
    
    const q = questions[currentQuestion];
    const questionNum = quizContainer.querySelector('.question-num');
    const questionText = quizContainer.querySelector('.question-text');
    const optionsContainer = quizContainer.querySelector('.options-container');
    
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
    const questions = shuffledQuestions;
    const correctIndex = questions[currentQuestion].correct;
    
    const section = document.getElementById(currentQuiz);
    const optionsContainer = section.querySelector('.options-container');
    const options = optionsContainer.querySelectorAll('.option-btn');
    
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
    const section = document.getElementById(currentQuiz);
    const quizContainer = section.querySelector('.quiz-container');
    const resultContainer = section.querySelector('.result-container');
    const scoreText = resultContainer.querySelector('.score-text');
    const finalScore = resultContainer.querySelector('.final-score');
    
    if (quizContainer && resultContainer) {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Determine feedback based on score
        let feedback = "";
        if (score >= 9) {
            feedback = "Excellent! 🌟";
        } else if (score >= 7) {
            feedback = "Very Good! 👍";
        } else if (score >= 5) {
            feedback = "Nice! 😊";
        } else if (score >= 3) {
            feedback = "Good Try! 💪";
        } else {
            feedback = "Very Bad 😢";
        }
        
        if (scoreText) {
            scoreText.textContent = feedback;
        }
        
        if (finalScore) {
            finalScore.textContent = `Total Points: ${score} / 10`;
        }
    }
}

function restartQuiz() {
    startQuiz();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    function showSection(sectionId) {
        document.querySelectorAll('section').forEach(sec => {
            sec.style.display = 'none';
        });
        const section = document.getElementById(sectionId);
        if (section) section.style.display = 'block';
        
        // Reset and show start screen when entering a category
        if (sectionId === 'math' || sectionId === 'english' || sectionId === 'java') {
            showStartScreen(sectionId);
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
