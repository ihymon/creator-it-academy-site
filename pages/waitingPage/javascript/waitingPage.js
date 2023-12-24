
// Loader Start
$(".loader").show();
$("body").addClass("wrap-hidden");

const loader = () => {
  setTimeout(() => {
    $("body").removeClass("wrap-hidden");
  }, 4000)
}

loader();
// Loader Finish


// Favicon Start
function toggleFavicon() {
  let favicon = $('#blinking_image');

  let currentPath = favicon.attr('href');

  if (currentPath === './../../img/main/favicon/favicon-32x32.webp') {
      favicon.attr('href', './../../img/main/favicon/faviconAnimation.webp');
  } else {
      favicon.attr('href', './../../img/main/favicon/favicon-32x32.webp');
  }
}

$(document).ready(function () {
  setInterval(toggleFavicon, 500);
});
// Favicon Finish
