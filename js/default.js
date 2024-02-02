document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', function () {
        // Pops the navigation button when screen size is small
        navList.classList.toggle('show');
    });
});