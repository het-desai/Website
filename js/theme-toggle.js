document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
        var root = document.documentElement;
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem('ns-theme', next);
    });
});