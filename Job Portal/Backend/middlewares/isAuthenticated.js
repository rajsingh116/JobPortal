import jwt, { decode } from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access, token missing",
                success: false,
            })
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error);

    };
}
export default isAuthenticated;