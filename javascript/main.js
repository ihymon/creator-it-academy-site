// Home Page Start
    AOS.init();

    // You can also pass an optional settings object
    // below listed default settings

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
    let videoPlayTimerID;

    playBtn.click(() => {
        clearTimeout(videoPlayTimerID);
        if (currentPlayingVideo && currentPlayingVideo !== video[0]) {
            clearTimeout(videoPlayTimerID); 
            currentPlayingVideo.pause();
        }

        if (!isVideoPlay) {
            clearTimeout(videoPlayTimerID);

            playBtn.find(".about-us__video__play-icon").hide();
            playBtn.find(".about-us__video__pause-icon").show();
            $(".about-us__video-left__scroll").hide(200);
            video[0].play();
            isVideoPlay = true;
            currentPlayingVideo = video[0];

            if(isVideoPlay) {
                videoPlayTimerID = setTimeout(() => {
                    playBtn.hide(300);
                }, 3000);
            }
        } else {
            clearTimeout(videoPlayTimerID);
            playBtn.find(".about-us__video__play-icon").show();
            playBtn.find(".about-us__video__pause-icon").hide();
            $(".about-us__video-left__scroll").show(200);
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
        clearTimeout(videoPlayTimerID);
        if (isVideoStarted) {
            playBtn.show(300);

            if(isVideoPlay) {
                videoPlayTimerID = setTimeout(() => {
                    playBtn.hide(300);
                }, 3000);
            }
        }
    });

    videoMask.on("mouseleave", () => {
        clearTimeout(videoPlayTimerID);
        if (isVideoStarted && isVideoPlay) {
            playBtn.hide(300);
        }
    });

    video.on("play", () => {
        clearTimeout(videoPlayTimerID);
        videoPlayTimerID = setTimeout(() => {
            playBtn.hide(300);
        }, 3000);

        playBtn.find(".about-us__video__play-icon").hide();
        playBtn.find(".about-us__video__pause-icon").show();
        isVideoPlay = true;
        console.log("play was pressed");
    });


    video.on("pause", () => {
        clearTimeout(videoPlayTimerID);
        playBtn.show(300);
        playBtn.find(".about-us__video__play-icon").show();
        playBtn.find(".about-us__video__pause-icon").hide();
        isVideoPlay = false;

        console.log("pause was pressed");
    });

}

function stopAllVideo() {
    if (currentPlayingVideo) {
        clearTimeout(videoPlayTimerID);

        currentPlayingVideo.pause();
        currentPlayingVideo = null;
    }
    clearTimeout(videoPlayTimerID);

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



// Actions when scrolling 
$("#aboutUsVideos").on("scroll", () => {
    const scrollTop = $("#aboutUsVideos").scrollTop();
    const scrollLeft = $("#aboutUsVideos").scrollLeft();

    if(scrollTop > 30 || scrollLeft > 30) {
        $(".about-us__video-left__scroll").hide(200);
    } else if(scrollTop <= 10 || scrollLeft > 10) {
        $(".about-us__video-left__scroll").show(200);
    }
})

// About Us End 



// Reviews Start

var swiper = new Swiper(".reviews", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".reviews__control-next",
        prevEl: ".reviews__control-prev",
    },
});

// Reviews End