$(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
        $('.nav').addClass("nav-shrink");
    }
    else {
        $('.nav').removeClass("nav-shrink");
    }
});