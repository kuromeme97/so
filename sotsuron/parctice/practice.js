'use strict'

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        //youtubeのサイトでは縦480,横850
        width: '512',
        height: '288',
        videoId: '0T8d3pRjmi4',
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