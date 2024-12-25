import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import './styles/Acc.css';

const FavoritesPage = ({isLoggedIn}) => {
    const [favorites, setFavorites] = useState([]);
    const [isFavoriteVisible, setIsFavoriteVisible] = useState(false);
    const [setError] = useState('');

    const token = Cookies.get('accessToken');

    useEffect(() => {
        if (isLoggedIn && token) {
            axios.get('/api/favorites', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setFavorites(response.data);
                })
                .catch((err) => {
                    setError('Error fetching favorites: ' + err.message);
                });
        }
    }, [isLoggedIn, token, setError]);

    const handleFavoriteDelete = (favoriteId) => {
        if(isLoggedIn && token) {
            axios.delete(`/api/favorites/${favoriteId}`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then(() => {
                setFavorites(favorites.filter(favorite => favorite._id !== favoriteId));
            })
            .catch((err) => {
                setError('Error deleting favorite item: ' + err.message);
            });
        } 
    };

    const toggleFavorite = () => {
        setIsFavoriteVisible(!isFavoriteVisible);
    }

    return (
        <div>
            <h1 onClick={toggleFavorite} className={`toggle_acc ${isFavoriteVisible ? 'clicked' : ''}`}>
                Favorites
            </h1>
            {isFavoriteVisible && (
                <div className='acc-containers'>
                {favorites.length > 0 ? (
                    favorites.map((favorite, index) => (
                        <div key={index} className='order-item'>
                            <button 
                                className='delete-btn' 
                                onClick={() => handleFavoriteDelete(favorite._id)}
                            >
                                X
                            </button>
                            <h3>Favorite Burger {index + 1}</h3>
                            <div className='order-details'>
                                <p><strong>Bun:</strong> {favorite.burger.bun}</p>
                                <p><strong>Patty:</strong> {favorite.burger.patties.join(", ")}</p>
                                <p><strong>Toppings:</strong> {favorite.burger.toppings.join(", ")}</p>
                                <p><strong>Sauces:</strong> {favorite.burger.sauces.join(", ")}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty">
                        <p>No Favorites Yet</p>
                    </div>
                )}
            </div>
            )}
        </div>
    )
}

FavoritesPage.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default FavoritesPage;