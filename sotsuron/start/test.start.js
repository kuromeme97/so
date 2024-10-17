'use strict'

let explain_json = {};
let randomIndices = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33];//,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33
let current_question = 0;

// ページロード時に JSON ファイルをフェッチ
fetch('start.json')
.then(response => response.json())
.then(data => {
    explain_json = data;
    console.log('JSON データを読み込みました');
    /*
    const wordsArray = data[0].words;
    const totalWords = wordsArray.length;

    // ランダムな10個のインデックスを取得
    //const randomIndices = [];
    while (randomIndices.length < 10) {
      const randomIndex = Math.floor(Math.random() * totalWords);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    console.log(randomIndices);
    */
})
.catch(error => {
    console.error('JSON ファイルの読み込みに失敗しました:', error);
});

const backgroundFix = (bool) => {
    const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase();
    if ("scrollingElement" in document) return document.scrollingElement;
    return document.documentElement;
    };
    const scrollY = bool? scrollingElement().scrollTop: parseInt(document.body.style.top || "0");
    const fixedStyles = {
        height: "100vh",
        position: "fixed",
        top: `${scrollY * -1}px`,
        left: "0",
        width: "100vw"
    };
    Object.keys(fixedStyles).forEach((key) => {
        document.body.style[key] = bool ? fixedStyles[key] : "";
    });
    if (!bool) {
      window.scrollTo(0, scrollY * -1);
    }
};

  // 変数定義
    const CLASS = "-active";
    let flg = false;
    let accordionFlg = false;
    let hamburger = document.getElementById("js-hamburger");
    let focusTrap = document.getElementById("js-focus-trap");
    let menu = document.querySelector(".js-nav-area");
    let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
    let accordion = document.querySelectorAll(".js-sp-accordion");

  // メニュー開閉制御
  hamburger.addEventListener("click", (e) => { //ハンバーガーボタンが選択されたら
    e.currentTarget.classList.toggle(CLASS);
    menu.classList.toggle(CLASS);
    if (flg) {// flgの状態で制御内容を切り替え
        backgroundFix(false);
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.focus();
        flg = false;
    } else {
        backgroundFix(true);
        hamburger.setAttribute("aria-expanded", "true");
        flg = true;
    }
});
  // フォーカストラップ制御
focusTrap.addEventListener("focus", (e) => {
    hamburger.focus();
});

function display(){
  modal.style.display = 'block';
}
var closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
})


function findWord(data, wordToFind){
  for (const element of data) {
      const foundWord = element.words.find(word => word.id === wordToFind);
      if (foundWord) {
          return foundWord;
      }
  }
    return null; // 見つからなかった場合
}

function next(){
  console.log("next;");
  //挿入場所を白紙に
  const mainQuestionCon = document.getElementById("main-question-container");
  mainQuestionCon.innerHTML = '';
  console.log(explain_json);
  //テンプレート複製
  const template_questions = document.getElementById("template-questions");
  const clone_questions = template_questions.content.cloneNode(true);
  console.log(clone_questions);
  //
  const currentId = String(randomIndices[current_question]);
  const targetQuestion = findWord(explain_json, currentId);
  console.log(targetQuestion);

  if (targetQuestion) {//resultが存在する場合
    console.log(targetQuestion);
    const number_place = clone_questions.querySelector('#question-number');
    number_place.textContent = String(currentId);
    const korean_questions_place = clone_questions.querySelector('#korean-questions');
    korean_questions_place.textContent = targetQuestion.question;
    const ans_A_place = clone_questions.querySelector('#ans_A');
    ans_A_place.textContent = targetQuestion.answer_a;
    const ans_B_place = clone_questions.querySelector('#ans_B');
    ans_B_place.textContent = targetQuestion.answer_b;
    const ans_C_place = clone_questions.querySelector('#ans_C');
    ans_C_place.textContent = targetQuestion.answer_c;
    const ans_D_place = clone_questions.querySelector('#ans_D');
    ans_D_place.textContent = targetQuestion.answer_d;
  } else {
    console.log("targetQuestion が null または undefined です");
  }
  clone_questions.querySelector('div').style.display = 'block';
  console.log(clone_questions);
  document.getElementById('main-question-container').appendChild(clone_questions);
  current_question ++;
}