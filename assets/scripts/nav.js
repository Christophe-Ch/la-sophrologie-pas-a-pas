const navToggle = document.getElementById('nav_toggle');
navToggle.addEventListener('input', () => {
    document.body.classList.toggle('modal-open', navToggle.checked);
})
