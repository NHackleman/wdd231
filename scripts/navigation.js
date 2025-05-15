document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu');
    const navList = document.getElementById('nav-list');
    menuBtn.addEventListener('click', () => {
        navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    });
    // Close nav on link click (mobile)
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 700) navList.style.display = 'none';
        });
    });
    // Ensure correct display on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 700) {
            navList.style.display = 'flex';
        } else {
            navList.style.display = 'none';
        }
    });
});