import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Options = ({onIngredientSelect}) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedBun, setSelectedBun] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }
        };
        fetchCategories();
    }, []);

    const toggleCategory = (categoryName) => {
        setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
    }
    const handleSelection = (ingredient, categoryName) => {
        if (categoryName === "Buns") {
            setSelectedBun(ingredient.name);
            onIngredientSelect({...ingredient, category: categoryName});
        }
        else {
            onIngredientSelect({...ingredient, category: categoryName});
        }
        console.log(`Selected ingredient: ${ingredient.name}`);
    };


    return(
        <div className="options">
            {categories.map((category) => (
                <div key={category.name} className="accordion-section">
                    <h3 onClick={() => toggleCategory(category.name)} className="accordion-header">{category.name}</h3>
                    <div className={`accordion-content ${
                            expandedCategory === category.name ? 'expanded' : ''
                        }`}
                    >
                        {category.ingredients.map((ingredient) => (
                            <div key={ingredient.name} className="ingredient-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={
                                            category.name === "Buns" ? selectedBun === ingredient.name: undefined
                                        }
                                        onChange={() => handleSelection(ingredient, category.name)}
                                    />
                                    {ingredient.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                )
            )}
        </div>
    )
}

Options.propTypes = {
    onIngredientSelect: PropTypes.func.isRequired, 
};

export default Options;