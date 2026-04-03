import jwt from 'jsonwebtoken';
const Auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).send("Access denied: No token provided");
    }
    // console.log(authHeader);
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
        };
        next();
    }catch(err){
        return res.status(403).send("Access denied: Invalid token");
    }
};

export default Auth;