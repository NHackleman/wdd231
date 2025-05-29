document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Optional: Change button text/icon based on state
            if (mainNav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'true');
                // menuToggle.innerHTML = '&#10005;'; // Optional: Close icon
            } else {
                menuToggle.setAttribute('aria-expanded', 'false');
                // menuToggle.innerHTML = '&#9776;'; // Optional: Hamburger icon
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
