document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            if (mainNav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Last Modified Date
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Current Year for Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
