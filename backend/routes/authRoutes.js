import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
const router = express.Router();


//Router

router.post('/register', async (req, res)=> {
    const { name, email, username, password, role } = req.body;
    try {
        const existingUser = await User.findOne( {username});
        if(existingUser) {
            return res.status(400).json({message: "User exists already"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User ({name, email, username, password: hashedPassword, role});
        await user.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch(err){
        res.status(500).json({message:"Server error"})
    }
    	
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({ id: user._id.toString(), username: user.username, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1hr'});
        res.json({token});
        // console.log(token);
        // console.log(user.name);
    }catch(err){
        return res.status(500).json({message: "Server error"});
    }
});

export default router;