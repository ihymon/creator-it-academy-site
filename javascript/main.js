// IsMobile Start
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

let openFromMobile = false;
if(isMobile.any()) {
    openFromMobile = true;
} else {
    openFromMobile = false;
}

// IsMobile End


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

function setupVideoControls(playBtn, video, poster, videoMask, playIcon, pauseIcon, isReviewVideo) {
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


            playBtn.find(playIcon).hide();
            playBtn.find(pauseIcon).show();
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
            playBtn.find(playIcon).show();
            playBtn.find(pauseIcon).hide();
            $(".about-us__video-left__scroll").show(200);
            video[0].pause();
            isVideoPlay = false;
            currentPlayingVideo = null;
        }

        if (!isVideoStarted) {
            poster.hide();
            video[0].play();
            playBtn.find(playIcon).hide();
            playBtn.find(pauseIcon).show();
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

        playBtn.find(playIcon).hide();
        playBtn.find(pauseIcon).show();
        isVideoPlay = true;
        // console.log("play was pressed");
    });


    video.on("pause", () => {
        clearTimeout(videoPlayTimerID);
        playBtn.show(300);
        playBtn.find(playIcon).show();
        playBtn.find(pauseIcon).hide();
        isVideoPlay = false;

        // console.log("pause was pressed");
    });



    if(isReviewVideo) {
        // reviewVideoClick(videoMask, playBtn);
        videoMask.click(() => {
            if(openFromMobile) {
                playBtn.show(300);
            }
        })
    }
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
    $("#reviewSlide1").pause();
    $("#reviewSlide2").pause();
}

setupVideoControls($("#mainVideoPlayBtn"), $("#mainVideo"), $("#mainPoster"), $("#mainVideoMask"), ".about-us__video__play-icon", ".about-us__video__pause-icon", false);
setupVideoControls($("#video1PlayBtn"), $("#video1"), $("#video1Poster"), $("#videoMask1"), ".about-us__video__play-icon", ".about-us__video__pause-icon", false);
setupVideoControls($("#video2PlayBtn"), $("#video2"), $("#video2Poster"), $("#videoMask2"), ".about-us__video__play-icon", ".about-us__video__pause-icon", false);
setupVideoControls($("#video3PlayBtn"), $("#video3"), $("#video3Poster"), $("#videoMask3"), ".about-us__video__play-icon", ".about-us__video__pause-icon", false);
setupVideoControls($("#video4PlayBtn"), $("#video4"), $("#video4Poster"), $("#videoMask4"), ".about-us__video__play-icon", ".about-us__video__pause-icon", false);



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
setupVideoControls($("#reviewSlide1 .reviews__video-play-btn"), $("#reviewSlide1 .reviews__video-user"), $("#reviewSlide1 .reviews__video-poster"), $("#reviewSlide1 .reviews__video"), ".reviews__video-play", ".reviews__video-pause", true);
setupVideoControls($("#reviewSlide2 .reviews__video-play-btn"), $("#reviewSlide2 .reviews__video-user"), $("#reviewSlide2 .reviews__video-poster"), $("#reviewSlide2 .reviews__video"), ".reviews__video-play", ".reviews__video-pause", true);

// function reviewVideoClick(reviewVideo, reviewPlayBtn) {
//     reviewVideo.click(() => {
//         if(openFromMobile) {
//             reviewPlayBtn.show(300);
//         }
//     })
// }


// Reviews End



