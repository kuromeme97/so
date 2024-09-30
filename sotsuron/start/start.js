'use strict'

let player;
let lyrics = [
    { time: 11, text: "새로운 시작은<br>新しい 始まりは", explain: 1 },
    { time: 13.3, text: "늘 <span class='highlight'>설레게</span> 하지<br>いつだって胸を高鳴らせる" },
    { time: 15.6, text: "모든 걸 이겨낼 것처럼<br>すべてに打ち勝てる気がするほど" },
    { time: 20, text: "시간을 뒤쫓는<br>時間を追いかける" },
    { time: 22, text: "시계바늘처럼<br>時計の針のように" },
    { time: 24.4, text: `앞질러 <span class="highlight" onclick="mess()">가고 싶어 하지</span><br>追い抜いていきたがるんだ` }
    ,
    { time: 28.7, text: "그어 놓은 선을 넘어<br>引いておいたラインを越えて" },
    { time: 32.7, text: "저마다 삶을 향해<br>それぞれの人生に向かって" },
    { time: 37.3, text: "때론 원망도 하겠지<br>ときには恨んだりもするだろう" },
    { time: 42, text: "그 선을 먼저 넘지 말라고<br>そのラインを先に越えるなと" }
    ,
    { time: 45.7, text: "I can fly the sky" },
    { time: 47.8, text: "Never gonna stay" },
    { time: 50.1, text: "내가 지쳐 쓰러질 때까진<br>僕がくたびれて倒れるときまでは" },
    { time: 54.4, text: "어떤 이유도<br>どんな理由も" },
    { time: 56.6, text: "어떤 변명도<br>どんな言い訳も" },
    { time: 58.8, text: "지금 내겐 용기가 필요해<br>いまの僕にとっては勇気が必要なんだ" },
    { time: 63, text: "♪"}
    ,
    { time: 64, text: "빛나지 않아도<br>輝かなくても"},
    { time: 66, text: "내 꿈을 응원해<br>僕の夢を応援してくれ"},
    { time: 68, text: "그 마지막을 가질 테니<br>最後には手に入れるはずだから"},
    { time: 73, text: "부러진 것처럼<br>折れたかのように"},
    { time: 75.2, text: "한 발로 뛰어도<br>片足で走っても"},
    { time: 77.4, text: "난 나의 길을 갈 테니까<br>僕は僕の道を進むから"},
    { time: 81.5, text: "지금 나를 위한 약속<br>今 自分のための約束"},
    { time: 85.6, text: "멈추지 않겠다고<br>止まりはしないと"},
    { time: 90.3, text: "또 하나를 앞지르면<br>またひとつ追い抜いたら"},
    { time: 95.2, text: "곧 너의 뒤를 따라잡겠지<br>すぐ君の後ろに追いつくだろう"},
    
    { time: 98.5, text: "원하는 대로<br>望むままに"},
    { time: 100.8, text: "다 가질 거야<br>全部手に入れるんだ"},
    { time: 102.9, text: "그게 바로 내 꿈일 테니까<br>それが間違いなく僕の夢なんだから"},
    { time: 107.3, text: "변한 건 없어<br>変わってないよ"},
    { time: 109.6, text: "버티고 버텨<br>耐えて耐えて"},
    { time: 111.8, text: "내 꿈은 더 단단해질 테니<br>僕の夢はもっと強固なものになるはずだから"},
    { time: 116.1, text: "다시 시작해<br>また始めるんだ"},
    { time: 118.3, text: "♪"}
    ,
    { time: 135.2, text: "다시는 나를 잃고 싶지 않아<br>二度と自分を失いたくない"},
    { time: 143.9, text: "내 전부를 걸었으니까<br>僕の全てをかけたから"}
    ,
    { time: 153.3, text: "원하는 대로<br>望むままに"},
    { time: 155.7, text: "다 가질 거야<br>全部手に入れるんだ"},
    { time: 157.6, text: "그게 바로 내 꿈일 테니까<br>それが間違いなく僕の夢なんだから"},
    { time: 162, text: "변한 건 없어<br>変わってないよ"},
    { time: 164, text: "버티고 버텨<br>耐えて耐えて"},
    { time: 166.5, text: "내 꿈은 더 단단해질 테니<br>僕の夢はもっと強固なものになるはずだから"},
    { time: 170.9, text: "다시 시작해<br>また始めるんだ"},
    { time: 173.4, text: ""}
];

//lyricsContainer.addEventListener('click', (event) => {
//    if (event.target.tagName === 'SPAN') {
//    const clickedWord = event.target.textContent;
//    console.log(clickedWord);
//    }
//});

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
            updateexplain();
        }, 100);
    }
}

function updateLyrics() {
    let currentTime = player.getCurrentTime();
    const g = document.getElementById("time2");
    g.textContent = currentTime;

    let lyricsContainer = document.getElementById('lyrics');
    lyricsContainer.innerHTML = '';

    let activeElement = null;

    lyrics.forEach((line, index) => {
        let div = document.createElement('p');
        div.className = 'lyric-line';
        div.innerHTML = line.text;

        if (currentTime >= line.time && (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)) {
            div.classList.add('active');
            activeElement = div;
        }

        lyricsContainer.appendChild(div);
    });

    // ユーザーがスクロールしていないかつ自動スクロールが有効な場合のみスクロール
    if (autoScrollEnabled == true){
        activeElement.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
}


function updateexplain(){
    let ct = player.getCurrentTime();
    let lt = document.getElementById(ct);
    if (currentTime >= line.time && (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)) {
        lt.classList.add('highlight');
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