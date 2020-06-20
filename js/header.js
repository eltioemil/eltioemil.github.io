window.onscroll = function () { stickyHeaderProgress() };

var header = document.getElementById("site-header")
var sticky = header.offsetTop;

function stickyHeaderProgress() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var scrolled = (winScroll / height) * 100;

    document.getElementById("progress-bar").style.width = scrolled + "%";

    // Used class replacement instead of changing each element, which is a bit better, I guess...
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        document.getElementById("site-header").classList.replace("site-header", "site-header-sm");
        document.getElementById("site-title").classList.replace("site-title", "site-title-sm");
        document.getElementById("logo").classList.replace("logo", "logo-sm");
        document.getElementById("site-nav").classList.replace("site-nav", "site-nav-sm");
        document.getElementById("progress-container").classList.replace("progress-container", "progress-container-sm");
        document.getElementById("progress-bar").classList.replace("progress-bar", "progress-bar-sm");
    } else {
        document.getElementById("site-header").classList.replace("site-header-sm", "site-header");
        document.getElementById("site-title").classList.replace("site-title-sm", "site-title");
        document.getElementById("logo").classList.replace("logo-sm", "logo");
        document.getElementById("site-nav").classList.replace("site-nav-sm", "site-nav");
        document.getElementById("progress-container").classList.replace("progress-container-sm", "progress-container");
        document.getElementById("progress-bar").classList.replace("progress-bar-sm", "progress-bar");
    }
}