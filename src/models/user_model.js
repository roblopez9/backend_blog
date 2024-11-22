import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";

const UserSchema = new Schema({
    email: {type: String, lowercase: true, unique: true, required: true},
    password: {
        type: String,
        required: true,
        minLength: [6]
    },
    username: {type: String, lowercase: true, unique: true, required: true}
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
})

UserSchema.pre('save', async function beforeyYourModelSave(next) {

    // this is a reference to our model
    // the function runs in some other context so DO NOT bind it

    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        const model = this;
        model.password = await bcrypt.hash(model.password, salt);
        console.log("user about to be created", this);
        return next();
    } catch (error) {
        return next(error);
    }
  
  });

UserSchema.methods.comparePassword = async function comparePassword(checkingpassword) {
    const comparison = await bcrypt.compare(checkingpassword, this.password);
    return comparison;
}
  

const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel