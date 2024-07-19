let colors = ["red", "green", "blue", "yellow"];
let colorMap = { r: "red", g: "green", b: "blue", y: "yellow"};
let currentColor = "";
let currentAnswer = "";
let startTime;
let results = [];
let currentQuestion = 0;
let totalQuestions = 20; // Change this value to set number of questions

document.addEventListener('keydown', function(event) {
    if (colorMap[event.key]) {
        currentAnswer = colorMap[event.key];
    }
    if (event.key === 'l' || event.key === 'L') {
        submitColor();
    }
});

function startTest() {
    document.getElementById('test-section').style.display = 'none';
    document.getElementById('color-section').style.display = 'block';
    results = [];
    currentQuestion = 0;
    showRandomColor();
}

function showRandomColor() {
    currentColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('color-circle').style.backgroundColor = currentColor;
    document.getElementById('color-name').innerText = '';
    currentAnswer = "";
    startTime = new Date().getTime();
}

function submitColor() {
    let endTime = new Date().getTime();
    let timeTaken = (endTime - startTime) / 1000;
    let isCorrect = currentAnswer === currentColor;

    results.push({
        question: currentQuestion + 1,
        color: currentColor,
        answer: currentAnswer,
        result: isCorrect ? "Right" : "Wrong",
        time: timeTaken
    });

    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        showRandomColor();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('color-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';

    let tbody = document.getElementById('result-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    results.forEach(result => {
        let row = tbody.insertRow();
        row.insertCell(0).innerText = result.question;
        row.insertCell(1).innerText = result.color;
        row.insertCell(2).innerText = result.answer;
        row.insertCell(3).innerText = result.result;
        row.insertCell(4).innerText = result.time.toFixed(2);
    });
}

function restartTest() {
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('test-section').style.display = 'block';
}
