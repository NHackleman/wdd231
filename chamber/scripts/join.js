document.addEventListener('DOMContentLoaded', () => {
    // Set timestamp to current date/time (ISO string)
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        // Use the current local time as per your assignment's requirement
        const now = new Date();
        timestampInput.value = now.toLocaleString();
    }

    // Modal logic
    document.querySelectorAll('.modal-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const modal = document.querySelector(link.getAttribute('href'));
            if (modal) {
                modal.style.display = 'block';
                modal.focus();
            }
        });
    });
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', e => {
            btn.closest('.modal').style.display = 'none';
        });
    });
    // Accessibility: close modal on Escape
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('keydown', e => {
            if (e.key === "Escape") modal.style.display = 'none';
        });
    });
    // Optional: close modal if clicking outside modal-content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.style.display = 'none';
        });
    });
});