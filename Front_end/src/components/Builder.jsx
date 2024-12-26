import PropTypes from 'prop-types';

const Builder = ({selectedIngredients}) => {
    const buildBurger = () => {
        let burgerParts = [];

        const bun = selectedIngredients.find(ingredient => ingredient.category === "Buns");
        if (bun) burgerParts.push(<div key="top-bun" className="burger-layer">{bun.name} (Top Bun)</div>);

        selectedIngredients.filter(ingredient => ingredient.category === "Toppings").forEach((topping, index) => {
            burgerParts.push(<div key={`topping-${index}`} className="burger-layer">{topping.name} (Topping)</div>);
        });

        selectedIngredients.filter(ingredient => ingredient.category === "Sauces").forEach((sauce, index) => {
            burgerParts.push(<div key={`sauce-${index}`} className="burger-layer">{sauce.name} (Sauce)</div>);
        });

        selectedIngredients.filter(ingredient => ingredient.category === "Proteins").forEach((patty, index) => {
            burgerParts.push(<div key={`patty-${index}`} className="burger-layer">{patty.name} (Patty)</div>);
        });

        if (bun) burgerParts.push(<div key="bottom-bun" className="burger-layer">{bun.name} (Bottom Bun)</div>);

        return burgerParts;
    };

    const burgerParts = buildBurger();

    return (
        <div className="builder">
            <h2>Your Burger</h2>
            <div className="burger-preview">
                {burgerParts.length > 0 ? burgerParts : <div className="no_burger-message">Create Your Burger</div>}
            </div>
        </div>
    );
}

Builder.propTypes = {
    selectedIngredients: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string.isRequired, 
            name: PropTypes.string.isRequired,    
        })
    ).isRequired,
};

export default Builder;