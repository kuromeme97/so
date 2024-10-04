'use strict'

let player;
var lyricsdata = [
    {hid: "l-0", lyricstime: 0},
    {hid: "l-1", lyricstime: 11},
    {hid: "l-2", lyricstime: 13.3},
    {hid: "l-3", lyricstime: 15.6},
    {hid: "l-4", lyricstime: 20},
    {hid: "l-5", lyricstime: 22},
    {hid: "l-6", lyricstime: 24.4},

    {hid: "l-7", lyricstime: 28.7},
    {hid: "l-8", lyricstime: 32.7},
    {hid: "l-9", lyricstime: 37.3},
    {hid: "l-10", lyricstime: 42},

    {hid: "l-11", lyricstime: 45.7},
    {hid: "l-12", lyricstime: 47.8},
    {hid: "l-13", lyricstime: 50.1},
    {hid: "l-14", lyricstime: 54.4},
    {hid: "l-15", lyricstime: 56.6},
    {hid: "l-16", lyricstime: 58.8},
    {hid: "l-17", lyricstime: 63},

    {hid: "l-18", lyricstime: 64},
    {hid: "l-19", lyricstime: 66},
    {hid: "l-20", lyricstime: 68},
    {hid: "l-21", lyricstime: 73},
    {hid: "l-22", lyricstime: 75.2},
    {hid: "l-23", lyricstime: 77.4},

    {hid: "l-24", lyricstime: 81.5},
    {hid: "l-25", lyricstime: 85.6},
    {hid: "l-26", lyricstime: 90.3},
    {hid: "l-27", lyricstime: 95.2},

    {hid: "l-28", lyricstime: 98.5},
    {hid: "l-29", lyricstime: 100.8},
    {hid: "l-30", lyricstime: 102.9},
    {hid: "l-31", lyricstime: 107.3},
    {hid: "l-32", lyricstime: 109.6},
    {hid: "l-33", lyricstime: 111.8},
    {hid: "l-34", lyricstime: 116.1},
    {hid: "l-35", lyricstime: 118.3},

    {hid: "l-36", lyricstime: 135.2},
    {hid: "l-37", lyricstime: 143.9},

    {hid: "l-38", lyricstime: 153.3},
    {hid: "l-39", lyricstime: 155.7},
    {hid: "l-40", lyricstime: 157.6},
    {hid: "l-41", lyricstime: 162},
    {hid: "l-42", lyricstime: 164},
    {hid: "l-43", lyricstime: 166.5},
    {hid: "l-44", lyricstime: 170.9},
    {hid: "l-45", lyricstime: 173.4},
    {hid: "l-46", lyricstime: 300}
];
let isUserScrolling = false;   // ユーザーがスクロール中かどうか
let scrollTimeout;             // スクロールが止まった後のタイマー
let autoScrollEnabled = true;  // 自動スクロールが有効かどうか

// YouTube APIの準備が完了したときに呼ばれる
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        //youtubeのサイトでは縦480,横850
        width: '512',
        height: '288',
        videoId: 'O0StKlRHVeE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    setInterval(updateLyrics, 100);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        setInterval(() => {
            updateLyrics();
            //updateexplain();
        }, 100);
    }
}

function updateLyrics() {
    let currentTime = player.getCurrentTime();
    const before = document.querySelectorAll('.active');
    before.forEach(before => {
        before.classList.remove("active");
    });
    let activeElement = null;
    for (let i = 0; i < lyricsdata.length - 1; i++) {
        if (currentTime >= lyricsdata[i].lyricstime && currentTime < lyricsdata[i + 1].lyricstime) {
            let now = document.getElementById(lyricsdata[i].hid);
            activeElement = document.getElementById(lyricsdata[i].hid);
            now.classList.add('active');// ユーザーがスクロールしていないかつ自動スクロールが有効な場合のみスクロール
            if (autoScrollEnabled == true){
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'center',});
            }
            break;
        }
    }
    
}

// ページロード後にスクロールイベントを設定
document.addEventListener('DOMContentLoaded', () => {
    let secondaryInner = document.getElementById('secondary-inner');
    
    secondaryInner.addEventListener('scroll', () => {
        autoScrollEnabled = false;  // 自動スクロールを一時無効化

        // ユーザーがスクロールをやめたときに再び自動スクロールを有効化するためのタイマー
        clearTimeout(scrollTimeout);  // 前のタイマーがあればクリア
        scrollTimeout = setTimeout(() => {
            autoScrollEnabled = true;  // 3秒後に自動スクロールを再度有効化
        }, 3000);  // 3秒
    });
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

const hintimg = document.getElementById("hintImage");
const movingImage = document.getElementById('movingImage');
let isShown = false;
hintimg.addEventListener('click', () => {
    console.log('押されました');
    isShown = !isShown; // フラグを反転
    if (isShown) {
        console.log('表示される');
        movingImage.classList.add('show');
    } else {
        console.log('表示消える');
        movingImage.classList.remove('show');
    }
});

function explain(element){
    //ここにクリック時のものを書く
    console.log(element.textContent);
    const clickword = document.getElementById("word");
    clickword.textContent=element.textContent;

}