 import Blog from '../model/blog.model.js'
 
export const getAllBlogs = async(req,res) => {
    try{
      const getBlog = await Blog.find({});
      res.status(200).json(getBlog);
    }catch(error){
      res.status(500).json({message:error.message});
    }
}

export const addNewBlog = async(req, res) => {
    try{
      const addBlog = Blog.create(req.body); 
      res.status(200).json(addBlog);
    }catch(error){
      res.status(500).json({msg :error.message});
    }
   
}
export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Blog.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "Blog not found" });
      }
      const blogs = await Blog.find();
      res.json(blogs); // Send updated blogs to the frontend
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const updateBlog = async(req,res) => {
    try{
      const id = req.params.id;
      const blog = await Blog.findByIdAndUpdate(id,req.body);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      const updatedBlog = await Blog.findById(id);
      res.status(200).send(updatedBlog);
    }catch(error){
      res.status(500).json({message : error.message});
    }
  };

  export const findById = async(req,res) => {
    try{
        const id = req.params.id;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    }catch(error){
        res.send(500).json({message: error.message});
    }
  }

// export default {getAllBlogs,  addNewBlog};