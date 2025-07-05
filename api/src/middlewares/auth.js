import { User } from "../models/User.js"
import jwt  from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export const protect = async (request, response, next) => {
    let token;

    const { authorization } = request.headers

    if (authorization && authorization.startsWith("Bearer")) {

        try {
            token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            request.user = await User.findById(decoded.id).select("-password");

            return next();
        } catch (error) {
            console.error("Token verification failed", error)
            return response.status(401).json({
                message: "Not authorized token "
            })
            console.error("Erro no middleware protect", error)
        }
    }
}