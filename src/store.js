export const initialStore = () => {
    
    const savedFavorites = JSON.parse(localStorage.getItem('my_starwars_favorites')) || [];

    return {
        characters: [],
        planets: [],
        vehicles: [],
        favorites: savedFavorites 
    };
};

export default function storeReducer(store, action = {}) {
    let newFavorites; 

    switch(action.type) {
        case 'set_characters':
            return { ...store, characters: action.payload };
        case 'set_planets':
            return { ...store, planets: action.payload };
        case 'set_vehicles':
            return { ...store, vehicles: action.payload };
            
        case 'add_favorite':
            newFavorites = [...store.favorites, action.payload];
            
            localStorage.setItem('my_starwars_favorites', JSON.stringify(newFavorites));
            return { ...store, favorites: newFavorites };
            
        case 'remove_favorite':
            newFavorites = store.favorites.filter(fav => fav.name !== action.payload.name);
            
            localStorage.setItem('my_starwars_favorites', JSON.stringify(newFavorites));
            return { ...store, favorites: newFavorites };
            
        default:
            throw Error('Unknown action.');
    }
}