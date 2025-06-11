// Visit message logic
const visitMessage = document.getElementById('visitMessage');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();
let message = "";

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (days < 1) {
        message = "Back so soon! Awesome!";
    } else if (days === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${days} days ago.`;
    }
}
visitMessage.textContent = message;
localStorage.setItem('lastVisit', now);

// Fetch and render cards
fetch('data/discover.json')
    .then(response => response.json())
    .then(data => {
        const cardsSection = document.getElementById('cardsSection');
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'discover-card';
            card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn more</button>
      `;
            cardsSection.appendChild(card);
        });
    });