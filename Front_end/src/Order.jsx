import {useContext, useState} from 'react';
import { BurgerContext } from './BurgerContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import './styles/Order.css'

const Order = ({setShowPopup, isLoggedIn}) => {
    const {selectedIngredients} = useContext(BurgerContext);
    const [error, setError] = useState('');

    const totalCost = selectedIngredients.reduce((total, ingredient) => total + ingredient.cost, 0);

    const handleOrderClick = () => {
        if(isLoggedIn) {
            const ingredients = selectedIngredients.map((ingredient) => ({
                category: ingredient.category,
                name: ingredient.name
            }));

            const token = Cookies.get('accessToken')
            if(!token){
                setError('No authentication token found.');
                return;
            }
            axios.post('/api/history', {ingredients}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                setError('');
            }).catch(() => {
                setError('Error adding order');
            })
        } else {
            setShowPopup(true);
        }
    }

    return (
        <div className="order-container">
            <h2>Order Summary</h2>
            <div className="order-box">
                {selectedIngredients.length === 0 ? (
                    <p>Your order is empty. Please customize your burger.</p>
                ) : (
                    <>
                        <ul className="order-list">
                            {selectedIngredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.name} ({ingredient.category}) - ${ingredient.cost.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
                    </>
                )}
            </div>
            <button className="order-now-btn" onClick={handleOrderClick}>
                Order Now
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

Order.propTypes = {
    setShowPopup: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

export default Order;