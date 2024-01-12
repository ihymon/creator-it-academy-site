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

// Student Start

// Student Start


let courseShow = 5;
let showAllCourse = false;
let courseLength;

let pathJson = './../../api/students.json';


$(".student__btn").click(function() {
    courseShow = 8;
});


$("#oldStudent").click(function() {
    pathJson = './../../api/oldStudents.json';
    $(".student__filter-button").removeClass("student__filter-active");
    $(this).addClass("student__filter-active");
    fetchAndDisplayCourses();

});

$("#allStudent").click(function() {
    pathJson = './../../api/students.json';
    $(".student__filter-button").removeClass("student__filter-active");
    $(this).addClass("student__filter-active");
    fetchAndDisplayCourses();

});


function fetchAndDisplayCourses() {
    fetch(pathJson)
        .then(response => response.json())
        .then(courses => {
            courseLength = courses.length;

            console.log(courses);

            // Clear existing content in student__box
            $(".student__box").empty();

            for (let i = 0; i < (showAllCourse ? courseLength : Math.min(5, courseLength)); i++) {
                let el = courses[i];

                $(".student__box").append(`
                <div class="student__card">
                <p class="student__card-number">#${el.number}</p>
                <div class="student__card-box">
                    <div class="card__item">
                        <div class="card__item-left">
                        <div class="card__item-left--img" style="background-image: url('./img/student${el.number}.png');">
    
    
                            </div>
    
                            <div class="card__item-left--text">
                                <p class="card__title">${el.name}</p>
                                <p class="card__link"><a target="_blank" href="${el.portfolio}">${el.portfolio}</a> / <a target="_blank" href="${el.github}">${el.github}</a> </p>
                                
                                <p class="card__duration">З Креейтором ${el.duration}</p>
                            </div>
                        </div>
    
                        <div class="card__item-right">
                            <svg class="card__item-arrow" xmlns="http://www.w3.org/2000/svg" width="66" height="76" viewBox="0 0 66 76" fill="none">
                                <g clip-path="url(#clip0_964_2006)">
                                  <path d="M36.2367 15.5601C34.3999 13.7149 31.417 13.7149 29.5802 15.5601L1.36733 43.9036C-0.469444 45.7489 -0.469444 48.7456 1.36733 50.5909C3.20411 52.4362 6.18703 52.4362 8.0238 50.5909L32.9158 25.5837L57.8077 50.5761C59.6445 52.4214 62.6274 52.4214 64.4642 50.5761C66.301 48.7309 66.301 45.7341 64.4642 43.8888L36.2514 15.5454L36.2367 15.5601Z" fill="white"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_964_2006">
                                    <rect width="65.83" height="75.5826" fill="white" transform="matrix(-1 0 0 -1 65.8301 75.5825)"/>
                                  </clipPath>
                                </defs>
                              </svg>
                        </div>
                    </div>
    
                    <div class="card__container">
                     ${el.skills.map(skill => `<button class="card__container-button">${skill}</button>`).join('')}
                    </div>
    
                </div>
    
            </div>
                `)
            }

            
        $(".student__card-box").click(function() {
            let cardParent = $(this);
            var windowWidth = $(window).width();
            let numberHeigth = (windowWidth < 600) ? 300 : (windowWidth < 700) ? 230 : 140;

            if (cardParent.is(":animated")) {
                return;
            }

   

        
            cardParent.toggleClass("student__card-box--open");
        
            let targetHeight;
            if (cardParent.hasClass("student__card-box--open")) {
                cardParent.css("height", "auto");
                targetHeight = cardParent.height();
                cardParent.css("height", `${numberHeigth}px`);
        
            } else { 
                cardParent.css("height", `${numberHeigth}px`);
                targetHeight = cardParent.height();
                cardParent.css("height", "auto");
        
            }


        
            cardParent.animate({ height: targetHeight }, 400);
        });
        


        });
}

// Initial fetch and display
fetchAndDisplayCourses();


$(".student__btn").click(function() {
    showAllCourse = !showAllCourse;

    if (showAllCourse == true) {
        $(this).text("Заховати");
    }else {
        $(this).text("Показати більше");
        student.scrollIntoView({
			block: "start",
			inline: "nearest",
			behavior: "smooth"
		});
    }
    fetchAndDisplayCourses();

});
// Student End


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

