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
// About Us End 



// Benefits Start 
function chartAnimation(chartId, animatedNumberId, fromValue, toValue, time,data1, data2) {
  const ctx = document.getElementById(chartId);
  const targetElement = document.querySelector(`#${chartId}`);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("hello");
        animateValue(animatedNumberId, fromValue, toValue, time);

        setTimeout(() => {
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [data1, data2],
                backgroundColor: ['#F5A006', 'rgba(0, 0, 0, 0.20)'],
                borderWidth: 0
              }]
            },
            options: {
              cutout: '80%',
              plugins: {
                tooltip: {
                  enabled: false
                },
              }
            }
          });
        }, 400);

        observer.disconnect();
      }
    });
  });

  observer.observe(targetElement);
}

chartAnimation('myChart1', 'animatedNumber', 600, 800, 1000, 70, 30);
chartAnimation('myChart2', 'animatedNumber2', 0, 20, 1000, 90, 10);
chartAnimation('myChart3', 'animatedNumber3', 0, 4, 1000, 75, 25);
chartAnimation('myChart4', 'animatedNumber4', 0, 10, 1000, 55, 45);

function animateValue(id, start, end, duration) {
  const element = document.getElementById(id);
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const steps = Math.abs(range);
  const stepTime = duration / steps;

  function update() {
    start += increment;
    element.innerText = start;
    if (start !== end) {
      setTimeout(update, stepTime);
    }
  }

  update();
}
  

// Benefits End 



// Course Start 

// Course End 



// Certificate Start 
$("#userName").on("input", () => {
    if($("#userName").val() == "") {
        $("#outputUserName").text("Ваше імя");
    } else {
        $("#outputUserName").text($("#userName").val());
    }
});


$("#userAge").on("input", () => {
    $("#userAge").val($("#userAge").val().replace(/[^0-9]/g, ''));
    
    if ($("#userAge").val().indexOf('e') !== -1) {
        $("#userAge").val($("#userAge").val().replace('e', ''));
    }
});


function updatePlaceholderInCerteficte(input, defaultText, newText) {
    let windowWidth = $(window).width();
    const inputElement = input;

    if (windowWidth < 450) {
      inputElement.attr("placeholder", newText);
    } else {
      inputElement.attr("placeholder", defaultText);
    }
}

updatePlaceholderInCerteficte($("#userName"), "Введіть ваше імя та прізвище", "Ваше ім'я та прізвище");
updatePlaceholderInCerteficte($("#userPhoneNumber"), "Введіть ваш номер телефону", "Ваш номер телефону");
updatePlaceholderInCerteficte($("#userAge"), "Введіть скільки вам років", "Ваш вік");
// Certificate End 



// Reviews Start
let owl = $('.owl-carousel-first').owlCarousel({
    items: 1,
    loop:true,
    center: true,
    dots: false,
})

$('.reviews__control-prev').on('click', () => {
    owl.trigger('prev.owl.carousel');
});

$('.reviews__control-next').on('click', () => {
    owl.trigger('next.owl.carousel');
});


setupVideoControls($("#reviewSlide1 .reviews__video-play-btn"), $("#reviewSlide1 .reviews__video-user"), $("#reviewSlide1 .reviews__video-poster"), $("#reviewSlide1 .reviews__video"), ".reviews__video-play", ".reviews__video-pause", true);
setupVideoControls($("#reviewSlide2 .reviews__video-play-btn"), $("#reviewSlide2 .reviews__video-user"), $("#reviewSlide2 .reviews__video-poster"), $("#reviewSlide2 .reviews__video"), ".reviews__video-play", ".reviews__video-pause", true);
// Reviews End



// Team Start 

let owlTwo = $('.owl-carousel-second').owlCarousel({
    items: 4,
    loop: true,
    center: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
})

// Team End 



// Partners Start 

// Partners End 



// Map Start 

// Map End 



// Footer Start 

// Footer End 