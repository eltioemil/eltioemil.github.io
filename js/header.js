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

    document.getElementById("theProgressBar").style.width = scrolled + "%";

    // Shrink header when scrolling down. Not the best way of doint this for sure.
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        document.getElementById("site-title").style.lineHeight = "34px";
        document.getElementById("site-title").style.height = "30px";
        document.getElementById("site-title").style.fontSize = "18.25px";
        document.getElementById("site-title").style.transition = "all 0.5s";
        document.getElementById("logo").style.height = "22px";
        document.getElementById("logo").style.transition = "all 0.5s";
        document.getElementById("site-nav").style.lineHeight = "34px";
        document.getElementById("site-nav").style.transition = "all 0.5s";
        document.getElementById("site-header").style.minHeight = "38px";
        document.getElementById("site-header").style.transition = "all 0.5s";
        document.getElementById("progress-container").style.height = "2px";
        document.getElementById("progress-container").style.transition = "all 0.2s";
        document.getElementById("theProgressBar").style.height = "2px";
        document.getElementById("theProgressBar").style.transition = "all 0.2s";
    } else {
        document.getElementById("site-title").style.lineHeight = "60.75px";
        document.getElementById("site-title").style.height = "60.75px";
        document.getElementById("site-title").style.fontSize = "29.25px";
        document.getElementById("logo").style.height = "35px";
        document.getElementById("site-nav").style.lineHeight = "60.75px";
        document.getElementById("site-header").style.minHeight = "56px";
        document.getElementById("progress-container").style.height = "5px";
        document.getElementById("theProgressBar").style.height = "5px";
    }
}