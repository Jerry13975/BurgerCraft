const History = require('../model/History');

exports.historyController = async (req, res) => {
    console.log('Received POST request at /api/history');
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

        const order = new History({userId, burger});
        await order.save();
        res.status(201).send('Burger added to history');
    } catch(error) {
        res.status(500).send('Error saving to history: ' + error.message);
    }
};

exports.getHistoryController = async(req, res) => {
    const userId = req.user?.userId;
    try{
        const order = await History.find({userId}).sort({createdAt: -1}).limit(3);
        res.json(order);
    } catch (error) {
        res.status(500).send('Error fetching orders: ' + error.message);
    }
};