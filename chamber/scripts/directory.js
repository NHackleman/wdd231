const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

async function fetchMembers(view = 'grid') {
    const response = await fetch('./data/members.json');
    const members = await response.json();
    displayMembers(members, view);
}

function displayMembers(members, view) {
    membersContainer.innerHTML = '';
    membersContainer.className = view + '-view';
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
            <p class="level level-${member.level}">${['Member', 'Silver', 'Gold'][member.level - 1]}</p>
            <p>${member.description}</p>
        `;
        membersContainer.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    fetchMembers('grid');
});

listBtn.addEventListener('click', () => {
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
    fetchMembers('list');
});

// Load members on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchMembers('grid');
    document.getElementById('last-modified').textContent = document.lastModified;
});