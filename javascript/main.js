// Home Page Start
    AOS.init();

    $("#burger").click(function() {
        console.log("Button clicked");
        $(this).toggleClass("home__header-box--burger-open");
        $(".home__header-rigth").toggleClass("home__header-rigth--open");
        $(".home__popup").toggleClass("home__popup-open");
        $("body").toggleClass("wrap-hidden");


    });
    
// Home Page Finish


// About Us Start 

let currentPlayingVideo = null;

function setupVideoControls(playBtn, video, poster, videoMask) {
    let isVideoStarted = false;
    let isVideoPlay = false;

    playBtn.click(() => {
        if (currentPlayingVideo && currentPlayingVideo !== video[0]) {
            currentPlayingVideo.pause();
        }

        if (!isVideoPlay) {
            playBtn.find(".about-us__video__play-icon").hide();
            playBtn.find(".about-us__video__pause-icon").show();
            video[0].play();
            isVideoPlay = true;
            currentPlayingVideo = video[0];
        } else {
            playBtn.find(".about-us__video__play-icon").show();
            playBtn.find(".about-us__video__pause-icon").hide();
            video[0].pause();
            isVideoPlay = false;
            currentPlayingVideo = null;
        }

        if (!isVideoStarted) {
            poster.hide();
            video[0].play();
            playBtn.find(".about-us__video__play-icon").hide();
            playBtn.find(".about-us__video__pause-icon").show();
            isVideoStarted = true;
        }
    });

    videoMask.on("mouseenter", () => {
        if (isVideoStarted) {
            playBtn.show(300);
        }
    });

    videoMask.on("mouseleave", () => {
        if (isVideoStarted && isVideoPlay) {
            playBtn.hide(300);
        }
    });

    video.on("play", () => {
        playBtn.find(".about-us__video__play-icon").hide();
        playBtn.find(".about-us__video__pause-icon").show();
        isVideoPlay = true;
    });

    video.on("pause", () => {
        playBtn.find(".about-us__video__play-icon").show();
        playBtn.find(".about-us__video__pause-icon").hide();
        isVideoPlay = false;
    });

}

function stopAllVideo() {
    if (currentPlayingVideo) {
        currentPlayingVideo.pause();
        currentPlayingVideo = null;
    }

    $("#video1").pause();
    $("#video2").pause();
    $("#video3").pause();
    $("#video4").pause();
    $("#mainVideo").pause();
}

setupVideoControls($("#mainVideoPlayBtn"), $("#mainVideo"), $("#mainPoster"), $("#mainVideoMask"));
setupVideoControls($("#video1PlayBtn"), $("#video1"), $("#video1Poster"), $("#videoMask1"));
setupVideoControls($("#video2PlayBtn"), $("#video2"), $("#video2Poster"), $("#videoMask2"));
setupVideoControls($("#video3PlayBtn"), $("#video3"), $("#video3Poster"), $("#videoMask3"));
setupVideoControls($("#video4PlayBtn"), $("#video4"), $("#video4Poster"), $("#videoMask4"));


// About Us End 