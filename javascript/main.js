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