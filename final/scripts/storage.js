export function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}