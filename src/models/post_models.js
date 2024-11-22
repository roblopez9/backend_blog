import mongoose from "mongoose";
import { Schema } from "mongoose";

const Postschema = new Schema({
    Title: String,
    Content: String,
    Author: {type:Schema.Types.ObjectId, ref:'UserModel'},
    Tags: String,
    coverUrl: String,
    updated: {type: Date, default: Date.now()}
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

Postschema.index({ Title: 'text' });

const PostModel = mongoose.model('PostModel', Postschema);

export default PostModel;