document.addEventListener("DOMContentLoaded", function() {
    var scrollIndicator = document.getElementById("scroll-indicator");

    window.addEventListener("scroll", function() {
        if (window.scrollY === 0) {
            // User is at the top of the page
            scrollIndicator.style.display = "block";
        } else {
            // User has scrolled down
            scrollIndicator.style.display = "none";
        }
    });
});