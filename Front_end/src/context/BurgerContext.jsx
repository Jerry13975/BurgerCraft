import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const BurgerContext = createContext();

const BurgerProvider = ({ children }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    
    return (
        <BurgerContext.Provider value={{ selectedIngredients, setSelectedIngredients }}>
            {children}
        </BurgerContext.Provider>
    );
};

BurgerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BurgerProvider;
