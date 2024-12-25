const Favorite = require('../model/Favorite');

exports.favoriteController = async (req, res) => {
    const {ingredients} = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    const burger = {
        bun: ingredients.find(ingredients => ingredients.category === 'Buns')?.name,
        patties: ingredients.filter(ingredient => ingredient.category === 'Proteins').map(ingredient => ingredient.name),
        toppings: ingredients.filter(ingredient => ingredient.category === 'Toppings').map(ingredient => ingredient.name),
        sauces: ingredients.filter(ingredient => ingredient.category === 'Sauces').map(ingredient => ingredient.name)
    }

    try {
        const existingFavorites = await Favorite.find({userId});
        if (existingFavorites.length >= 3) {
            return res.status(400).send('You can only have up to 3 favorite burgers.');
        }
        const favorite = new Favorite({userId, burger});
        await favorite.save();
        res.status(201).send('Burger added to favorites');
    } catch (error) {
        res.status(500).send('Error saving favorite: ' + error.message);
    }
};

exports.getFavoritesController = async(req, res) => {
    const userId = req.user?.userId;
    try{
        const favorites = await Favorite.find({userId}).limit(3);
        res.json(favorites);
    } catch (error) {
        res.status(500).send('Error fetching favorites: ' + error.message);
    }
};

exports.deleteFavoriteController = async(req, res) => {
    const userId = req.user?.userId;
    const favoriteId = req.params.id;

    if(!favoriteId) {
        return res.status(400).json({message: "Favorite ID is required"});
    }
    try{
        const favorites = await Favorite.findOneAndDelete({userId, _id: favoriteId});
        if(!favorites){
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.status(200).json({ message: "Favorite removed successfully" });
    } catch(error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}