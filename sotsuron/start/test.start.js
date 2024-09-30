'use strict'

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

function mess(){
    console.log("hello");
}