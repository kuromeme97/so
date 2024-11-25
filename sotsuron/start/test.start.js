'use strict'

let explain_json = {};
let randomIndices = [];
let current_question = 0;

// ページロード時に JSON ファイルをフェッチ
fetch('start.json')
.then(response => response.json())
.then(data => {
    explain_json = data;
    console.log('JSON データを読み込みました');
    const wordsArray = data[0].words;
    const totalWords = wordsArray.length;

    // ランダムな10個のインデックスを取得
    while (randomIndices.length < 10) {
      const randomIndex = Math.floor(Math.random() * totalWords) + 1;
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    console.log(randomIndices);
    createresult();
    createquestion();
})
.catch(error => {
    console.error('JSON ファイルの読み込みに失敗しました:', error);
});

  // 変数定義
    const CLASS = "-active";
    let flg = false;
    let accordionFlg = false;
    let hamburger = document.getElementById("js-hamburger");
    let focusTrap = document.getElementById("js-focus-trap");
    let menu = document.querySelector(".js-nav-area");
    let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
    let accordion = document.querySelectorAll(".js-sp-accordion");

function check(){
  const radios = document.querySelectorAll('input[name="select"]');
  var selectedRadio;
  for (const radio of radios) {
    if (radio.checked) {
      selectedRadio = radio;
      return selectedRadio;
    }
  }
}

function getSelectedText() {
  const select = document.getElementsByName('select');
  for (let i = 0; i < select.length; i++) {
    if (select[i].checked) {
      // ラベル要素を取得してテキストを取得する
      const label = select[i].nextElementSibling;
      // テキストを返す
      return label.textContent;
    }
  }
  // どれもし選択されていない場合の処理（任意）
  return "何も選択されていません";
}



var closeBtn = document.getElementById('closeBtn');
var closelast = document.getElementById('closelast');
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
  const b = document.getElementById("main-container");
  b.style.pointerEvents = 'auto';
  createresult();
  createquestion();
});
closelast.addEventListener('click', function(){
  modal.style.display = 'none';
  const b = document.getElementById("main-container");
  b.style.pointerEvents = 'auto';
  createresult();
  last();
});


function findWord(data, wordToFind){
  for (const element of data) {
      const foundWord = element.words.find(word => word.id === wordToFind);
      if (foundWord) {
          return foundWord;
      }
  }
    return null; // 見つからなかった場合
}

function createresult(){
  const currentId = String(randomIndices[current_question]);
  const targetQuestion = findWord(explain_json, currentId);
  
  console.log("作成iareb" + targetQuestion);
  console.log("作成しました" + currentId);
  if (targetQuestion) {//resultが存在する場合
    console.log("result" + currentId);
    const template_trueorfalse = document.getElementById("trueorfalse-template");
    const clone_trueorfalse = template_trueorfalse.content.cloneNode(true);

    const torf_number_place = clone_trueorfalse.querySelector('#torf-number');
    torf_number_place.textContent = current_question + 1;
    const torf_mark_place = clone_trueorfalse.querySelector('#torf-mark');
    torf_mark_place.textContent = targetQuestion.korean;
    const torf_korean_place = clone_trueorfalse.querySelector('#torf-korean');
    torf_korean_place.textContent = targetQuestion.korean;
    const torf_checked_place = clone_trueorfalse.querySelector("#torf-checked");
    console.log(torf_checked_place);

    const elementcheck = check();
    console.log(elementcheck); 
    if(elementcheck){
      torf_checked_place.textContent = elementcheck.nextElementSibling.textContent;
    }else{
      torf_checked_place.textContent = "未回答";
    }

    document.getElementById('trueorfalse-container').appendChild(clone_trueorfalse);
  } else {
    console.log("targetQuestion が null または undefined です");
  }
}

function createquestion(){
  if(current_question >= 9){
    document.getElementById("next-question").style.display = 'none';
    document.getElementById("closeBtn").style.display = 'none';
    document.getElementById("last").style.display = 'block';
    document.getElementById("closelast").style.display = 'block';
  }

  //挿入場所を白紙に
  const mainQuestionCon = document.getElementById("main-question-container");
  mainQuestionCon.innerHTML = '';
  console.log(explain_json);
  //テンプレート複製
  const template_questions = document.getElementById("template-questions");
  const clone_questions = template_questions.content.cloneNode(true);
  const currentId = String(randomIndices[current_question]);
  const targetQuestion = findWord(explain_json, currentId);

  if (targetQuestion) {//resultが存在する場合
    console.log(targetQuestion);
    const number_place = clone_questions.querySelector('#question-number');
    number_place.textContent = current_question + 1;
    const korean_questions_place = clone_questions.querySelector('#korean-questions');
    const highlightRegex = new RegExp(targetQuestion.highlight, 'g');
    const highlightedQuestion = targetQuestion.question.replace(highlightRegex, `<span class="highlight">$&</span>`);
    korean_questions_place.innerHTML = highlightedQuestion;
    const ans_A_place = clone_questions.querySelector('#ans_A');
    ans_A_place.textContent = targetQuestion.answer_a;
    const ans_B_place = clone_questions.querySelector('#ans_B');
    ans_B_place.textContent = targetQuestion.answer_b;
    const ans_C_place = clone_questions.querySelector('#ans_C');
    ans_C_place.textContent = targetQuestion.answer_c;
    const ans_D_place = clone_questions.querySelector('#ans_D');
    ans_D_place.textContent = targetQuestion.answer_d;

    const word = document.getElementById("word-container");
    word.textContent = targetQuestion.korean;
    const japan = document.getElementById("japan-container");
    japan.textContent = targetQuestion.answer_japan;
    const question = document.getElementById("question-container");
    question.textContent = targetQuestion.question;
  
  } else {
    console.log("targetQuestion が null または undefined です");
  }
    
  console.log(clone_questions);
  clone_questions.querySelector('div').style.display = 'block';
  document.getElementById('main-question-container').appendChild(clone_questions);
  
  current_question ++;
}

function display(){
  document.getElementById("torf").classList.remove();
  
  const elementcheck = check();
  if (elementcheck) {
    const selectedAnswer = elementcheck.nextElementSibling.textContent;
    console.log(selectedAnswer); // 選択された答えを表示
    // ここで、selectedAnswerを任意の変数に格納して利用できます。
    // 例
    const correct = document.getElementById("word-container");
    console.log(correct.textContent);
    
    if(selectedAnswer === correct.textContent){
      console.log("seikai");
      document.getElementById("torf").classList.remove('circle');
      document.getElementById("torf").classList.remove('cross');
      document.getElementById("torf").classList.add('circle');
    } else {
      console.log("huseikai");
      document.getElementById("torf").classList.remove('circle');
      document.getElementById("torf").classList.remove('cross');
      document.getElementById("torf").classList.add('cross');
    }
  } else {
    console.log('何も選択されていません');
  }

  
  modal.style.display = 'block';
  const a = document.getElementById("main-container");
  a.style.pointerEvents = 'none';
}

function next(){
  console.log("nextかっこ");
  createresult();
  createquestion();
}

function last(){
  createresult();
  console.log("lastかっこ");
  const mainQuestionContainer = document.getElementById("main-question-container");
  const trueOrFalseContainer = document.getElementById("trueorfalse-container");
  const displayExplanation = document.getElementById("display-explanation");
  const last = document.getElementById("last");
  const questionnaire = document.getElementById("tosurvey");

  mainQuestionContainer.querySelector('div').style.display = 'none';
  displayExplanation.style.display = 'none';
  last.style.display = 'none';
  trueOrFalseContainer.style.display = 'block';
  questionnaire.style.display = 'block';
}