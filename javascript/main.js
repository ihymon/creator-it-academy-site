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



// Gift Start
$("#giftIcon").click(() => {
  startConfetti();
  $(".gift__popup-container").addClass("_active");
  $("body").addClass("_active");

  setTimeout(() => {
    $(".gift__popup").addClass("_active");
  }, 10);
});

$("#giftClose").click(() => {
  setTimeout(() => {
    $(".gift__popup-container").removeClass("_active");
    $("body").removeClass("_active");
  }, 500);

  $(".gift__popup").removeClass("_active");
})


function startConfetti() {
    const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
// Gift End



// Home Page Start
    AOS.init();

    $("#burger").click(function() {
        console.log("Button clicked");
        $(this).toggleClass("home__header-box--burger-open");
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


// Course Start 
let age;
let allCourse = false;
let courseLength2 = 6;
let courseLength;

function fetchCourse(nameCourseFilter, subtitleFilter, minPriceFilter, maxPriceFilter, ageValue) {
  
  fetch('./api/course.json')
    .then(response => response.json())
    .then(courses => {
      let courseFound = false;
      $(".course__filter-title span").text(courses.length);
      $(".course__box-main").empty();
      courses = courses.slice(0, courseLength2);
      courses = courses.filter(course => {
        return (!minPriceFilter || course.price >= minPriceFilter) &&
          (!maxPriceFilter || course.price <= maxPriceFilter) &&
          (!ageValue || (ageValue >= Math.min(...course.age || []) && ageValue <= Math.max(...course.age || [])));
      });
      for (let i = 0; i < courses.length; i++) {
     
        if ((!nameCourseFilter || courses[i].nameCourse.toLowerCase().includes(nameCourseFilter)) && (!subtitleFilter || courses[i].subtitle === subtitleFilter))
         {
          const minNum = Math.min(...courses[i].age || []);
          const maxNum = Math.max(...courses[i].age || []);
          
          $(".course__box-main").append($(`
          <div class="main__cart main__cart-${courses[i].type}">
          <button class="main__cart-button">${courses[i].subtitle}</button>
  
          <div class="main__cart-box">
              <div class="cart__left">
                  <p class="main__cart-subtitle">Курс</p>
                  <p class="main__cart-title">«${courses[i].nameCourse}» </p>
  
                  <div class="main__cart-sociable">
                      <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                          <path class="icon__socibale" fill-rule="evenodd" clip-rule="evenodd" d="M12.0823 22C17.6175 22 22.1046 17.5228 22.1046 12C22.1046 6.47715 17.6175 2 12.0823 2C6.54718 2 2.06006 6.47715 2.06006 12C2.06006 17.5228 6.54718 22 12.0823 22ZM12.834 6C12.834 5.58579 12.4975 5.25 12.0823 5.25C11.6672 5.25 11.3307 5.58579 11.3307 6V6.31673C9.6966 6.60867 8.32398 7.83361 8.32398 9.5C8.32398 11.4172 10.1408 12.75 12.0823 12.75C13.4619 12.75 14.3373 13.6557 14.3373 14.5C14.3373 15.3443 13.4619 16.25 12.0823 16.25C10.7028 16.25 9.82732 15.3443 9.82732 14.5C9.82732 14.0858 9.49079 13.75 9.07565 13.75C8.66051 13.75 8.32398 14.0858 8.32398 14.5C8.32398 16.1664 9.6966 17.3913 11.3307 17.6833V18C11.3307 18.4142 11.6672 18.75 12.0823 18.75C12.4975 18.75 12.834 18.4142 12.834 18V17.6833C14.4681 17.3913 15.8407 16.1664 15.8407 14.5C15.8407 12.5828 14.0239 11.25 12.0823 11.25C10.7028 11.25 9.82732 10.3443 9.82732 9.5C9.82732 8.65573 10.7028 7.75 12.0823 7.75C13.4619 7.75 14.3373 8.65573 14.3373 9.5C14.3373 9.91421 14.6739 10.25 15.089 10.25C15.5041 10.25 15.8407 9.91421 15.8407 9.5C15.8407 7.83361 14.4681 6.60867 12.834 6.31673V6Z" fill="#F5A006"/>
                        </svg>
                        <p>Ціна: <span>${courses[i].price}</span> грн/заняття</p>
                  </div>
  
                  <div class="main__cart-sociable">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                          <path class="icon__socibale" fill-rule="evenodd" clip-rule="evenodd" d="M5.26559 3.29918C5.86914 2 7.94025 2 12.0825 2C16.2247 2 18.2958 2 18.8994 3.29918C18.9513 3.41086 18.995 3.52686 19.0303 3.6461C19.4403 5.0333 17.9758 6.64111 15.0468 9.85674L13.0847 12L15.0468 14.1433C17.9758 17.3589 19.4403 18.9667 19.0303 20.3539C18.995 20.4731 18.9513 20.5891 18.8994 20.7008C18.2958 22 16.2247 22 12.0825 22C7.94025 22 5.86914 22 5.26559 20.7008C5.21371 20.5891 5.16994 20.4731 5.1347 20.3539C4.7247 18.9667 6.1892 17.3589 9.1182 14.1433L11.0803 12L9.1182 9.85674C6.1892 6.64111 4.7247 5.0333 5.1347 3.6461C5.16994 3.52686 5.21371 3.41086 5.26559 3.29918ZM10.078 17.75C9.66289 17.75 9.32636 18.0858 9.32636 18.5C9.32636 18.9142 9.66289 19.25 10.078 19.25H14.0869C14.5021 19.25 14.8386 18.9142 14.8386 18.5C14.8386 18.0858 14.5021 17.75 14.0869 17.75H10.078ZM9.32636 5.5C9.32636 5.08579 9.66289 4.75 10.078 4.75H14.0869C14.5021 4.75 14.8386 5.08579 14.8386 5.5C14.8386 5.91421 14.5021 6.25 14.0869 6.25H10.078C9.66289 6.25 9.32636 5.91421 9.32636 5.5Z" fill="#F5A006"/>
                        </svg>
                        <p>Вік дітей: <span>${minNum}-${maxNum}</span> років</p>
                  </div>
              </div>
  
              <div class="cart__rigth">
                  <img src=${courses[i].img} alt="hello">
              </div>
          </div>
  
  
      </div>
          `));
          courseFound = true;
        } 
      }
          
      if (!courseFound) {
        console.log("Course not found.");
              
      $(".course__box-main").append($(`<p class="error__course">Курс не було знайдено</p>`))
      }
    })
    .catch(error => {
      console.error('Error fetching JSON file:', error);
    });
}
fetchCourse();
function toggleAllCourses() {
  if (allCourse == true) {
    $('#allCourse').text("Показати більше");
    courseLength2 = 6; 
  } else {
    courseLength2 = Infinity;
    $('#allCourse').text("Заховати курси"); 
  }
  allCourse = !allCourse;
  fetchCourse();
  resetValue();
  $("#age1").val(minAge);
  $('#course__search').val("");
}
$('#allCourse').on('click', toggleAllCourses);
$('#course__search').on('input', function () {
  const inputValue = $(this).val().toLowerCase();
  fetchCourse(inputValue);
  $('#allCourse').text("Заховати курси");
  allCourse = true;
  $(".my-checkbox").prop('checked', false);
  $("#allType").prop('checked', true);
  resetValue();
  $("#age1").val(minAge);
  
});
$(".my-checkbox").click(function() {
  $(".my-checkbox").prop('checked', false);
  $(this).prop('checked', true);
  let labelText = $(this).closest(".checkbox-container").find("span");
  let filterType = labelText.text();
  $('#allCourse').text("Заховати курси");
  allCourse = true;
  if (filterType == "Всі") {
    filterType = "";
    allCourse = false;
    $('#allCourse').text("Показати більше");
  }
  fetchCourse('', filterType);
  resetValue();
  $('#course__search').val("");
  $("#age1").val(minAge);
});
let minAge;
let maxAge;
let maxPrice;
let minPrice;
function fetchMaxMinValue() {
  fetch('./api/course.json')
    .then(response => response.json())
    .then(courses => {
      maxPrice = 0;
      minPrice = Number.MAX_VALUE;
      maxAge = 0;
      minAge = Number.MAX_VALUE;
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].price > maxPrice) {
          maxPrice = courses[i].price;
        }
        if (courses[i].price < minPrice) {
          minPrice = courses[i].price;
        }
        const minCourseAge = Math.min(...courses[i].age);
        const maxCourseAge = Math.max(...courses[i].age);
        if (maxCourseAge > maxAge) {
          maxAge = maxCourseAge;
        }
        if (minCourseAge < minAge) {
          minAge = minCourseAge;
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
      $('#age1').attr('min', minAge);
      $('#age1').attr('max', maxAge);
    })
    .catch(error => {
      console.error('Error fetching JSON file:', error);
    });
}
fetchMaxMinValue();
$(".filter__cart-arrow").click(function() {
  let grandparentElement = $(this).parent().parent();
  let contentElement = grandparentElement.find(".filter__cart-content");
  $(this).toggleClass("filter__cart-arrow--open");
  $(grandparentElement).toggleClass("filter__cart--open");
  contentElement.toggleClass("filter__cart-content--open");
});
function ageControl() {
  const $ageInput = $("#age1");
  $ageInput.on("input", function() {
    const inputValue = $ageInput.val();
    
    $(".my-checkbox").prop('checked', false);
    $("#allType").prop('checked', true);
    fetchCourse('', '', '', '', inputValue);
    resetValue();
    $('#course__search').val("");
    if (inputValue > maxAge || inputValue < minAge) {
      $("#ageTitle").text('Курс не знайдено');
      $("#ageTitle").css("color", '#D95A5A');
    } else {
      $("#ageTitle").text('Вік');
      $("#ageTitle").css("color", '#fff');
    }
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
  
    if ($(this).val().indexOf('e') !== -1) {
        $(this).val($(this).val().replace('e', ''));
    }
  });
}
ageControl();
let originalFromValue; 
let originalToValue;  
let $fromSlider;    
let $toSlider;        
let $fromInput;       
let $toInput;      
function resetValue() {
  originalFromValue = minPrice;
  $fromSlider.val(originalFromValue);
  $toSlider.val(originalToValue);
  $fromInput.val(originalFromValue);
  $toInput.val(originalToValue);
}
function controlRange(id) {
  $fromSlider = $(`#fromSlider${id}`);
  $toSlider = $(`#toSlider${id}`);
  $fromInput = $(`#fromInput${id}`);
  $toInput = $(`#toInput${id}`);
  originalFromValue = parseInt($fromSlider.val());
  originalToValue = parseInt($toSlider.val());
  let fromValue = originalFromValue;
  let toValue = originalToValue;
  $fromSlider.on("input", function () {
  fromValue = parseInt($fromSlider.val());
  toValue = parseInt($toSlider.val());
  
  $(".my-checkbox").prop('checked', false);
  $("#allType").prop('checked', true);
  if (fromValue >= toValue) {
      $fromSlider.val(toValue);
      $fromInput.val(toValue);
  } else {
      $fromInput.val(fromValue);
  }
  fetchCourse('', '', fromValue, toValue);
  $('#course__search').val("");
  $("#age1").val(minAge);
  });
  $toSlider.on("input", function () {
    fromValue = parseInt($fromSlider.val());
    toValue = parseInt($toSlider.val());
    if ($('.course__box-main').children().length == 0) {
      $("#priceTitle").text('Курс не знайдено');
      $("#priceTitle").css("color", '#D95A5A');
    } else {
      $("#priceTitle").text('Ціна (грн)');
      $("#priceTitle").css("color", '#fff');
    }
    
    $(".my-checkbox").prop('checked', false);
    $("#allType").prop('checked', true);
    if (toValue <= fromValue) {
        $toSlider.val(fromValue);
        $toInput.val(fromValue);
    } else {
        $toInput.val(toValue);
    }
    
    fetchCourse('', '', fromValue, toValue);
    $('#course__search').val("");
    $("#age1").val(minAge);
  });
  $fromInput.on("input", function () {
    const fromValue = parseInt($fromInput.val());
    const toValue = parseInt($toInput.val());
    $(".my-checkbox").prop('checked', false);
    $("#allType").prop('checked', true);
    if (fromValue >= toValue) {
        $fromInput.val(toValue);
        $fromSlider.val(toValue);
    } else {
        $fromSlider.val(fromValue);
    }
    fetchCourse('', '', fromValue, toValue);
    $('#course__search').val("");
    $("#age1").val(minAge);
  });
  $toInput.on("change", function () {
    const fromValue = parseInt($fromInput.val());
    const toValue = parseInt($toInput.val());
    
    $(".my-checkbox").prop('checked', false);
    $("#allType").prop('checked', true);
    if (toValue <= fromValue) {
        $toInput.val(fromValue);
        $toSlider.val(fromValue);
    } else {
        $toSlider.val(toValue);
    }
    fetchCourse('', '', fromValue, toValue);
    $('#course__search').val("");
    $("#age1").val(minAge);
  });
}
controlRange('1');
// Course End 


// Benefits Start 
function chartAnimation(chartId, animatedNumberId, fromValue, toValue, time,data1, data2) {
  const ctx = document.getElementById(chartId);
  const targetElement = document.querySelector(`#${chartId}`);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
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