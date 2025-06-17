export function openModal(content) {
    const modal = document.getElementById('modal');
    modal.querySelector('.modal-content').innerHTML = content;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

export function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

export function initModal() {
    const modal = document.getElementById('modal');
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
}