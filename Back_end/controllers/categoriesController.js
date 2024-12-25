const fs = require('fs');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../model/categories.json');

const getCategories = async (req, res) => {
    try {
        const data = await fs.promises.readFile(categoriesFilePath, 'utf8');
        const categories = JSON.parse(data);

        const simplifiedCategories = categories.map(category => ({
            name: category.name,
            ingredients: category.ingredients.map(ingredient => ({
                name: ingredient.name,
                cost: ingredient.cost,
            }))
        }))

        res.json(simplifiedCategories);
    }
    catch(err) {
        res.status(500).json({message: 'Error reading the file'});
    }
}

module.exports = {getCategories}