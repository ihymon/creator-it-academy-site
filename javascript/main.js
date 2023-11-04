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
function fethcCourse() {
  fetch('./api/course.json')
    .then(response => response.json())
    .then(courses => {
      let maxPrice = 0;



      $(".course__filter-title span").text(courses.length);
      for(let i = 0; i < courses.length; i++) {
        console.log(courses[i]);

        if (courses[i].price > maxPrice) {
          maxPrice = courses[i].price;
        }
        $('#toInput').val(maxPrice);
        $('#toSlider').val(maxPrice);
        $('#toInput').attr('max', maxPrice);
        $('#fromInput').attr('max', maxPrice);
        $('#toSlider').attr('max', maxPrice);
        $('#fromSlider').attr('max', maxPrice);
      }

      console.log(maxPrice)
      
    })
    .catch(error => {
      console.error('Помилка отримання JSON файлу:', error);
    });
}

fethcCourse();


$(".filter__cart-arrow").click(function() {
  let grandparentElement = $(this).parent().parent();
  let contentElement = grandparentElement.find(".filter__cart-content");

  $(this).toggleClass("filter__cart-arrow--open");
  $(grandparentElement).toggleClass("filter__cart--open");

  contentElement.toggleClass("filter__cart-content--open");
});

  $(".my-checkbox").click(function() {
    $(".my-checkbox").prop('checked', false);
    $(this).prop('checked', true);

    let labelText = $(this).closest(".checkbox-container").find("span");
    console.log($(labelText).attr("id"));
  });



  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#fff', '#F5A006', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}
    
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#fff', '#F5A006', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#fff', '#F5A006', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#fff', '#F5A006', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 0);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#fff', '#F5A006', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

// Course End 



// Certificate Start 

// Certificate End 



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
// Reviews End



// Team Start 

// Team End 



// Partners Start 

// Partners End 



// Map Start 

// Map End 



// Footer Start 

// Footer End 