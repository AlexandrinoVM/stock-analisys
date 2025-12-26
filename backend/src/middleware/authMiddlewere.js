import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authMiddleware = req.headers.authorization;

    if(!authMiddleware) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authMiddleware.split(' ')[1]

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode
        next();
    }catch{
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

}