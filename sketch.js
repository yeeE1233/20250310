let table;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let radio;
let submitButton;
let question;
let resultText;
let restartButton;
let input;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#fefae0");

  // 顯示題目
  question = createP('');
  question.position(width / 2 - 100, height / 2 - 150);
  question.style('font-size', '30px');

  // 建立選擇題
  radio = createRadio();
  radio.position(width / 2 - 50, height / 2 - 50);
  radio.style('width', '600px');
  radio.style('font-size', '30px');

  // 建立填充題輸入框
  input = createInput();
  input.position(width / 2 - 50, height / 2 - 50);
  input.style('width', '600px');
  input.style('font-size', '30px');
  input.hide();

  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.position(width / 2 - 20, height / 2 + 20);
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(handleSubmit);

  // 建立結果文字
  resultText = createP('');
  resultText.position(width / 2 - 50, height / 2 + 60);
  resultText.style('font-size', '30px');

  loadQuestion();
}

function draw() {
  // 保持背景顏色
  background("#fefae0");
  fill(0);
  textSize(20);
  text(`答對題數: ${correctCount}`, 10, 30);
  text(`答錯題數: ${incorrectCount}`, 10, 60);
  text('412737099張重益', 10, 90);
}

function loadQuestion() {
  if (currentQuestionIndex < table.getRowCount()) {
    let row = table.getRow(currentQuestionIndex);
    question.html(row.get('question'));
    if (currentQuestionIndex === 3) {
      // 第四題為填充題
      radio.hide();
      input.show();
      input.value('');
    } else {
      // 其他題目為選擇題
      radio.show();
      input.hide();
      radio.elt.innerHTML = ''; // 清空選項
      radio.option(row.get('option1'));
      radio.option(row.get('option2'));
      radio.option(row.get('option3'));
      radio.option(row.get('option4'));
    }
  } else {
    showFinalResult();
  }
}

function handleSubmit() {
  let selectedOption;
  let row = table.getRow(currentQuestionIndex);
  if (currentQuestionIndex === 3) {
    // 第四題為填充題
    selectedOption = input.value();
    if (selectedOption === '10') {
      background("#66FF59"); // 綠色背景
      resultText.html('答對了');
      correctCount++;
    } else {
      background("#e63946"); // 紅色背景
      resultText.html('答錯了');
      incorrectCount++;
    }
  } else {
    // 其他題目為選擇題
    selectedOption = radio.value();
    if (selectedOption === row.get('answer')) {
      background("#66FF59"); // 綠色背景
      resultText.html('答對了');
      correctCount++;
    } else {
      background("#e63946"); // 紅色背景
      resultText.html('答錯了');
      incorrectCount++;
    }
  }
  console.log('你選擇了: ' + selectedOption);
  currentQuestionIndex++;
  setTimeout(loadQuestion, 2000); // 2秒後顯示下一題
}

function showFinalResult() {
  background("#fefae0");
  question.html('測驗結束');
  radio.hide();
  input.hide();
  submitButton.hide();
  resultText.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);

  // 建立重新開始按鈕
  restartButton = createButton('重新開始');
  restartButton.position(width / 2 - 50, height / 2 + 120);
  restartButton.style('font-size', '30px');
  restartButton.mousePressed(restartQuiz);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  radio.show();
  submitButton.show();
  resultText.html('');
  restartButton.remove();
  loadQuestion();
}
