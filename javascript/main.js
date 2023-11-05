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

let maxAge;
let minAge;

function fetchCourse() {
  fetch('./api/course.json')
    .then(response => response.json())
    .then(courses => {
      let maxPrice = 0;
      maxAge = 0;
      let minPrice = Number.MAX_VALUE;
      minAge = Number.MAX_VALUE;


      $(".course__filter-title span").text(courses.length);
      for (let i = 0; i < courses.length; i++) {
        console.log(courses[i]);

        if (courses[i].price > maxPrice) {
          maxPrice = courses[i].price;
        }

        if (courses[i].price < minPrice) {
          minPrice = courses[i].price;
        }

        if (courses[i].age) {
          for (let age of courses[i].age) {
            if (age > maxAge) {
              maxAge = age;
            }
            if (age < minAge) {
              minAge = age;
            }
          }
        }
      }
      

      $('#toInput1').val(maxPrice);
      $('#toSlider1').val(maxPrice);
      $('#toInput1').attr('max', maxPrice);
      $('#fromInput1').attr('max', maxPrice);
      $('#toSlider1').attr('max', maxPrice);
      $('#fromSlider1').attr('max', maxPrice);

      $('#fromInput1').val(minPrice);
      $('#fromSlider1').val(minPrice);
      $('#fromInput1').attr('min', minPrice);
      $('#toInput1').attr('min', minPrice);
      $('#fromSlider1').attr('min', minPrice);
      $('#toSlider1').attr('min', minPrice);

      console.log("Maximum Price: " + maxPrice);
      console.log("Minimum Price: " + minPrice);
      console.log("Maximum Age: " + maxAge);
      console.log("Minimum Age: " + minAge);
      ageControl();
    })
    .catch(error => {
      console.error('Error fetching JSON file:', error);
    });
}

fetchCourse();

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


  function ageControl() {
    $('#age1').val(minAge);
    $('#age2').val(maxAge);
    const $age1Input = $('#age1');
    const $age2Input = $('#age2');
  
    let minAgeValue;
    let maxAgeValue;
    $age1Input.on('input', function () {
      minAgeValue = parseInt($age1Input.val());
      console.log(minAge);
      console.log(minAgeValue);
      console.log(maxAgeValue)
      
      if (minAgeValue < minAge) {
        minAgeValue = minAge;
      }
      if (minAgeValue >= maxAgeValue) {
        minAgeValue = minAgeValue - 1;
      }
  
      $age1Input.val(minAgeValue);
    });
  
    $age2Input.on('input', function () {
      maxAgeValue = parseInt($age2Input.val());
      if (maxAgeValue > maxAge) {
        maxAgeValue = maxAge;
      }
      if (maxAgeValue <= minAgeValue) {
        maxAgeValue = maxAgeValue + 1;
      }
  
      $age2Input.val(maxAgeValue);
    });
  }

  
  ageControl(); 
   
  

function controlRange(id) {
  const $fromSlider = $(`#fromSlider${id}`);
  const $toSlider = $(`#toSlider${id}`);
  const $fromInput = $(`#fromInput${id}`);
  const $toInput = $(`#toInput${id}`);

  $fromSlider.on("input", function () {
      const fromValue = parseInt($fromSlider.val());
      const toValue = parseInt($toSlider.val());
      if (fromValue >= toValue) {
          $fromSlider.val(toValue);
          $fromInput.val(toValue);
      } else {
          $fromInput.val(fromValue);
      }
  });

  $toSlider.on("input", function () {
      const fromValue = parseInt($fromSlider.val());
      const toValue = parseInt($toSlider.val());
      if (toValue <= fromValue) {
          $toSlider.val(fromValue);
          $toInput.val(fromValue);
      } else {
          $toInput.val(toValue);
      }
  });

  $fromInput.on("input", function () {
      const fromValue = parseInt($fromInput.val());
      const toValue = parseInt($toInput.val());
      if (fromValue >= toValue) {
          $fromInput.val(toValue);
          $fromSlider.val(toValue);
      } else {
          $fromSlider.val(fromValue);
      }
  });

  $toInput.on("input", function () {
      const fromValue = parseInt($fromInput.val());
      const toValue = parseInt($toInput.val());
      if (toValue <= fromValue) {
          $toInput.val(fromValue);
          $toSlider.val(fromValue);
      } else {
          $toSlider.val(toValue);
      }
  });
  

}


controlRange('1');
controlRange('2');

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

let owlSecond = $('.owl-carousel-second').owlCarousel({
    items: 4,
    loop: true,
    center: true,
    margin: 80,
    autoWidth: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsiveClass:true,
    dots: false,
    responsive: {
      600: {
        margin: 40,
      },
      600: {
        margin: 60,
      },
      1400: {
        margin: 80,
      },
      2000: {
        margin: 180,
      },
    }
})

// Team End 



// Partners Start 

let owlThird = $('.owl-carousel-third').owlCarousel({
  items: 4,
  loop: true,
  center: true,
  margin: 140,
  autoWidth: true,
  autoplay: true,
  autoplayTimeout: 1500,
  autoplayHoverPause: true,
  responsiveClass:true,
  dots: false,
  responsive: {
    600: {
      margin: 80,
    },
    600: {
      margin: 100,
    },
    1400: {
      margin: 120,
    },
    2000: {
      margin: 200,
    },
  }
})
// Partners End 



// Map Start 

// Map End 



// Footer Start 

// Footer End 