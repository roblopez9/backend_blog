import UserModel from "../models/user_model";
import dotenv from 'dotenv';
import jwt from 'jwt-simple';

export async function signUp(userInfo) {
    const user = new UserModel();
    user.email = userInfo.email;
    user.password = userInfo.password;

    const newUser = await user.save();
    const token = await tokenForUser(newUser);
    return token
}

export async function signIn({email, password}) {
    const user = await UserModel.findOne({ email });

    if (!user){
        throw new Error('user does not exist');
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error('Password does not match');
    }
    const token = await tokenForUser(user)

    return token

}

// encodes a new token for a user object
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}