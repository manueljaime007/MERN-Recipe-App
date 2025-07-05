import { config } from "dotenv";
config()

import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET


export const register = async (request, response) => {
    const { username, email, password } = request.body

    try {

        // aceitar apenas campos preenchidos
        if (!username || !email || !password) {
            return response.status(400).json({
                message: "Please fill all fields"
            })
        }

        // verificar se o usuario existe antes de fazer registar 
        const userExists = await User.findOne({ email })
        if (userExists) {
            return response.status(400).json({
                message: "User already registered!"
            })
        }

        const user = await User.create({ username, email, password });

        const token = generateToken(user._id)

        // resposta final
        response.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });

    } catch (error) {
        response.status(500).json({
            message: `Server error: ${error}`
        })
        console.error(error)
    }

}

export const login = async (request, response) => {

    const { email, password } = request.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return response.status(401).json({
                message: "Invalid credentials"
            });
        }

        if (!(await user.matchPassword(password))) {
            return response.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id)
        // resposta final
        response.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        })
    } catch (error) {
        response.status(500).json({
            message: "Server error: " + error
        })
    }

}


const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "30d"
    });
};

export const profile = async (request, response) => {
    try {
        response.status(200).json(request.user)
    } catch (error) {
        response.status(500).json({
            message: "Server error"
        })
    }
}