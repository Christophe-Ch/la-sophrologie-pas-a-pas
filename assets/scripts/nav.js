const navToggle = document.getElementById('nav_toggle');
let scroll = 0;

navToggle.addEventListener('input', () => {
    if (navToggle.checked) {
        scroll = window.scrollY;
        document.body.classList.toggle('modal-open', navToggle.checked);
        window.scrollTo(0, scroll);
    }
    else {
        document.body.classList.toggle('modal-open', navToggle.checked);
        window.scrollTo(0, scroll);
    }
})
