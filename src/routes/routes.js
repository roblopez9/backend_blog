import { Router } from "express";
import PostModel from "../models/post_models";
import * as posts from "../controllers/postModel_controller";

const router = Router();

// Get the collections of posts from database
router.get('/api/posts', async (req, res) => {
    try {
        const results = await posts.getPosts();
        return res.json(results);        
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
})

// post a new blog into the database
router.post('/api/posts' , async (req, res) =>{

    const bloginfo = req.body;
    try {
        const result = await posts.createPost(bloginfo);
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

        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });

    }
})

router.put('/api/posts/:id', async(req, res) => {
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
router.delete('/api/posts/:id', async(req, res) => {
    const blogid = req.params.id;

    try {
        const result = await posts.deletePost(blogid);
        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
})


export default router;