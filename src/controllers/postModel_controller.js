import PostModel from "../models/post_models";

export async function getPosts(params) {
    const posts = await PostModel.find().sort({ updatedAt: -1 });
    return posts;
}

export async function createPost(postInfo) {
    const newPost = new PostModel();
    newPost.Title = postInfo.Title;
    newPost.Content = postInfo.Content;
    newPost.Tags = postInfo.Tags;
    newPost.coverUrl = postInfo.coverUrl;

    return newPost.save()
    
}

export async function getPost(postid) {
    const post = await PostModel.findById(postid);
    return post;
}
export async function updatePost(postid, newInfo) {
    const updatedPost = await PostModel.findByIdAndUpdate(postid, newInfo);
    const result = await updatedPost.save();
    return result
}

export async function searchPosts(searchTerm){
    const searchObject = await PostModel.find({ Title: {$regex: searchTerm, $options: 'i'}}).sort({ Title: 1 }).limit(10);
    return searchObject;
}

export async function deletePost(postid) {
    const result = await PostModel.findByIdAndDelete(postid);
    return result;
}

