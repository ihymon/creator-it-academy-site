// Favicon Start
function toggleFavicon() {
    let favicon = $('#blinking_image');
  
    let currentPath = favicon.attr('href');
  
    if (currentPath === '../../img/main/favicon/favicon-32x32.webp') {
        favicon.attr('href', '../../img/main/favicon/faviconAnimation.webp');
    } else {
        favicon.attr('href', '../../img/main/favicon/favicon-32x32.webp');
    }
  }
  
  $(document).ready(function () {
    setInterval(toggleFavicon, 500);
  });
// Favicon Finish



// Home Page Start

const homePhoto = document.querySelectorAll('.home__photo-display');
const homePhotoContainer = document.getElementById('homePhotoContainer');

homePhotoContainer.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 30;

  homePhoto.forEach((svg) => {
    svg.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
  });
});


const resetBurger = () => {
  $("#burger").removeClass("home__header-box--burger-open");
  $(".home__header-rigth").removeClass("home__header-rigth--open");
  $(".home__popup").removeClass("home__popup-open");
  $("body").removeClass("wrap-hidden");
}

$("#burger").click(function() {
    console.log("Button clicked");
    $("#burger").toggleClass("home__header-box--burger-open");
    $(".home__header-rigth").toggleClass("home__header-rigth--open");
    $(".home__popup").toggleClass("home__popup-open");
    $("body").toggleClass("wrap-hidden");


});
$(document).ready(function() {
  $(window).scroll(function() {
      let header = $("#header");

      if ($(this).scrollTop() > 100) {
          header.addClass("home__header-scroll");
      } else {
          header.removeClass("home__header-scroll");
      }
  });
});

$("#telegramLink").click(() => {
window.open('https://t.me/creator_it_academy_help', '_blank');
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

    videoMask.on("mousemove", () => {
        clearTimeout(videoPlayTimerID);
        if (isVideoStarted) {
            playBtn.show(300);

            if(isVideoPlay) {
                videoPlayTimerID = setTimeout(() => {
                    playBtn.hide(300);
                }, 2500);
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
    });


    video.on("pause", () => {
        clearTimeout(videoPlayTimerID);
        playBtn.show(300);
        playBtn.find(playIcon).show();
        playBtn.find(pauseIcon).hide();
        isVideoPlay = false;
    });



    if(isReviewVideo) {
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

    $("#mainVideo").pause();
}

setupVideoControls($("#mainVideoPlayBtn"), $("#mainVideo"), $("#mainPoster"), $("#mainVideoMask"), ".about-us__video__play-icon", ".about-us__video__pause-icon", false);


fetch('./../../api/course.json')
    .then(response => response.json())
    .then(courses => {
        for(let el of courses) {
            const minNumber = Math.min(...el.age);
            const maxNumber = Math.max(...el.age);

            if(el.id == 4) {
                $("#courseAge").text(`${minNumber}-${maxNumber}`);
                $("#coursePrice").text(el.price);
                $("#courseFrequency").text(el.frequency);
                $("#courseDuration").text(el.duration);
            }
        }
    })
// About Us End



// Team Start
let swiper = new Swiper(".team", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".team__control-next",
        prevEl: ".team__control-prev",
    },
    simulateTouch: false,
  });
// Team End

