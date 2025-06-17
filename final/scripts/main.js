import { openModal, initModal } from './modal.js';
import { getFavorites, saveFavorites } from './storage.js';
import { fetchWeather } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    initModal();

    if (document.getElementById('plant-list')) {
        loadAndDisplayPlants();
    }

    if (document.getElementById('weather')) {
        displayWeather();
    }
});

// Fetch and display plants
async function loadAndDisplayPlants() {
    try {
        const response = await fetch('data/plants.json');
        if (!response.ok) throw new Error('Failed to load plant data');
        const plants = await response.json();
        displayPlants(plants);
    } catch (error) {
        document.getElementById('plant-list').innerHTML = '<p>Error loading plants.</p>';
        console.error(error);
    }
}

function displayPlants(plants) {
    const list = document.getElementById('plant-list');
    list.innerHTML = '';
    plants.forEach(plant => {
        const item = document.createElement('div');
        item.className = 'plant-card';
        item.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" loading="lazy">
      <h3>${plant.name}</h3>
      <p><strong>Light:</strong> ${plant.light}</p>
      <p><strong>Water:</strong> ${plant.water}</p>
      <p><strong>Difficulty:</strong> ${plant.difficulty}</p>
      <button class="details-btn" data-name="${plant.name}">Details</button>
      <button class="favorite-btn" data-name="${plant.name}">★</button>
    `;
        list.appendChild(item);
    });

    // Details modal
    list.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plant = plants.find(p => p.name === btn.dataset.name);
            openModal(`
        <h2>${plant.name}</h2>
        <img src="${plant.image}" alt="${plant.name}" loading="lazy">
        <ul>
          <li><strong>Light:</strong> ${plant.light}</li>
          <li><strong>Water:</strong> ${plant.water}</li>
          <li><strong>Difficulty:</strong> ${plant.difficulty}</li>
        </ul>
      `);
        });
    });

    // Favorites
    list.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            let favorites = getFavorites();
            if (!favorites.includes(btn.dataset.name)) {
                favorites.push(btn.dataset.name);
                saveFavorites(favorites);
                btn.classList.add('favorited');
            }
        });
    });
}