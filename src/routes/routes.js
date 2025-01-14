import { Router } from "express";
import PostModel from "../models/post_models";
import * as posts from "../controllers/postModel_controller";
import { requireAuth } from "../services/passport";
import UserModel from "../models/user_model";

const router = Router();

// Get the collections of posts from database
router.get('/api/posts', async (req, res) => {
    const page = req.query.p || 0;
    console.log(page);
    try {
        const results = await posts.getPosts(page);
        return res.json(results);        
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
})

// post a new blog into the database
router.post('/api/posts' , requireAuth, async (req, res) =>{

    const bloginfo = req.body;
    try {
        const result = await posts.createPost(bloginfo, req.user.id);

        return res.json(result);

    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
})

router.get('/api/posts/search', async(req, res) => {
    const searchTerm = req.query.Title;
    console.log(searchTerm);
    try {
        const result = await posts.searchPosts(searchTerm);
        return res.json(result);
    } catch (error) {
        return res.json({ error: error.message });
    }
})


// using id to get individual post from database
router.get('/api/posts/:id', async(req, res) => {
    const blogid = req.params.id;
    try {
        const result = await posts.getPost(blogid);
        const gettingUser = await UserModel.populate(result, {path: 'Author', select: ['username', 'email']});
        // console.log(gettingUser);
        return res.json(gettingUser);
    } catch (error) {
        return res.status(422).json({ error: error.message });

    }
})

router.put('/api/posts/:id', requireAuth, async(req, res) => {
    const newInfo = req.body;
    console.log(newInfo);
    const blogid = req.params.id;

    try {
        const result = await posts.updatePost(blogid, newInfo);
        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
})

// using id to delete post from database
router.delete('/api/posts/:id', requireAuth, async(req, res) => {
    const blogid = req.params.id;

    try {
        const result = await posts.deletePost(blogid);
        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
})


export default router;