const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key

const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired. Please log in again." });
            } else {
                return res.status(401).json({ message: "Invalid token." });
            }
        }
        req.userId = decoded.userId;
        next();
    });
};

// Middleware function to check if user is an admin
const checkAdminMiddleware = (req, res, next) => {
    const userType = req.decodedUser.userType;
    if (userType !== 'admin') {
        return res.status(403).json({ message: "Forbidden. User does not have required permissions." });
    }
    next();
};

// You can apply these middleware to multiple routes or all routes if needed
// app.use(checkTokenMiddleware);
// app.use(checkAdminMiddleware);
