import mongoose, { Schema, model } from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            type: String,
            required: true
        }
    ],
    instructions: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    photo_url: {
        type: String,
        required: true
    },
    cooking_time: {
        type: Number,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

export const Recipe = model("Recipe", recipeSchema);