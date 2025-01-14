import { Router } from "express";
import UserModel from "../models/user_model";
import dotenv from 'dotenv';
import { requireAuth, requireSignin } from '../services/passport';
import * as users from "../controllers/userControllers"; 

dotenv.config({ silent: true });
const router = Router();

router.post('/signup', async(req, res) => {
    const signupInfo = req.body;
    console.log("the sighnupinfo is" + signupInfo);
    try {
        const response = await users.signUp(signupInfo);
        let token = response.token;
        let userInfo = response.newUser;
        return res.json({ token , email: userInfo.email, username: userInfo.username, firstname: userInfo.first_name, lastname: userInfo.last_name });
    } catch (error) {
        return res.status(422).json({error:error.message})
    }
})


router.post('/signin', requireSignin, async(req, res) => {
    const signinInfo = req.body
    try {
        const response = await users.signIn(signinInfo);
        const username = await UserModel.findById(req.user.id);
        return res.json({ response, email: signinInfo.email, username: username.username, firstname: username.first_name, lastname: username.last_name });
    } catch (error) {
        res.status(422).json({error: error.message})
    }
})

router.get('/user', requireAuth, async(req,res) => {

    const email = req.user.email;
    const firstname = req.user.first_name;
    const lastname = req.user.last_name;
    // console.log(req.user);
    return res.json({email, firstname, lastname});
})

export default router;