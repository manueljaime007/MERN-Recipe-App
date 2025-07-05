import { Recipe } from "../models/Recipe.js";

export const store = async (request, response) => {
    const {
        title, ingredients, instructions, category, photo_url, cooking_time
    } = request.body;

    try {
        if (!title || !ingredients || !category || !photo_url || !cooking_time) {
            return response.status(400).json({
                message: "Please fill all fields"
            })
        }

        const recipe = await Recipe.create({
            title, ingredients, instructions, photo_url, cooking_time
        })

        response.status(201).json(recipe)

    } catch (error) {
        response.status(500).json({
            message: error
        })
        console.error(error)
    }
}
export const indexByCategory = async (request, response) => {

    const { category } = request.query;

    try {
        const query = category ? { category } : {}
        const recipes = await Recipe.find(query);
        response.status(200).json(recipes);

    } catch (error) {
        response.status(500).json({
            message: "Server Errror!"
        })
        console.error(error)
    }
}
export const showById = async (request, response) => {
    const { id } = request.params;
    const recipe = await Recipe.findById(id);

    try {
        if (!recipe) {
            return response.status(404).json({
                message: "Recipe not found"
            })
        }
        response.status(201).json(recipe)
    } catch (error) {
        response.status(500).json({
            message: "Server Error!"
        })
    }
}
export const update = async (request, response) => {
    const { id } = request.params
    const {
        title, ingredients, instructions, category, photo_url, cooking_time
    } = request.body;

    try {
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return response.status(404).json({
                message: "Recipe not found"
            })
        }
        if (recipe.created_by.toString() !== request.user._id.toString()) {
            return response.status(401).json({
                message: "Not Authorized"
            });
        }
        recipe.title = title || recipe.title
        recipe.ingredients = ingredients || recipe.ingredients
        recipe.instructions = instructions || recipe.instructions
        recipe.category = category || recipe.category
        recipe.photo_url = photo_url || recipe.photo_url
        recipe.cooking_time = cooking_time || recipe.cooking_time

        const updatedRecipe = await recipe.save()

        response.status(200).json({
            message: "Recipe updated sucessfully!"
        })
    } catch (error) {
        response.status(500).json({
            message: "Server Error!"
        })
    }
}
export const destroy = async (request, response) => {
    const { id } = request.params

    try {
        const recipe = await Recipe.findById(id)
        if (!recipe) {
            return response.status(404).json({
                message: "Recipe not found"
            })
        }
        if (recipe.created_by.toString() !== request.user._id.toString()) {
            return response.status(401).json({
                message: "Not Authorized"
            });
        }
        await recipe.deleteOne(recipe)
        response.status(200).json({
            message: "Recipe deleted successfully!"
        })
    } catch (error) {
        response.status(500).json({
            message: "Server Error!"
        })
    }
}