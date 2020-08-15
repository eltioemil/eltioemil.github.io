var scrollTimer = null;
$(window).scroll(function () {
  var viewportHeight = $(this).height(),
    scrollbarHeight = (viewportHeight / $(document).height()) * viewportHeight,
    progress = $(this).scrollTop() / ($(document).height() - viewportHeight),
    distance =
      progress * (viewportHeight - scrollbarHeight) +
      scrollbarHeight / 2 -
      $("#scroll-progress").height() / 2;
  $("#scroll-progress")
    .css("top", distance)
    .text(" (" + Math.round(progress * 100) + "%)")
    .fadeIn(600);
  if (scrollTimer !== null) {
    clearTimeout(scrollTimer);
  }
  scrollTimer = setTimeout(function () {
    $("#scroll-progress").fadeOut(600);
  }, 1000);
});
