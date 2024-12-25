import PropTypes from "prop-types";

const Summary = ({selectedIngredients}) => {
    const totalCost = selectedIngredients.reduce((total, ingredient) => {
        const ingredientCost = ingredient.extra ? ingredient.cost + ingredient.extra : ingredient.cost;
        return total + ingredientCost;
    }, 0);

    return(
        <div className="content">
            <h2>Summary</h2>
            <ul>
                {selectedIngredients.map((ingredient) => (
                    <li key={ingredient.name}>
                        {ingredient.extra ? `${ingredient.name} (Extra: $${ingredient.extra.toFixed(2)})` : ingredient.name}
                    </li>
                ))}
            </ul>
            <p>Total Price: ${totalCost.toFixed(2)}</p>
        </div>
    )
}

Summary.propTypes = {
    selectedIngredients: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string.isRequired, 
            name: PropTypes.string.isRequired,    
        })
    ).isRequired,
};

export default Summary;