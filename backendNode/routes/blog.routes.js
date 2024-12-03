import express from 'express';
import Blog from '../model/blog.model.js'
import {getAllBlogs, addNewBlog, deleteBlog, updateBlog, findById} from '../controllers/blog.controller.js'


const router = express.Router();


router.get("/", getAllBlogs)

router.post("/newblog", addNewBlog);

router.delete('/delete/:id', deleteBlog);

router.get("/:id", findById);

router.put("/edit/:id", updateBlog);
  

export default router;