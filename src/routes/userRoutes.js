import { Router } from "express";
import UserModel from "../models/user_model";
import dotenv from 'dotenv';
import { requireAuth, requireSignin } from '../services/passport';
import * as users from "../controllers/userControllers"; 

dotenv.config({ silent: true });
const router = Router();

router.post('/signup', async(req, res) => {
    const signupInfo = req.body;
    try {
        const response = await users.signUp(signupInfo);
        res.json({ response, email: signupInfo.email });
    } catch (error) {
        return res.status(422).json({error:error.message})
    }
})

// router.get('/signup', async(req,res) => {

// })

router.post('/signin', requireSignin, async(req, res) => {
    const signinInfo = req.body
    try {
        const response = await users.signIn(signinInfo);
        const username = await UserModel.findById(req.user.id);
        return res.json({ response, email: signinInfo.email, username: username.username });
    } catch (error) {
        res.status(422).json({error: error.message})
    }
})

router.get('/user', requireAuth, async(req,res) => {

    const email = req.user.email;
    console.log(req.user);
    return res.json({email});
})

export default router;