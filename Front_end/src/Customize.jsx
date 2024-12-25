import {useContext, useState} from 'react';
import { BurgerContext } from './BurgerContext';
import Options from './Options';
import Builder from './Builder';
import Summary from './Summary';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import './styles/Customize.css';

const Customize = ({setShowPopup, isLoggedIn}) => {
    const {selectedIngredients, setSelectedIngredients} = useContext(BurgerContext);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSelection = (ingredient) => {
        setSelectedIngredients((prev) => {
            if(ingredient.category === "Buns") {
                const withoutBuns = prev.filter(item =>item.category !== "Buns");
                return [...withoutBuns, ingredient];
            }
            const alreadySelected = prev.find(item => item.name === ingredient.name);
            if(alreadySelected) {
                return prev.filter(item => item.name !== ingredient.name);
            }
            return [...prev, ingredient];
        });
    };

    const handleFavoriteClick = () => {
        if(isLoggedIn) {
            const ingredients = selectedIngredients.map((ingredient) => ({
                category: ingredient.category,
                name: ingredient.name
            }));

            const token = Cookies.get('accessToken');
            if (!token) {
                setError('No authentication token found.');
                return;
            }
            axios.post('/api/favorites', { ingredients },{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }).then(() => {
                    setSuccessMessage('Favorite added successfully!');
                    setError('');
                    navigate('/acc'); 
                })
                .catch((err) => {
                    if (err.response?.data === 'You can only have up to 3 favorite burgers.') {
                        setError('You cannot add more than 3 favorites.');
                    }
                    else{
                        setError('Error adding favorite: ' + err.response?.data?.message || err.message);
                    }
                    setSuccessMessage('');
                });
        } else {
            setShowPopup(true);
        }
    }

    return (
        <div className="customize-container">
            <Options onIngredientSelect={handleSelection}/>
            <Builder selectedIngredients={selectedIngredients}/>
            <div className="summary">
                <Summary selectedIngredients={selectedIngredients} />
                <div className='buttons'>
                    <Link to="/order">
                        <button className="summary-button">Order now</button>
                    </Link>
                    <button className="summary-button" onClick = {handleFavoriteClick}>Favorite</button>
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    )
}

Customize.propTypes = {
    setShowPopup: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

export default Customize;