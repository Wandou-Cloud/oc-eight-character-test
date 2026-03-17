import { questions } from './questions.js';
import { generateResult } from './bazi_logic.js';


let currentQuestionIndex = 0;
let userScores = {};


const views = {
    start: document.getElementById('view-start'),
    question: document.getElementById('view-question'),
    result: document.getElementById('view-result')
};

const btnStart = document.getElementById('btn-start');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const qIndexDisplay = document.getElementById('q-index-display');


lucide.createIcons();


const numToChinese = (num) => {
    const chars =['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    if (num <= 10) return chars[num];
    if (num < 20) return '十' + (num % 10 === 0 ? '' : chars[num % 10]);
    const tens = chars[Math.floor(num / 10)];
    const units = num % 10 === 0 ? '' : chars[num % 10];
    return tens + '十' + units;
};


function switchView(fromView, toView, callback) {
    gsap.to(fromView, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
            fromView.classList.add('hidden');
            toView.classList.remove('hidden');
            gsap.fromTo(toView, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, onComplete: callback }
            );
        }
    });
}


function renderQuestion() {
    const q = questions[currentQuestionIndex];
    

    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;
    qIndexDisplay.innerText = numToChinese(currentQuestionIndex + 1);


    gsap.to([questionText, optionsContainer], {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
            questionText.innerText = q.question;
            optionsContainer.innerHTML = '';
            
            q.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn font-sans';

                btn.style.opacity = 0;
                btn.innerHTML = `<span>${String.fromCharCode(65 + idx)}. ${opt.text}</span>`;
                
                btn.onclick = () => handleOptionSelect(opt.scores);
                optionsContainer.appendChild(btn);
            });

            gsap.to([questionText, ...optionsContainer.children], {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.4,
                clearProps: "all"
            });
        }
    });
}


function handleOptionSelect(scores) {

    for (const [key, val] of Object.entries(scores)) {
        userScores[key] = (userScores[key] || 0) + val;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        progressBar.style.width = '100%';
        finishTest();
    }
}


function finishTest() {
    const result = generateResult(userScores);
    

    document.getElementById('res-month-stem').innerText = result.pillars.month[0];
    document.getElementById('res-month-branch').innerText = result.pillars.month[1];
    document.getElementById('res-day-stem').innerText = result.pillars.day[0];
    document.getElementById('res-day-branch').innerText = result.pillars.day[1];
    document.getElementById('res-hour-stem').innerText = result.pillars.hour[0];
    document.getElementById('res-hour-branch').innerText = result.pillars.hour[1];
    
    document.getElementById('res-character').innerText = result.character;
    document.getElementById('res-reading').innerText = result.reading;

    switchView(views.question, views.result, () => {

        gsap.from("#view-result > div", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "power2.out"
        });
    });
}


btnStart.addEventListener('click', () => {
    switchView(views.start, views.question, () => {
        renderQuestion();
    });
});
